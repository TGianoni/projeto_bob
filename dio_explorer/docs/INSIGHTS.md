# Insights para Futuros Profissionais — DIO Explorer

> Lições aprendidas, padrões descobertos e reflexões sobre o uso de IA no desenvolvimento
> de software. Este documento foi escrito com base na experiência real de construir este
> projeto do zero usando IBM Bob.

---

## 🧠 Sobre usar IA como parceiro de desenvolvimento

### 1. A IA não substitui o raciocínio — ela amplifica

O Bob não "inventou" o projeto. Ele executou com precisão cada instrução dada.
A qualidade do output é diretamente proporcional à qualidade do input (o prompt).

> **Princípio fundamental:** Garbage in, garbage out — mas com IA o efeito é amplificado.
> Um prompt vago produz código vago. Um prompt preciso produz código de produção.

### 2. Iteração incremental supera o prompt perfeito

Não existe um único prompt mágico que gera tudo de uma vez. Este projeto foi construído
em **9 prompts incrementais**, cada um adicionando uma camada sobre a anterior.

**Padrão recomendado:**
```
Prompt 1: estrutura e scaffolding
Prompt 2: dados e modelos
Prompt 3: lógica de negócio
Prompt 4: interface (commands/APIs)
Prompt 5: testes e validação
Prompt 6: infraestrutura (MCP/deploy)
Prompt 7: documentação
```

### 3. Contexto acumulado é um ativo valioso

O Bob lembrou de cada decisão anterior ao longo de toda a sessão — nomes de arquivos,
estrutura de pastas, dados do JSON. Isso significa que você pode referenciar trabalho
anterior sem repetir detalhes:

```
✅ "use o arquivo trilhas_dio.json que criamos" (funciona)
✅ "baseado na trilha Java que encontramos" (funciona)
❌ "crie algo para as trilhas" (vago demais)
```

---

## 🏗️ Sobre arquitetura e estrutura de projetos

### 4. Separe responsabilidades desde o início

A estrutura `src/`, `data/`, `commands/`, `mcp/`, `docs/` não foi acidental.
Cada pasta tem uma responsabilidade única:

| Pasta | Responsabilidade |
|---|---|
| `src/` | Lógica executável (testes, scripts) |
| `data/` | Dados e estado persistido |
| `commands/` | Interface do usuário (slash commands documentados) |
| `mcp/` | Camada de integração e exposição de API |
| `docs/` | Conhecimento e memória do projeto |

> Projetos sem separação clara de responsabilidades se tornam impossíveis de manter.

### 5. O JSON como fonte de verdade

Usar `trilhas_dio.json` como única fonte de verdade para os três comandos (`/trilha`,
`/desafio`, `/certificado`) e para o MCP Server garante **consistência automática**:
mudar um dado no JSON reflete em todos os consumidores.

> Este é o padrão **Single Source of Truth (SSOT)** — fundamental em sistemas distribuídos.

### 6. .gitkeep e arquivos de controle

Adicionar `.gitkeep` em pastas vazias parece trivial, mas é uma convenção importante:
garante que a estrutura do projeto seja versionada mesmo antes de ter conteúdo.

---

## 🔌 Sobre MCP (Model Context Protocol)

### 7. MCP é o futuro das integrações com IA

O protocolo MCP padroniza como ferramentas externas se comunicam com LLMs.
Ao construir um servidor MCP, você torna seu projeto consumível por:
- IBM Bob
- Claude Desktop
- Qualquer futuro cliente compatível com MCP

> Pense no MCP como o "REST API para o mundo dos LLMs". Aprender a construir
> servidores MCP hoje é uma vantagem competitiva real.

### 8. stdio vs HTTP — quando usar cada um

| Transporte | Quando usar |
|---|---|
| `stdio` | Uso local, desenvolvimento, projetos pessoais |
| `HTTP/HTTPS` | Equipes, produção, acesso remoto |
| `SSO/OAuth` | Empresas, dados sensíveis, multi-usuário |

Comece sempre com `stdio` (mais simples) e migre para HTTP quando precisar de acesso remoto.

### 9. TypeScript para servidores MCP

TypeScript é a escolha certa para servidores MCP porque:
- Tipagem forte previne erros em runtime
- O SDK oficial do MCP tem tipos completos
- O `zod` valida os inputs das ferramentas antes de executar
- O binário compilado é portável e não precisa de TypeScript em produção

