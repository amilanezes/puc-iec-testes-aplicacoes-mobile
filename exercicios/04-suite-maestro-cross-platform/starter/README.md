# Starter — A4 Maestro Suite

Template inicial para fork-and-edit. Copie esta pasta inteira para `aluno-<seu-github-username>/` e edite os arquivos.

## Setup

```bash
# Sua entrega final ficará aqui:
cp -r starter/ ../aluno-<seu-github-username>

# Cd na sua entrega:
cd ../aluno-<seu-github-username>

# Editar flows
$EDITOR flows/01-login.yaml
```

## App de referência

O starter **não inclui app pronto**. Você tem 2 opções:

**Opção A — App próprio:**
- Use um app que você desenvolveu em outra atividade da disciplina
- Documente no seu README como instalar (.apk path, store install, etc.)

**Opção B — App público open source:**
- Wikipedia mobile (`org.wikipedia`)
- Google Tasks (`com.google.android.apps.tasks`)
- F-Droid client (`org.fdroid.fdroid`)
- Qualquer app sem login obrigatório se o flow não exigir

> Se for Opção B, escolha um app que tenha **pelo menos 5 user journeys distintos** (busca, navegação, criação de item, edição, etc.).

## Próximos passos

1. Implementar os 5 flows em `flows/`
2. Documentar no `README.md` da sua pasta cada flow
3. Testar localmente: `maestro test flows/`
4. Push + PR

Ver [`../README.md`](../README.md) para enunciado completo da atividade.
