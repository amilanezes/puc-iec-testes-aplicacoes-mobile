# Exercício 03a — Hello Maestro

**Disciplina:** Testes de Aplicações Mobile  
**Aula:** 4 — E2E com Maestro  
**Entrega:** abra um Pull Request neste repo com sua correção

---

## Contexto

Você recebeu um flow Maestro **propositalmente quebrado**. Ele tenta verificar o resultado de `7 + 3`, mas o assert está errado.

Seu trabalho: **corrigir o assert** para que o teste passe.

---

## O que fazer

1. Faça um **fork** deste repositório (se ainda não fez)
2. Na sua cópia, abra o arquivo:
   ```
   exercicios/03-hello-maestro/pratica/flows/01-calculator-hello.yaml
   ```
3. Corrija a linha do `assertVisible` — qual é o resultado correto de `7 + 3`?
4. Faça um commit e abra um **Pull Request**

O bot vai rodar o Maestro no PR automaticamente. Quando passar, você vê o ✅ no comentário.

---

## O flow (scaffold)

```yaml
appId: com.simplemobiletools.calculator
---
- launchApp
- tapOn: "7"
- tapOn: "+"
- tapOn: "3"
- tapOn: "="
# TODO: corrija o assert abaixo — o resultado esperado de 7 + 3 é ?
- assertVisible: "11"
- takeScreenshot: "calculator-7-plus-3"
```

---

## Critérios de avaliação

| Critério | Pontos |
|---|---|
| Flow corrigido (`assertVisible` com valor certo) | 1 pt |
| PR aberto no repositório correto | 1 pt |
| CI verde (comentário ✅ do bot) | 3 pts |

**Total: 5 pts**

---

## Dica

Não precisa instalar nada localmente. O Maestro roda no GitHub Actions quando você abre o PR.  
Se quiser rodar local depois: [guia de instalação do Maestro](https://maestro.mobile.dev/getting-started/installing-maestro).