---

## 🧪 Sobre testes e qualidade

### 10. Testes sem frameworks externos são possíveis — e úteis

O `test_runner.js` usa apenas Node.js puro. Sem Jest, sem Mocha, sem dependências.
Isso demonstra que a **lógica de teste** é independente das ferramentas.

> Entender como um framework de testes funciona internamente (assert, runner, reporter)
> torna você um desenvolvedor melhor — mesmo que use Jest no dia a dia.

### 11. A meta de 70% é um piso, não um teto

Especificamos 70% de cobertura como meta mínima — e atingimos 100%.
Isso acontece porque o Bob, ao testar, naturalmente cobre casos felizes **e** casos de erro.

> Boa cobertura de testes não é sobre porcentagem — é sobre testar os casos que importam:
> happy path, edge cases, e tratamento de erros.

### 12. Artefatos de teste são parte do produto

Os testes não apenas validam — eles **produzem artefatos reais**:
- Um certificado foi emitido durante os testes
- Um desafio foi gerado durante os testes
- Um relatório `.txt` foi salvo

> Testes que produzem outputs úteis são mais valiosos do que testes que apenas passam/falham.

---

## 📝 Sobre slash commands e automação

### 13. Slash commands são prompts versionados

Um arquivo `.md` em `.bob/commands/` é essencialmente um **prompt salvo e reutilizável**.
Isso tem implicações importantes:

- Você pode versionar seus prompts junto com o código (Git)
- Sua equipe compartilha os mesmos prompts, garantindo consistência
- É possível iterar nos prompts como se itera no código

> Os slash commands transformam prompts efêmeros em ativos permanentes do projeto.

### 14. O argumento `$1`, `$2` e o `argument-hint`

O frontmatter dos slash commands aceita:
- `description`: aparece no menu `/`
- `argument-hint`: mostra o hint de argumentos (`<tecnologia>`)
- `$1`, `$2`: variáveis substituídas pelo que o usuário digita

```markdown
---
description: Busca trilhas por tecnologia
argument-hint: <tecnologia>
---
Busque a trilha de "$1" no arquivo trilhas_dio.json...
```

### 15. Comandos locais vs globais

| Localização | Escopo |
|---|---|
| `.bob/commands/` | Apenas este projeto |
| `~/.bob/commands/` | Todos os projetos |

Use **local** para comandos específicos do domínio do projeto.
Use **global** para comandos de workflow que você usa em todo lugar (ex: `/review`, `/commit`).

---

## 🚀 Sobre crescimento profissional

### 16. Documente enquanto constrói, não depois

Este documento foi criado como parte do projeto, não como uma tarefa separada.
Documentar enquanto você constrói é mais fácil e mais preciso — os detalhes ainda estão frescos.

### 17. O projeto como portfólio

Este projeto demonstra na prática:
- Conhecimento de estrutura de projetos
- Capacidade de trabalhar com JSON e dados
- Entendimento de protocolo MCP e integrações
- Escrita de testes unitários
- Uso eficiente de ferramentas de IA
- Documentação técnica clara

> Um projeto bem documentado vale mais que 10 projetos sem documentação no portfólio.

### 18. Aprenda os protocolos, não só as ferramentas

As ferramentas mudam. Os protocolos ficam.
- REST ainda está aqui 20 anos depois
- Git ainda está aqui 18 anos depois
- MCP está sendo adotado como padrão pela indústria

Investir em entender **como** o MCP funciona (não apenas como usá-lo) é um diferencial duradouro.

### 19. A IA como aceleradora do aprendizado

Use o Bob para:
- Entender código que você não conhece: "explique este código TypeScript"
- Aprender padrões: "mostre como implementar o padrão Observer em Java"
- Resolver problemas específicos: "por que este JSON está inválido"
- Gerar código boilerplate: "crie um CRUD básico em Spring Boot"

Mas sempre **leia e entenda** o que foi gerado. A IA aprende por você, mas não aprende **por você**.

### 20. Construa, quebre, conserte — e documente tudo

O maior aprendizado deste projeto não está nos arquivos gerados.
Está no processo: cada prompt, cada ajuste, cada erro e cada correção.

> O código é o produto. O processo é o conhecimento. Este arquivo é o legado.
