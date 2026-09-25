---
description: Retorna um plano de estudos formatado com os módulos de uma trilha DIO
argument-hint: <tecnologia>
---

Leia o arquivo `dio_explorer/data/trilhas_dio.json` e busque todas as trilhas cujo campo `tecnologia` contenha "$1" (busca case-insensitive).

Para cada trilha encontrada, exiba o seguinte plano de estudos formatado em Markdown:

---

# 📚 Plano de Estudo — {nome}

**Tecnologia:** {tecnologia}  
**Nível:** {nivel}  
**Módulos:** {numero_modulos}  
**XP Total:** {xp_total} XP  
**Acesso Vitalício:** Sim/Não  

## 🗂️ Módulos previstos
Liste {numero_modulos} módulos numerados e nomeados de forma coerente com a tecnologia, do básico ao avançado, com estimativa de tempo para cada um.

## 🏅 Badges disponíveis
Liste as badges da trilha.

## 📺 Lives
Liste cada live com título, data e se está gravada.

## 🎯 Promoção
Se `promocoes.ativa` for true: exiba "🔥 {desconto}% de desconto até {validade}". Caso contrário: "Sem promoção ativa no momento."

---

Se nenhuma trilha for encontrada para "$1", exiba: `❌ Nenhuma trilha encontrada para "$1". Tecnologias disponíveis: Python, JavaScript, React, AWS, Docker, Kotlin, Java, Go, Rust, PHP, entre outras.`
