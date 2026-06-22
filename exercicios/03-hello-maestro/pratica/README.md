# Hello Maestro — CI no Android Emulator

> Exercício introdutório: rode seu primeiro flow Maestro automaticamente na nuvem, sem instalar emulador local.

## Como funciona

1. Faça fork do repo (se ainda não fez)
2. Edite `flows/01-calculator-hello.yaml` ou adicione um flow novo
3. Faça push na sua branch
4. GitHub Actions sobe um Android Emulator e roda os flows automaticamente

O emulador leva ~4 min pra subir — aguarde o check ficar verde no seu PR. ✅

## Estrutura

```
pratica/
  flows/
    01-calculator-hello.yaml   ← flow de exemplo (calculadora Android)
  .github/workflows/ci.yml     ← workflow que roda no GitHub Actions
```

## Rodando local (opcional)

Se você tiver Maestro + emulador Android configurado:

```bash
maestro test flows/01-calculator-hello.yaml
```

## Desafio

Adicione um `flows/02-meu-flow.yaml` testando qualquer app pré-instalado no Android:
- `com.google.android.calculator` — Calculadora
- `com.android.settings` — Configurações  
- `com.google.android.contacts` — Contatos

O CI vai rodar automaticamente quando você der push. 🚀
