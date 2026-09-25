# 🚀 DIO Explorer

> Projeto construído do zero com **IBM Bob** como demonstração prática de engenharia de software assistida por IA.  
> Inspirado na plataforma [Digital Innovation One](https://web.dio.me).

---

## 📋 Sobre o Projeto

O **DIO Explorer** simula as funcionalidades de uma plataforma de aprendizado com trilhas de tecnologia, desafios de código e certificados. Todo o projeto foi construído em uma única sessão usando IBM Bob, do scaffolding ao deploy.

**O que o projeto entrega:**
- 📚 Catálogo com **32 trilhas fictícias** de tecnologia em JSON
- ⚡ **3 slash commands** nativos do Bob (`/trilha`, `/desafio`, `/certificado`)
- ✅ **54 testes unitários** com 100% de cobertura
- 🔌 **Servidor MCP** em TypeScript pronto para uso local e remoto (HTTPS/SSO/API)

---

## 🗂️ Estrutura do Projeto

```
projeto_bob/
├── .bob/
│   ├── commands/           ← Slash commands ativos no IBM Bob
│   │   ├── trilha.md       → /trilha <tecnologia>
│   │   ├── desafio.md      → /desafio <tecnologia> <nivel>
│   │   └── certificado.md  → /certificado <nome> <trilha>
│   └── mcp.json            ← Registro do servidor MCP local
│
├── commands/               ← Documentação dos slash commands
├── dio_explorer/
│   ├── src/
│   │   └── test_runner.js  ← 54 testes unitários (Node.js puro)
│   ├── data/
│   │   ├── trilhas_dio.json        ← Catálogo com 32 trilhas
│   │   └── resultado_testes.txt   ← Relatório de testes
│   ├── docs/               ← Documentação completa
│   │   ├── README.md
│   │   ├── PROMPTS.md      ← Histórico de todos os prompts usados
│   │   ├── GUIA_USO.md     ← Guia prático de uso
│   │   └── INSIGHTS.md     ← Insights para futuros profissionais
│   ├── mcp/                ← Servidor MCP (TypeScript)
│   │   ├── src/index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── certificados-emitidos/
│   └── desafios-gerados/
│
└── bob.ignore
```

---

## ⚡ Slash Commands

Abra o workspace no IBM Bob e digite `/` para ver os comandos disponíveis.

### `/trilha <tecnologia>`
Busca trilhas no catálogo e retorna um plano de estudos formatado.
```
/trilha Java
/trilha Python
/trilha React
```

### `/desafio <tecnologia> <nivel>`
Gera um desafio de código com enunciado, requisitos e critérios de avaliação.
Níveis: `iniciante` | `intermediario` | `avancado`
```
/desafio Java intermediario
/desafio Python iniciante
/desafio Rust avancado
```

### `/certificado <nome_usuario> <nome_trilha>`
Emite um certificado fictício em Markdown com ID único e salva em `certificados-emitidos/`.
```
/certificado "João Silva" "Java Spring Boot do Zero ao Deploy"
```

---

## 🔌 MCP Server

### Instalação e build

```bash
cd dio_explorer/mcp
npm install
npm run build
```

### Ferramentas disponíveis

| Ferramenta | Parâmetros | Descrição |
|---|---|---|
| `buscar_trilha` | `tecnologia: string` | Retorna plano de estudos |
| `gerar_desafio` | `tecnologia, nivel` | Gera e salva desafio |
| `gerar_certificado` | `nome_usuario, nome_trilha` | Emite e salva certificado |

O servidor é registrado automaticamente no Bob via `.bob/mcp.json`.  
Para acesso remoto (HTTPS/SSO), consulte [`dio_explorer/mcp/README.md`](dio_explorer/mcp/README.md).

---

## 🧪 Testes Unitários

```bash
cd dio_explorer
node src/test_runner.js
```

- **54 testes** em 3 suítes (`/trilha`, `/desafio`, `/certificado`)
- **100% de cobertura** (meta mínima: 70%)
- Relatório salvo automaticamente em `data/resultado_testes.txt`

---

## 📖 Documentação Completa

| Documento | Conteúdo |
|---|---|
| [`docs/PROMPTS.md`](dio_explorer/docs/PROMPTS.md) | Histórico dos 9 prompts usados com contexto e resultados |
| [`docs/GUIA_USO.md`](dio_explorer/docs/GUIA_USO.md) | Guia prático de uso de todos os recursos |
| [`docs/INSIGHTS.md`](dio_explorer/docs/INSIGHTS.md) | 20 insights para futuros profissionais |

---

## 🛠️ Stack

- **Runtime:** Node.js 18+
- **Linguagem MCP:** TypeScript
- **Protocolo:** [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- **Dados:** JSON
- **Testes:** Node.js puro (sem frameworks externos)
- **IA usada:** IBM Bob

---

## 🗺️ Roadmap

- [ ] Interface web (React/Next.js) para o catálogo
- [ ] Banco de dados real (SQLite ou PostgreSQL)
- [ ] Autenticação JWT
- [ ] Endpoint HTTPS para o MCP Server
- [ ] Dashboard de progresso do aluno
- [ ] Geração de certificados em PDF

---

> Projeto desenvolvido com **IBM Bob** como estudo de caso de engenharia assistida por IA.
