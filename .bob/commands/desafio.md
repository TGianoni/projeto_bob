---
description: Gera um desafio de código aleatório baseado na tecnologia e nível informados
argument-hint: <tecnologia> <nivel>
---

Gere um desafio de código aleatório para a tecnologia "$1" no nível "$2" (iniciante | intermediario | avancado).

Siga exatamente o formato abaixo:

---

# ⚔️ Desafio DIO — $1 ($2)

**ID do Desafio:** #DIO-$1-{número aleatório de 4 dígitos}  
**Dificuldade:** $2  
**Tecnologia:** $1  
**Tempo estimado:** {tempo coerente com o nível}

---

## 📋 Enunciado

{Descreva um problema de código real, concreto e interessante para a tecnologia "$1" no nível "$2". Seja específico: informe entradas, saídas esperadas e contexto de uso.}

---

## ✅ Requisitos

- [ ] {Requisito funcional 1}
- [ ] {Requisito funcional 2}
- [ ] {Requisito funcional 3}
- [ ] {Requisito de qualidade, ex: sem uso de bibliotecas externas / com testes / com documentação}

---

## 💡 Dicas

> {Dica 1 relevante para a tecnologia}  
> {Dica 2 com abordagem sugerida}

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
**+{XP coerente com o nível} XP** ao concluir · Badge desbloqueada: **{nome de badge temática}**

---

Se "$2" não for um dos valores válidos (iniciante, intermediario, avancado), exiba:
`❌ Nível "$2" inválido. Use: iniciante, intermediario ou avancado.`

Se "$1" não for informado, exiba:
`ℹ️ Uso: /desafio <tecnologia> <nivel>. Ex: /desafio Python iniciante`
