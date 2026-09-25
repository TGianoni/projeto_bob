# DIO Explorer MCP Server

Servidor MCP que expõe as funcionalidades do DIO Explorer como ferramentas consumíveis por qualquer cliente compatível com o [Model Context Protocol](https://modelcontextprotocol.io) — incluindo IBM Bob, Claude Desktop, e integrações HTTP/SSO/API externas.

---

## 🛠️ Ferramentas disponíveis

| Ferramenta | Descrição |
|---|---|
| `buscar_trilha` | Busca trilhas por tecnologia e retorna plano de estudos formatado |
| `gerar_desafio` | Gera desafio de código aleatório por tecnologia e nível |
| `gerar_certificado` | Emite certificado fictício em Markdown para o aluno |

---

## ⚙️ Instalação e build

```bash
cd dio_explorer/mcp
npm install
npm run build
```

O binário compilado ficará em `mcp/build/index.js`.

---

## 🚀 Uso local (stdio — IBM Bob)

Após o build, registre no `.bob/mcp.json` do projeto:

```json
{
  "mcpServers": {
    "dio-explorer": {
      "command": "node",
      "args": ["C:/Users/giano/Documents/projeto_bob/dio_explorer/mcp/build/index.js"]
    }
  }
}
```

Reinicie o Bob. As ferramentas aparecerão automaticamente no painel MCP.

---

## 🌐 Acesso remoto (HTTPS / API / SSO)

O servidor utiliza transporte **stdio** por padrão, que é o modo recomendado para uso local.  
Para expô-lo via HTTPS, SSO ou API REST, utilize um dos padrões abaixo:

### Opção 1 — Proxy HTTP com `mcp-remote`

Instale o adaptador oficial:

```bash
npm install -g @modelcontextprotocol/proxy
```

Sirva o processo stdio como endpoint HTTP:

```bash
mcp-proxy --port 3000 -- node dio_explorer/mcp/build/index.js
```

O servidor ficará acessível em `http://localhost:3000/mcp`.  
Para HTTPS, coloque um reverse proxy (nginx, Caddy) na frente com certificado TLS.

### Opção 2 — Registro remoto no Bob (URL)

Se o servidor já estiver rodando em HTTPS em um host remoto:

```json
{
  "mcpServers": {
    "dio-explorer-remote": {
      "url": "https://seu-dominio.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:DIO_API_TOKEN}"
      }
    }
  }
}
```

### Opção 3 — SSO / OAuth

Para proteger o endpoint com SSO (ex: Azure AD, Okta):

1. Execute o script `mcp/scripts/get-token.js` uma única vez para obter o refresh token.
2. Configure a variável de ambiente `DIO_SSO_TOKEN` no ambiente do processo.
3. O servidor usa `${env:DIO_SSO_TOKEN}` no header de autorização.

---

## 🔐 Variáveis de ambiente

| Variável | Uso | Obrigatória |
|---|---|---|
| `DIO_API_TOKEN` | Token Bearer para acesso remoto via HTTPS | Somente no modo remoto |
| `DIO_SSO_TOKEN` | Refresh token OAuth/SSO | Somente no modo SSO |
| `DIO_DATA_PATH` | Caminho alternativo para `trilhas_dio.json` | Não (usa padrão relativo) |

---

## 📁 Estrutura

```
mcp/
├── src/
│   └── index.ts        ← Servidor MCP principal
├── build/              ← Gerado por `npm run build`
│   └── index.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📋 Exemplos de uso (via Bob)

```
Busque a trilha de Java
→ Chama: buscar_trilha({ tecnologia: "Java" })

Gere um desafio de Python nível avançado
→ Chama: gerar_desafio({ tecnologia: "Python", nivel: "avancado" })

Emita o certificado de "Maria Silva" para a trilha "React"
→ Chama: gerar_certificado({ nome_usuario: "Maria Silva", nome_trilha: "React" })
```
