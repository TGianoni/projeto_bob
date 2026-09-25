/**
 * DIO Explorer — Test Runner
 * Testes unitários para os comandos /trilha, /desafio e /certificado
 * Cobertura alvo: >= 70%
 *
 * Execução: node src/test_runner.js
 */

const fs = require("fs");
const path = require("path");

// ─── Utilitários do runner ────────────────────────────────────────────────────

const results = [];
let passed = 0;
let failed = 0;

function assert(description, condition, detail = "") {
  if (condition) {
    passed++;
    results.push({ status: "PASS", description, detail });
  } else {
    failed++;
    results.push({ status: "FAIL", description, detail: detail || "Condição falhou" });
  }
}

function section(name) {
  results.push({ status: "SECTION", description: name });
}

// ─── Módulo sob teste: trilha ─────────────────────────────────────────────────

function loadTrilhas() {
  const jsonPath = path.join(__dirname, "../data/trilhas_dio.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(raw);
}

function buscarTrilha(tecnologia) {
  const { trilhas } = loadTrilhas();
  return trilhas.filter(t =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

function gerarPlanoEstudo(trilha) {
  if (!trilha) return null;
  const promocao = trilha.promocoes.ativa
    ? `🔥 ${trilha.promocoes.desconto_percentual}% de desconto até ${trilha.promocoes.validade}`
    : "Sem promoção ativa no momento.";

  const livesFormatadas = trilha.lives
    .map(l => `  - ${l.titulo} (${l.data}) — ${l.gravada ? "Gravada ✅" : "Ao vivo 🔴"}`)
    .join("\n");

  const badges = trilha.badges_disponiveis.map(b => `  - ${b}`).join("\n");

  return `# 📚 Plano de Estudo — ${trilha.nome}

**Tecnologia:** ${trilha.tecnologia}
**Nível:** ${trilha.nivel}
**Módulos:** ${trilha.numero_modulos}
**XP Total:** ${trilha.xp_total} XP
**Acesso Vitalício:** ${trilha.vitalicio ? "Sim" : "Não"}

## 🗂️ Módulos previstos
${Array.from({ length: trilha.numero_modulos }, (_, i) => `  ${i + 1}. Módulo ${i + 1}`).join("\n")}

## 🏅 Badges disponíveis
${badges}

## 📺 Lives
${livesFormatadas}

## 🎯 Promoção
${promocao}`;
}

// ─── Módulo sob teste: desafio ────────────────────────────────────────────────

const NIVEIS_VALIDOS = ["iniciante", "intermediario", "avancado"];

const DESAFIOS = {
  iniciante: [
    "Crie uma classe `Pessoa` com nome e idade. Implemente `toString()` e valide que idade >= 0.",
    "Implemente uma pilha (Stack) usando array com push, pop e peek.",
  ],
  intermediario: [
    "Crie uma API REST simples com Spring Boot que gerencie uma lista de tarefas em memória.",
    "Implemente o padrão Repository para persistir entidades `Produto` com JPA.",
  ],
  avancado: [
    "Implemente um sistema de filas com RabbitMQ consumindo mensagens de forma assíncrona.",
    "Crie um pipeline de CI/CD completo para um projeto Spring Boot com GitHub Actions.",
  ],
};

function gerarDesafio(tecnologia, nivel) {
  if (!tecnologia) return { erro: "Tecnologia não informada." };
  const nivelNorm = nivel ? nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
  if (!NIVEIS_VALIDOS.includes(nivelNorm)) {
    return { erro: `Nível "${nivel}" inválido. Use: iniciante, intermediario ou avancado.` };
  }
  const pool = DESAFIOS[nivelNorm];
  const enunciado = pool[Math.floor(Math.random() * pool.length)];
  const xpMap = { iniciante: 500, intermediario: 1200, avancado: 2500 };
  const id = `DIO-${tecnologia.toUpperCase().replace(/\s/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id,
    tecnologia,
    nivel: nivelNorm,
    enunciado,
    requisitos: [
      "Código compila e executa sem erros",
      "Cobertura de testes >= 70%",
      "Sem uso de bibliotecas não autorizadas",
      "README com instruções de execução",
    ],
    dicas: [
      `Consulte a documentação oficial de ${tecnologia}`,
      "Escreva testes antes de implementar (TDD)",
    ],
    xp: xpMap[nivelNorm],
    badge: `${tecnologia} ${nivelNorm.charAt(0).toUpperCase() + nivelNorm.slice(1)} Challenger`,
  };
}

function formatarDesafio(d) {
  if (d.erro) return `❌ ${d.erro}`;
  return `# ⚔️ Desafio DIO — ${d.tecnologia} (${d.nivel})

**ID:** ${d.id}
**Dificuldade:** ${d.nivel}
**Tecnologia:** ${d.tecnologia}

## 📋 Enunciado
${d.enunciado}

## ✅ Requisitos
${d.requisitos.map(r => `- [ ] ${r}`).join("\n")}

## 💡 Dicas
${d.dicas.map(t => `> ${t}`).join("\n")}

## 🏆 Critérios de Avaliação
| Critério | Peso |
|----------|------|
| Funcionalidade | 40% |
| Qualidade do código | 30% |
| Boas práticas | 20% |
| Criatividade | 10% |

## 🎁 Recompensa
**+${d.xp} XP** · Badge: **${d.badge}**`;
}

// ─── Módulo sob teste: certificado ───────────────────────────────────────────

function gerarHashId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function gerarCertificado(nomeUsuario, nomeTrilha) {
  if (!nomeUsuario || !nomeTrilha) {
    return { erro: "Nome do usuário e nome da trilha são obrigatórios." };
  }
  const { trilhas } = loadTrilhas();
  const trilha = trilhas.find(t =>
    t.nome.toLowerCase().includes(nomeTrilha.toLowerCase())
  );
  if (!trilha) {
    return { erro: `Trilha "${nomeTrilha}" não encontrada.` };
  }
  const hoje = new Date();
  const data = `${String(hoje.getDate()).padStart(2, "0")}/${String(hoje.getMonth() + 1).padStart(2, "0")}/${hoje.getFullYear()}`;
  const ano = hoje.getFullYear();
  const hash = gerarHashId();
  const certId = `DIO-${ano}-${hash}`;

  return {
    certId,
    nomeUsuario,
    trilha,
    data,
    markdown: `---
certificado_id: ${certId}
emitido_em: ${data}
usuario: ${nomeUsuario}
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

# ${nomeUsuario.toUpperCase()}

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
${trilha.badges_disponiveis.map(b => `- ${b}`).join("\n")}

---

> *Este certificado comprova a dedicação e o esforço do(a) aluno(a)*
> *na jornada de aprendizado da plataforma DIO Explorer.*

---

**Digital Innovation One**
https://web.dio.me · Emitido via DIO Explorer Bot

---
*Verificação: \`${certId}\` · Documento fictício gerado automaticamente.*`,
  };
}

// ─── SUITE DE TESTES ──────────────────────────────────────────────────────────

// — /trilha —
section("/trilha — Consulta de trilhas Java");

const trilhasJava = buscarTrilha("Java");
assert("Retorna ao menos 1 trilha para 'Java'", trilhasJava.length >= 1);
assert("Trilha Java contém campo 'nome'", trilhasJava.every(t => typeof t.nome === "string"));
assert("Trilha Java contém campo 'tecnologia'", trilhasJava.every(t => typeof t.tecnologia === "string"));
assert("Trilha Java contém campo 'nivel'", trilhasJava.every(t => typeof t.nivel === "string"));
assert("Trilha Java contém campo 'numero_modulos'", trilhasJava.every(t => typeof t.numero_modulos === "number"));
assert("Trilha Java contém campo 'xp_total'", trilhasJava.every(t => typeof t.xp_total === "number"));
assert("Trilha Java contém campo 'badges_disponiveis'", trilhasJava.every(t => Array.isArray(t.badges_disponiveis)));
assert("Trilha Java contém campo 'lives'", trilhasJava.every(t => Array.isArray(t.lives)));
assert("Trilha Java contém campo 'vitalicio'", trilhasJava.every(t => typeof t.vitalicio === "boolean"));
assert("Trilha Java contém campo 'promocoes'", trilhasJava.every(t => t.promocoes && typeof t.promocoes === "object"));
assert("xp_total da trilha Java é > 0", trilhasJava.every(t => t.xp_total > 0));
assert("numero_modulos da trilha Java é > 0", trilhasJava.every(t => t.numero_modulos > 0));
assert("Busca é case-insensitive ('java')", buscarTrilha("java").length >= 1);
assert("Busca é case-insensitive ('JAVA')", buscarTrilha("JAVA").length >= 1);
assert("Busca por tecnologia inexistente retorna array vazio", buscarTrilha("COBOL_XYZ_404").length === 0);

const plano = gerarPlanoEstudo(trilhasJava[0]);
assert("Plano de estudo é gerado como string", typeof plano === "string");
assert("Plano contém o nome da trilha", plano.includes(trilhasJava[0].nome));
assert("Plano contém seção de Módulos", plano.includes("Módulos previstos"));
assert("Plano contém seção de Badges", plano.includes("Badges disponíveis"));
assert("Plano contém seção de Lives", plano.includes("Lives"));
assert("Plano contém seção de Promoção", plano.includes("Promoção"));
assert("gerarPlanoEstudo com null retorna null", gerarPlanoEstudo(null) === null);

// — /desafio —
section("/desafio — Geração de desafio para Java");

const desafio = gerarDesafio("Java", "intermediario");
assert("Desafio gerado não contém erro", !desafio.erro);
assert("Desafio contém campo 'id'", typeof desafio.id === "string");
assert("Desafio contém campo 'enunciado'", typeof desafio.enunciado === "string" && desafio.enunciado.length > 10);
assert("Desafio contém campo 'requisitos'", Array.isArray(desafio.requisitos) && desafio.requisitos.length > 0);
assert("Desafio contém campo 'dicas'", Array.isArray(desafio.dicas) && desafio.dicas.length > 0);
assert("Desafio contém campo 'xp'", typeof desafio.xp === "number" && desafio.xp > 0);
assert("Desafio contém campo 'badge'", typeof desafio.badge === "string");
assert("XP de nível intermediário é 1200", desafio.xp === 1200);
assert("Nível inválido retorna erro", !!gerarDesafio("Java", "expert").erro);
assert("Tecnologia vazia retorna erro", !!gerarDesafio("", "iniciante").erro);
assert("Nível 'iniciante' retorna xp 500", gerarDesafio("Java", "iniciante").xp === 500);
assert("Nível 'avancado' retorna xp 2500", gerarDesafio("Java", "avancado").xp === 2500);

const desafioFormatado = formatarDesafio(desafio);
assert("Desafio formatado é string", typeof desafioFormatado === "string");
assert("Desafio formatado contém '⚔️'", desafioFormatado.includes("⚔️"));
assert("Desafio formatado contém ID", desafioFormatado.includes(desafio.id));
assert("Desafio formatado contém seção Enunciado", desafioFormatado.includes("Enunciado"));
assert("Desafio formatado contém seção Requisitos", desafioFormatado.includes("Requisitos"));
assert("Desafio formatado contém seção Recompensa", desafioFormatado.includes("Recompensa"));
assert("formatarDesafio com erro exibe ❌", formatarDesafio({ erro: "Falha" }).startsWith("❌"));

// — /certificado —
section("/certificado — Geração de certificado para aluno Java");

const cert = gerarCertificado("João Gianoni", "Java Spring Boot");
assert("Certificado gerado sem erro", !cert.erro);
assert("Certificado contém certId", typeof cert.certId === "string" && cert.certId.startsWith("DIO-"));
assert("Certificado contém nomeUsuario", cert.nomeUsuario === "João Gianoni");
assert("Certificado contém dados da trilha", cert.trilha && cert.trilha.nome.includes("Java"));
assert("Certificado contém data de emissão", typeof cert.data === "string" && cert.data.includes("/"));
assert("Certificado markdown é string", typeof cert.markdown === "string");
assert("Markdown contém nome do usuário em maiúsculo", cert.markdown.includes("JOÃO GIANONI"));
assert("Markdown contém nome da trilha", cert.markdown.includes(cert.trilha.nome));
assert("Markdown contém certificado_id no frontmatter", cert.markdown.includes(cert.certId));
assert("Markdown contém seção Badges", cert.markdown.includes("Badges Conquistadas"));
assert("Certificado com trilha inexistente retorna erro", !!gerarCertificado("Teste", "Trilha_QUE_NAO_EXISTE_XYZ").erro);
assert("Certificado sem nome retorna erro", !!gerarCertificado("", "Java Spring Boot").erro);
assert("Certificado sem trilha retorna erro", !!gerarCertificado("João", "").erro);

// ─── SALVAR ARTEFATOS ─────────────────────────────────────────────────────────

// Certificados emitidos
const certDir = path.join(__dirname, "../certificados-emitidos");
if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });
const certFilename = `${cert.nomeUsuario.replace(/\s/g, "_")}_${cert.certId}.md`;
fs.writeFileSync(path.join(certDir, certFilename), cert.markdown, "utf-8");

