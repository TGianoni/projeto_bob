# DIO Explorer — Documentação Completa do Projeto

> Projeto desenvolvido com IBM Bob (IA) como demonstração prática de como usar um assistente de IA
> para construir, do zero, um projeto real com dados, slash commands, testes e um servidor MCP.

---

## Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Histórico de Prompts](#histórico-de-prompts)
4. [Guia de Uso dos Slash Commands](#guia-de-uso-dos-slash-commands)
5. [Guia de Uso do MCP Server](#guia-de-uso-do-mcp-server)
6. [Testes Unitários](#testes-unitários)
7. [Dicas de Uso com IBM Bob](#dicas-de-uso-com-ibm-bob)
8. [Insights para Futuros Profissionais](#insights-para-futuros-profissionais)
9. [Roadmap e Próximos Passos](#roadmap-e-próximos-passos)

---

## Visão Geral

O **DIO Explorer** é um projeto que simula as funcionalidades de uma plataforma de aprendizado inspirada
na [DIO (Digital Innovation One)](https://web.dio.me). Ele foi construído **inteiramente usando IBM Bob**
como assistente de engenharia, demonstrando na prática como a IA pode acelerar e estruturar o desenvolvimento
de software desde a concepção até a entrega.

**O que o projeto entrega:**
- 📚 Catálogo com 32 trilhas fictícias de tecnologia em JSON
- 🤖 3 slash commands nativos do Bob (`/trilha`, `/desafio`, `/certificado`)
- ✅ Suite de 54 testes unitários com 100% de cobertura
- 🔌 Servidor MCP completo em TypeScript pronto para uso local e remoto

---

## Estrutura do Projeto

```
projeto_bob/
│
├── .bob/                          ← Configurações locais do IBM Bob
│   ├── commands/                  ← Slash commands ativos neste projeto
│   │   ├── trilha.md              → /trilha <tecnologia>
│   │   ├── desafio.md             → /desafio <tecnologia> <nivel>
│   │   └── certificado.md        → /certificado <nome> <trilha>
│   └── mcp.json                   ← Registro do servidor MCP local
│
├── commands/                      ← Documentação detalhada dos comandos
│   ├── trilha.md
│   ├── desafio.md
│   └── certificado.md
│
├── dio_explorer/                  ← Projeto principal
│   ├── src/
│   │   └── test_runner.js         ← Suite de testes unitários (Node.js)
│   ├── data/
│   │   ├── trilhas_dio.json       ← 32 trilhas fictícias da DIO
│   │   └── resultado_testes.txt   ← Relatório da última execução de testes
│   ├── docs/                      ← Documentação (esta pasta)
│   │   ├── README.md              ← Este arquivo
│   │   ├── PROMPTS.md             ← Histórico de prompts usados
│   │   ├── GUIA_USO.md            ← Guia prático de uso
│   │   └── INSIGHTS.md            ← Insights para profissionais
│   ├── mcp/                       ← Servidor MCP
│   │   ├── src/index.ts           ← Código-fonte TypeScript
│   │   ├── build/index.js         ← Binário compilado
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md
│   ├── certificados-emitidos/     ← Certificados gerados
│   └── desafios-gerados/          ← Desafios gerados
│
└── bob.ignore                     ← Arquivos ignorados pelo Bob
```

---

## Histórico de Prompts

Veja o arquivo [`PROMPTS.md`](./PROMPTS.md) para o histórico completo e comentado de cada prompt
usado durante a construção do projeto.

---

## Guia de Uso dos Slash Commands

Veja o arquivo [`GUIA_USO.md`](./GUIA_USO.md) para instruções detalhadas de cada comando.

---

## Guia de Uso do MCP Server

### Build e inicialização

```bash
cd dio_explorer/mcp
npm install
npm run build
```

### Registro no Bob (já configurado)

O arquivo `.bob/mcp.json` já está configurado. Ao abrir este workspace no Bob, o servidor
`dio-explorer` aparecerá automaticamente no painel MCP com as três ferramentas disponíveis.

### Ferramentas disponíveis via MCP

| Ferramenta | Parâmetros |
|---|---|
| `buscar_trilha` | `tecnologia: string` |
| `gerar_desafio` | `tecnologia: string, nivel: "iniciante"\|"intermediario"\|"avancado"` |
| `gerar_certificado` | `nome_usuario: string, nome_trilha: string` |

---

## Testes Unitários

### Executar os testes

```bash
cd dio_explorer
node src/test_runner.js
```

### Resultado esperado

- **54 testes** distribuídos em 3 suítes
- **Cobertura: 100%** (meta mínima: 70%)
- Relatório salvo automaticamente em `data/resultado_testes.txt`

---

## Dicas de Uso com IBM Bob

Veja o arquivo [`INSIGHTS.md`](./INSIGHTS.md) para dicas avançadas e insights profissionais.

---

## Roadmap e Próximos Passos

| Prioridade | Feature |
|---|---|
| 🔴 Alta | Interface web (React/Next.js) para o catálogo de trilhas |
| 🔴 Alta | Banco de dados real (SQLite ou PostgreSQL) |
| 🟡 Média | Sistema de autenticação com JWT |
| 🟡 Média | Endpoint HTTPS para o MCP Server com OAuth/SSO |
| 🟡 Média | Dashboard de progresso do aluno |
| 🟢 Baixa | Integração com API real da DIO |
| 🟢 Baixa | Geração de certificados em PDF |
| 🟢 Baixa | Notificações de lives por email |
