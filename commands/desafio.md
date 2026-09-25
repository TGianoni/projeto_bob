# /desafio

**Descrição:** Gera um desafio de código aleatório com base no nível e na tecnologia escolhidos pelo usuário.

---

## Como usar

```
/desafio <tecnologia> <nivel>
```

**Níveis aceitos:** `iniciante` | `intermediario` | `avancado`

**Exemplos:**
```
/desafio Python iniciante
/desafio JavaScript intermediario
/desafio Rust avancado
```

---

## Comportamento

1. Valida os parâmetros `tecnologia` e `nivel`.
2. Seleciona aleatoriamente um desafio do banco interno compatível com a combinação informada.
3. Exibe o enunciado, os requisitos, dicas e critérios de avaliação.

---

## Banco de desafios (exemplos por nível)

### Iniciante
- Crie uma função que some dois números e retorne o resultado.
- Escreva um programa que leia uma lista e filtre apenas os números pares.
- Implemente um contador de palavras em uma string.
- Crie uma função que verifique se uma string é um palíndromo.
- Escreva um programa que calcule o fatorial de um número.

### Intermediário
- Implemente uma API REST com CRUD completo para gerenciar tarefas.
- Crie um sistema de autenticação simples com JWT.
- Desenvolva um scraper que colete títulos de notícias de um site.
- Implemente uma estrutura de dados de pilha (stack) do zero.
- Crie um sistema de cache simples com TTL (time-to-live).

### Avançado
- Implemente um sistema de filas distribuído com publish/subscribe.
- Crie um pipeline de CI/CD com testes automatizados e deploy.
- Desenvolva um motor de busca simples com índice invertido.
- Implemente um ORM minimalista com suporte a migrations.
- Crie um interpretador de expressões matemáticas usando árvore sintática.

---

## Formato de saída

```markdown
# ⚔️ Desafio DIO — {tecnologia} ({nivel})

**ID do Desafio:** #{id_aleatorio}
**Dificuldade:** {nivel}
**Tecnologia:** {tecnologia}
**Tempo estimado:** {tempo}

---

## 📋 Enunciado

{descrição detalhada do desafio}

---

## ✅ Requisitos

- [ ] {requisito 1}
- [ ] {requisito 2}
- [ ] {requisito 3}

---

## 💡 Dicas

> {dica 1}
> {dica 2}

---

## 🏆 Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Funcionalidade | 40% |
| Qualidade do código | 30% |
| Boas práticas | 20% |
| Criatividade | 10% |

---

## 🎁 Recompensa
**+{xp} XP** ao concluir · Badge: **{nome_badge}**
```

---

## Tratamento de erros

- **Nível inválido:** `❌ Nível "{nivel}" não reconhecido. Use: iniciante, intermediario ou avancado.`
- **Tecnologia não suportada:** `⚠️ Não temos desafios específicos para "{tecnologia}" ainda, mas aqui vai um desafio geral de lógica!`
- **Parâmetros ausentes:** `ℹ️ Uso correto: /desafio <tecnologia> <nivel>. Ex: /desafio Python iniciante`
