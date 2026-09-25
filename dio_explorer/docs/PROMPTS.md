# Histórico de Prompts — DIO Explorer

> Registro completo de todos os prompts usados durante a construção do projeto com IBM Bob.
> Cada prompt é apresentado com contexto, intenção e o que foi produzido.

---

## Prompt 1 — Clonar repositório e criar estrutura

**Prompt usado:**
```
clone o repositorio https://github.com/TGianoni/projeto_bob.git em meus documentos
e depois crie a seguinte estrutura de projeto "dio_explorer" dentro vai ter que ter
pastas como src, data, commands, mcp e docs
```

**Intenção:** Iniciar o projeto clonando o repositório base e estruturando as pastas fundamentais.

**O que foi produzido:**
- Clone do repositório em `C:/Users/giano/Documents/projeto_bob`
- Pasta `dio_explorer/` com subpastas: `src/`, `data/`, `commands/`, `mcp/`, `docs/`
- Arquivos `.gitkeep` em cada pasta para rastreamento pelo Git

**Lição aprendida:**
> Começar com uma estrutura bem definida economiza tempo de refatoração. O Bob entende
> convenções de projeto e cria a estrutura certa na primeira tentativa.

---

## Prompt 2 — Criar o arquivo de dados

**Prompt usado:**
```
dentro da pasta data, quero que crie um arquivo chamado trilhas_dio.json
```

**Intenção:** Preparar o arquivo de dados que será a fonte de verdade do projeto.

**O que foi produzido:**
- Arquivo `data/trilhas_dio.json` com estrutura inicial `{}`

**Lição aprendida:**
> Criar o arquivo vazio primeiro e depois populá-lo é uma boa prática — separa a
> estrutura do conteúdo e facilita revisões incrementais.

---

## Prompt 3 — Popular o JSON com dados ricos

**Prompt usado:**
```
dentro do arquivo trilhas_dio.json crie uma lista extensa e detalhada de pelo menos
30 trilhas ficticias da DIO (https://web.dio.me/) contendo nome, tecnologia, nivel,
número de modulos xp total bads disponiveis, promoçõs, vitalicios e lives
```

**Intenção:** Criar uma base de dados realista e rica para alimentar as funcionalidades do projeto.

**O que foi produzido:**
- 32 trilhas fictícias cobrindo: Python, JavaScript, Java, AWS, Docker, Kotlin, Swift,
  Spark, CyberSecurity, React, LLMs, Spring Boot, Power BI, Blockchain, Flutter, .NET,
  Linux, TypeScript, Unity, Arquitetura, OpenCV, Vue.js, Terraform, Go, Pandas,
  Next.js, Rust, Cypress, MLOps, PHP e mais
- Cada trilha com 8 campos detalhados: `nome`, `tecnologia`, `nivel`, `numero_modulos`,
  `xp_total`, `badges_disponiveis`, `promocoes` (objeto aninhado), `vitalicio`, `lives` (array)

**Lição aprendida:**
> Quanto mais contexto você dá ao Bob (URL de referência, campos desejados, quantidade mínima),
> mais rico e consistente será o resultado. O Bob manteve coerência entre todos os 32 registros.

---

## Prompt 4 — Criar o bob.ignore

**Prompt usado:**
```
quero que na raiz do projeto recém clonado voce crie um arquivo bob.ignore, dentro do
bob.ignore quero que ele ignore a pasta node_modules, .env, pasta como data/cache-progresso
e certificados gerados e certificados emitidos e qual outro arquivo de extensão TMP
```

**Intenção:** Configurar o Bob para não rastrear arquivos desnecessários ou sensíveis.

**O que foi produzido:**
- `bob.ignore` com regras para: `node_modules/`, `.env`, `data/cache-progresso/`,
  `certificados-gerados/`, `certificados-emitidos/`, `*.tmp`

**Lição aprendida:**
> O `.bob.ignore` funciona como o `.gitignore` mas para o contexto do Bob. Configurá-lo
> cedo evita que o assistente "leia" arquivos irrelevantes e desperdice contexto.

---

## Prompt 5 — Criar slash commands (versão documentação)

**Prompt usado:**
```
crie agora um slash command chamado /trilha que recebe o nome de uma tecnologia e retorna
a partir do arquivo data/trilhas.json um plano de estudo com os modulos daquela trilha.
Depois crie outro slash command chamado /desafio que gera um desafio de codigo aleatorio
baseado no nivel e tecnologia escolhido pelo usuario, e por fim, um ultimo slash command
chamado certificado que gera um certificado fictício em markdown com nome de usuário e a
trilha por ele concluída
```