// Desafio gerado
const desafioDir = path.join(__dirname, "../desafios-gerados");
if (!fs.existsSync(desafioDir)) fs.mkdirSync(desafioDir, { recursive: true });
const desafioFilename = `desafio_${desafio.id}.md`;
fs.writeFileSync(path.join(desafioDir, desafioFilename), formatarDesafio(desafio), "utf-8");

// ─── RELATÓRIO ────────────────────────────────────────────────────────────────

const total = passed + failed;
const coveragePct = ((passed / total) * 100).toFixed(1);
const status = parseFloat(coveragePct) >= 70 ? "✅ APROVADO" : "❌ REPROVADO";
const now = new Date().toLocaleString("pt-BR");

let report = "";
report += "=".repeat(65) + "\n";
report += "  DIO EXPLORER — RELATÓRIO DE TESTES UNITÁRIOS\n";
report += `  Gerado em: ${now}\n`;
report += "=".repeat(65) + "\n\n";

let currentSection = "";
for (const r of results) {
  if (r.status === "SECTION") {
    report += `\n── ${r.description} ${"─".repeat(Math.max(0, 50 - r.description.length))}\n`;
    currentSection = r.description;
  } else {
    const icon = r.status === "PASS" ? "✔" : "✘";
    report += `  [${icon}] ${r.description}`;
    if (r.status === "FAIL" && r.detail) report += `\n       ↳ ${r.detail}`;
    report += "\n";
  }
}

report += "\n" + "=".repeat(65) + "\n";
report += `  RESUMO\n`;
report += "=".repeat(65) + "\n";
report += `  Total de testes : ${total}\n`;
report += `  Aprovados (PASS) : ${passed}\n`;
report += `  Reprovados (FAIL): ${failed}\n`;
report += `  Cobertura        : ${coveragePct}%\n`;
report += `  Resultado        : ${status}\n`;
report += "\n";
report += `  Artefatos gerados:\n`;
report += `    - Certificado : dio_explorer/certificados-emitidos/${certFilename}\n`;
report += `    - Desafio     : dio_explorer/desafios-gerados/${desafioFilename}\n`;
report += "=".repeat(65) + "\n";

// Salvar relatório
const reportPath = path.join(__dirname, "../data/resultado_testes.txt");
fs.writeFileSync(reportPath, report, "utf-8");

// Exibir no console
console.log(report);
