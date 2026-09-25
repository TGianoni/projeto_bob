---
description: Gera um certificado fictício em Markdown para um usuário que concluiu uma trilha DIO
argument-hint: <nome_usuario> <nome_trilha>
---

Leia o arquivo `dio_explorer/data/trilhas_dio.json` e busque a trilha cujo campo `nome` contenha "$2" (busca case-insensitive).

Com os dados encontrados, gere o certificado abaixo em Markdown e depois salve-o em `dio_explorer/certificados-emitidos/$1_DIO-{ANO}-{HASH6}.md` usando a ferramenta de escrita de arquivo.

Use exatamente este formato:

---

```markdown
---
certificado_id: DIO-{ano_atual}-{6 caracteres alfanuméricos aleatórios em maiúsculo}
emitido_em: {data atual no formato DD/MM/YYYY}
usuario: $1
trilha: {nome da trilha encontrada}
tecnologia: {tecnologia}
nivel: {nivel}
modulos_concluidos: {numero_modulos}
xp_obtido: {xp_total}
valido: true
---

# 🎓 Certificado de Conclusão

---

> *A Digital Innovation One certifica que*

# $1

> *concluiu com êxito a trilha de aprendizagem*

# 📚 {Nome da Trilha}

---

| Campo | Detalhe |
|-------|---------|
| 🖥️ Tecnologia | {tecnologia} |
| 📊 Nível | {nivel} |
| 📦 Módulos concluídos | {numero_modulos} |
| ⭐ XP obtido | {xp_total} XP |
| 📅 Data de conclusão | {data atual} |
| 🔑 ID do Certificado | `DIO-{ANO}-{HASH6}` |

---

## 🏅 Badges Conquistadas

{liste cada badge da trilha em formato de item de lista}

---

> *Este certificado comprova a dedicação e o esforço do(a) aluno(a)*
> *na jornada de aprendizado da plataforma DIO Explorer.*

---

**Digital Innovation One**  
https://web.dio.me · Emitido via DIO Explorer Bot

---
*Verificação: `DIO-{ANO}-{HASH6}` · Documento fictício gerado automaticamente.*
```

---

Após salvar o arquivo, exiba o certificado completo no chat e informe o caminho onde foi salvo.

Se a trilha "$2" não for encontrada, exiba:
`❌ Trilha "$2" não encontrada. Verifique o nome em dio_explorer/data/trilhas_dio.json.`

Se algum argumento estiver ausente, exiba:
`ℹ️ Uso: /certificado <nome_usuario> <nome_trilha>. Ex: /certificado "João Silva" "Machine Learning com Scikit-Learn"`