**Intenção:** Criar a documentação de comportamento dos comandos antes de implementá-los.

**O que foi produzido:**
- `commands/trilha.md` — especificação do `/trilha`
- `commands/desafio.md` — especificação do `/desafio`
- `commands/certificado.md` — especificação do `/certificado`

---

## Prompt 6 — Criar slash commands reais do Bob

**Prompt usado:**
```
crie um slash command dentro do projeto que possa ser invocado pelo comando trilha,
toda vez que eu digitar no chat do bob o comando "/trilha" ele deve executar a seguinte
tarefa: [...] Todos esses slash commands tem que ficar armazenados de forma local, para
serem executados apenas neste projeto. Mas devo visualiza-lo aqui no chat do bob
```

**Intenção:** Criar os slash commands reais e funcionais do Bob, com frontmatter correto.

**O que foi produzido:**
- `.bob/commands/trilha.md` com `description` e `argument-hint: <tecnologia>`
- `.bob/commands/desafio.md` com `argument-hint: <tecnologia> <nivel>`
- `.bob/commands/certificado.md` com `argument-hint: <nome_usuario> <nome_trilha>`

**Lição aprendida:**
> Slash commands do Bob ficam em `.bob/commands/` (local ao projeto) ou `~/.bob/commands/`
> (globais). O frontmatter YAML controla a descrição e o hint de argumentos que aparece
> no menu ao digitar `/`. O conteúdo do `.md` é o prompt que o Bob executa.

---

## Prompt 7 — Testes unitários e cobertura

**Prompt usado:**
```
Crie arquivos de testes unitario e teste este fluxo para atingir uma cobertura de 70%
de aprovação. Teste os comandos /trilha para consultar trilhas de JAVA, gere um arquivo
de /desafio para o aluno e um /certificado para o mesmo. Grave os resultados em um
arquivo txt para acompanharmos
```

**Intenção:** Validar o comportamento dos três módulos com testes automatizados.

**O que foi produzido:**
- `src/test_runner.js` — 54 testes unitários em Node.js puro (sem dependências)
- `data/resultado_testes.txt` — relatório gerado automaticamente
- `certificados-emitidos/João_Gianoni_DIO-2026-*.md` — certificado real gerado
- `desafios-gerados/desafio_DIO-JAVA-*.md` — desafio real gerado
- Resultado: **100% de cobertura** (meta era 70%)

**Lição aprendida:**
> O Bob não apenas criou os testes — ele implementou os módulos testáveis, os artefatos
> de saída e o relatório num único pass. Especificar a cobertura mínima desejada ajuda
> o assistente a calibrar a densidade dos testes.

---

## Prompt 8 — MCP Server

**Prompt usado:**
```
Crie um MCP SERVE do projeto para que futuramente pessoas possam vir acessar por meio
de um servidor https ou sso ou via API. Use a pasta mcp para isso
```

**Intenção:** Expor as funcionalidades do projeto via protocolo MCP para integração com
clientes externos (Bob, Claude Desktop, APIs HTTP, SSO).

**O que foi produzido:**
- `mcp/src/index.ts` — servidor TypeScript com 3 ferramentas registradas
- `mcp/package.json` + `mcp/tsconfig.json` — configuração do projeto Node.js
- `mcp/build/index.js` — binário compilado e funcional
- `mcp/README.md` — documentação de uso local e remoto
- `.bob/mcp.json` — registro automático no workspace do Bob

**Lição aprendida:**
> O padrão MCP (Model Context Protocol) é o futuro da integração entre ferramentas e IAs.
> Construir um servidor MCP torna seu projeto consumível por qualquer cliente compatível —
> não apenas o Bob. É uma camada de API para o mundo dos LLMs.

---

## Prompt 9 — Documentação completa

**Prompt usado:**
```
gostaria que voce documentasse todo o projeto feito até o momento com todos os prompts
usados, modos de uso, dicas de uso e insights para futuro profissionais que vão aprender
com nosso projeto
```

**Intenção:** Consolidar todo o conhecimento produzido ao longo do projeto em documentação
permanente e educacional.

**O que foi produzido:**
- `docs/README.md` — visão geral e índice
- `docs/PROMPTS.md` — este arquivo
- `docs/GUIA_USO.md` — guia prático de uso
- `docs/INSIGHTS.md` — insights para profissionais
