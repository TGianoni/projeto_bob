#!/usr/bin/env node
/**
 * DIO Explorer MCP Server
 *
 * Expõe três ferramentas via protocolo MCP (Model Context Protocol):
 *   - buscar_trilha   → consulta trilhas por tecnologia
 *   - gerar_desafio   → gera um desafio de código por tecnologia e nível
 *   - gerar_certificado → emite um certificado fictício em Markdown
 *
 * Transporte padrão: stdio (compatível com Bob e qualquer cliente MCP)
 * Para acesso remoto (HTTPS/SSO/API), utilize um proxy HTTP na frente deste processo.
 *
 * Build:  cd mcp && npm install && npm run build
 * Start:  node mcp/build/index.js
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import crypto from "node:crypto";

// ─── Resolução de caminhos ────────────────────────────────────────────────────

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, "../../data");
const TRILHAS_JSON = path.join(DATA_DIR, "trilhas_dio.json");
const CERT_DIR = path.resolve(__dirname, "../../certificados-emitidos");
const DESAFIO_DIR = path.resolve(__dirname, "../../desafios-gerados");

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Promocao {
  ativa: boolean;
  desconto_percentual: number;
  validade: string | null;
}

interface Live {
  titulo: string;
  data: string;
  gravada: boolean;
}

interface Trilha {
  id: number;
  nome: string;
  tecnologia: string;
  nivel: string;
  numero_modulos: number;
  xp_total: number;
  badges_disponiveis: string[];
  promocoes: Promocao;
  vitalicio: boolean;
  lives: Live[];
}

interface TrilhasDB {
  trilhas: Trilha[];
  total_trilhas: number;
  ultima_atualizacao: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function carregarTrilhas(): TrilhasDB {
  const raw = fs.readFileSync(TRILHAS_JSON, "utf-8");
  return JSON.parse(raw) as TrilhasDB;
}

function buscarTrilhasPorTecnologia(tecnologia: string): Trilha[] {
  const db = carregarTrilhas();
  return db.trilhas.filter((t) =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

function gerarHashId(): string {
  return crypto.randomBytes(3).toString("hex").toUpperCase();
}

function dataHoje(): string {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

// ─── Banco de desafios ────────────────────────────────────────────────────────

const DESAFIOS: Record<string, string[]> = {
  iniciante: [
    "Crie uma classe com atributos básicos e implemente os métodos getters, setters e toString().",
    "Escreva um programa que leia uma lista de números e retorne apenas os pares.",
    "Implemente uma função que verifique se uma string é um palíndromo.",
    "Crie um contador de palavras que receba uma frase e retorne a frequência de cada palavra.",
  ],
  intermediario: [
    "Implemente uma API REST com operações CRUD completas para gerenciar uma entidade de sua escolha.",
    "Crie um sistema de autenticação simples usando JWT com rotas protegidas.",
    "Desenvolva uma estrutura de dados de fila (Queue) do zero com enqueue, dequeue e peek.",
    "Implemente o padrão Observer para um sistema de notificações de eventos.",
  ],
  avancado: [
    "Projete e implemente um sistema de cache distribuído com TTL e invalidação por chave.",
    "Crie um pipeline de processamento assíncrono com filas de mensagens e dead-letter queue.",
    "Implemente um motor de busca com índice invertido e suporte a busca por prefixo.",
    "Desenvolva um ORM minimalista com suporte a migrations e relacionamentos.",
  ],
};

const XP_POR_NIVEL: Record<string, number> = {
  iniciante: 500,
  intermediario: 1200,
  avancado: 2500,
};

// ─── Servidor MCP ─────────────────────────────────────────────────────────────

const server = new McpServer({
  name: "dio-explorer",
  version: "1.0.0",
});

// ── Ferramenta 1: buscar_trilha ───────────────────────────────────────────────

server.registerTool(
  "buscar_trilha",
  {
    description:
      "Busca trilhas de aprendizado no catálogo DIO por tecnologia e retorna um plano de estudos formatado em Markdown.",
    inputSchema: z.object({
      tecnologia: z
        .string()
        .min(1)
        .describe("Nome da tecnologia a buscar. Ex: Java, Python, React, Docker"),
    }),
  },
  async ({ tecnologia }) => {
    try {
      const trilhas = buscarTrilhasPorTecnologia(tecnologia);

      if (trilhas.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Nenhuma trilha encontrada para "${tecnologia}".\n\nTecnologias disponíveis: Python, JavaScript, React, AWS, Docker, Kotlin, Java, Go, Rust, PHP, Swift, TypeScript, Flutter e outras.`,
            },
          ],
        };
      }

      const planos = trilhas.map((t) => {
        const promocao = t.promocoes.ativa
          ? `🔥 **${t.promocoes.desconto_percentual}% de desconto** até ${t.promocoes.validade}`
          : "Sem promoção ativa no momento.";

        const modulos = Array.from(
          { length: t.numero_modulos },
          (_, i) => `  ${i + 1}. Módulo ${i + 1} — ${t.tecnologia.split("/")[0].trim()}`
        ).join("\n");

        const badges = t.badges_disponiveis.map((b) => `  - 🏅 ${b}`).join("\n");

        const lives = t.lives
          .map((l) => `  - ${l.titulo} (${l.data}) — ${l.gravada ? "✅ Gravada" : "🔴 Ao vivo"}`)
          .join("\n");

        return `# 📚 Plano de Estudo — ${t.nome}

**Tecnologia:** ${t.tecnologia}
**Nível:** ${t.nivel}
**Módulos:** ${t.numero_modulos}
**XP Total:** ${t.xp_total} XP
**Acesso Vitalício:** ${t.vitalicio ? "Sim ✅" : "Não ❌"}

---

## 🗂️ Módulos previstos
${modulos}

---

## 🏅 Badges disponíveis
${badges}

---

## 📺 Lives
${lives}

---

## 🎯 Promoção
${promocao}`;
      });

      return {
        content: [
          {
            type: "text",
            text: planos.join("\n\n---\n\n"),
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Erro ao buscar trilha: ${String(err)}` }],
        isError: true,
      };
    }
  }
);

// ── Ferramenta 2: gerar_desafio ───────────────────────────────────────────────

server.registerTool(
  "gerar_desafio",
  {
    description:
      "Gera um desafio de código aleatório para uma tecnologia e nível informados. Salva o arquivo em desafios-gerados/.",
    inputSchema: z.object({
      tecnologia: z.string().min(1).describe("Tecnologia do desafio. Ex: Java, Python, JavaScript"),
      nivel: z
        .enum(["iniciante", "intermediario", "avancado"])
        .describe("Nível de dificuldade: iniciante, intermediario ou avancado"),
    }),
  },
  async ({ tecnologia, nivel }) => {
    try {
      const pool = DESAFIOS[nivel];
      const enunciado = pool[Math.floor(Math.random() * pool.length)];
      const xp = XP_POR_NIVEL[nivel];
      const desafioId = `DIO-${tecnologia.toUpperCase().replace(/\s+/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
      const badge = `${tecnologia} ${nivel.charAt(0).toUpperCase() + nivel.slice(1)} Challenger`;

      const markdown = `# ⚔️ Desafio DIO — ${tecnologia} (${nivel})

**ID:** ${desafioId}
**Dificuldade:** ${nivel}
**Tecnologia:** ${tecnologia}
**Tempo estimado:** ${nivel === "iniciante" ? "1–2h" : nivel === "intermediario" ? "3–5h" : "6–10h"}

---

## 📋 Enunciado
${enunciado}

---

## ✅ Requisitos
- [ ] O código deve compilar e executar sem erros
- [ ] Cobertura de testes >= 70%
- [ ] Sem uso de bibliotecas não autorizadas
- [ ] README com instruções de execução

---

## 💡 Dicas
> Consulte a documentação oficial de ${tecnologia} antes de começar.
> Escreva os testes antes da implementação (TDD).

---

## 🏆 Critérios de Avaliação
| Critério | Peso |
|----------|------|
| Funcionalidade correta | 40% |
| Qualidade e legibilidade do código | 30% |
| Boas práticas da tecnologia | 20% |
| Criatividade na solução | 10% |

---

## 🎁 Recompensa
**+${xp} XP** ao concluir · Badge desbloqueada: **${badge}**`;

      // Persiste o arquivo
      if (!fs.existsSync(DESAFIO_DIR)) fs.mkdirSync(DESAFIO_DIR, { recursive: true });
      const filename = `desafio_${desafioId}.md`;
      fs.writeFileSync(path.join(DESAFIO_DIR, filename), markdown, "utf-8");

      return {
        content: [
          {
            type: "text",
            text: `${markdown}\n\n---\n📁 Arquivo salvo em: \`desafios-gerados/${filename}\``,
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Erro ao gerar desafio: ${String(err)}` }],
        isError: true,
      };
    }
  }
);

// ── Ferramenta 3: gerar_certificado ──────────────────────────────────────────

server.registerTool(
  "gerar_certificado",
  {
    description:
      "Gera um certificado fictício em Markdown para um usuário que concluiu uma trilha DIO. Salva em certificados-emitidos/.",
    inputSchema: z.object({
      nome_usuario: z.string().min(1).describe("Nome completo do aluno. Ex: João Silva"),
      nome_trilha: z
        .string()
        .min(1)
        .describe("Nome ou parte do nome da trilha concluída. Ex: Java Spring Boot"),
    }),
  },
  async ({ nome_usuario, nome_trilha }) => {
    try {
      const db = carregarTrilhas();
      const trilha = db.trilhas.find((t) =>
        t.nome.toLowerCase().includes(nome_trilha.toLowerCase())
      );

      if (!trilha) {
        return {
          content: [
            {
              type: "text",
              text: `❌ Trilha "${nome_trilha}" não encontrada.\n\nVerifique o nome no catálogo ou use a ferramenta \`buscar_trilha\` para consultar as opções disponíveis.`,
            },
          ],
        };
      }

      const hash = gerarHashId();
      const ano = new Date().getFullYear();
      const certId = `DIO-${ano}-${hash}`;
      const data = dataHoje();
      const badges = trilha.badges_disponiveis.map((b) => `- ${b}`).join("\n");

      const markdown = `---
certificado_id: ${certId}
emitido_em: ${data}
usuario: ${nome_usuario}
trilha: ${trilha.nome}
tecnologia: ${trilha.tecnologia}
nivel: ${trilha.nivel}
modulos_concluidos: ${trilha.numero_modulos}
xp_obtido: ${trilha.xp_total}
valido: true
---

# 🎓 Certificado de Conclusão

---

> *A Digital Innovation One certifica que*

# ${nome_usuario.toUpperCase()}

> *concluiu com êxito a trilha de aprendizagem*

# 📚 ${trilha.nome}

---

| Campo | Detalhe |
|-------|---------|
| 🖥️ Tecnologia | ${trilha.tecnologia} |
| 📊 Nível | ${trilha.nivel} |
| 📦 Módulos concluídos | ${trilha.numero_modulos} |
| ⭐ XP obtido | ${trilha.xp_total} XP |
| 📅 Data de conclusão | ${data} |
| 🔑 ID do Certificado | \`${certId}\` |

---

## 🏅 Badges Conquistadas
${badges}

---

> *Este certificado comprova a dedicação e o esforço do(a) aluno(a)*
> *na jornada de aprendizado da plataforma DIO Explorer.*

---

**Digital Innovation One**
https://web.dio.me · Emitido via DIO Explorer MCP Server

---
*Verificação: \`${certId}\` · Documento fictício gerado automaticamente.*`;

      // Persiste o arquivo
      if (!fs.existsSync(CERT_DIR)) fs.mkdirSync(CERT_DIR, { recursive: true });
      const filename = `${nome_usuario.replace(/\s+/g, "_")}_${certId}.md`;
      fs.writeFileSync(path.join(CERT_DIR, filename), markdown, "utf-8");

      return {
        content: [
          {
            type: "text",
            text: `${markdown}\n\n---\n📁 Arquivo salvo em: \`certificados-emitidos/${filename}\``,
          },
        ],
      };
    } catch (err) {
      return {
        content: [{ type: "text", text: `Erro ao gerar certificado: ${String(err)}` }],
        isError: true,
      };
    }
  }
);

// ─── Bootstrap ────────────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("🚀 DIO Explorer MCP Server rodando em stdio");
  console.error(`📂 Dados: ${TRILHAS_JSON}`);
}

main().catch((err) => {
  console.error("Erro fatal:", err);
  process.exit(1);
});
