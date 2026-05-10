# Flows mínimos esperados — A4 Maestro Suite

Critério **interno** que documenta o que o validator `maestro-suite.ts` checa em runtime. Útil pra alunos entenderem o que o CI vai validar.

## Estrutura mínima esperada

```
exercicios/04-suite-maestro-cross-platform/aluno-<github-username>/
├── README.md       # descreve cada flow
├── flows/
│   ├── *.yaml      # mínimo 5 arquivos
│   └── ...
```

## Flows sugeridos (não obrigatório o nome, mas a cobertura de journeys)

1. **Login / Autenticação** — fluxo de entrada
2. **Navegação principal** — tabs, drawer, transições entre telas chave
3. **Busca / Filtro** — entrada de texto + asserção de resultado
4. **Detalhe de item** — drill-down para tela específica
5. **Ação crítica** — checkout, edição de perfil, ou outra mutation com assert

## O que o validator checa

| Verificação | Como |
|-------------|------|
| Mín 5 arquivos `.yaml` ou `.yml` em `flows/` | `readdirSync` |
| Cada flow tem `appId` no header | `parseYaml` da primeira section |
| Sintaxe válida | `maestro check <arquivo>` por flow |
| Execução real | `maestro test <arquivo>` em emulator Android API 34 |
| README presente + menciona cada flow pelo nome | `readFileSync` + match |

## O que o validator **não** checa

- Qualidade dos asserts dentro dos flows
- Cobertura semântica do app (humano avalia)
- iOS Simulator (CI é só Android)
- Performance dos flows
- Boas práticas YAML específicas (commentários, env vars, fragmentos)

## Limites de execução

- Timeout por flow: 3 minutos
- Total runtime: 30 minutos (timeout do workflow)
- Se primeiros 5 flows passam, validator não roda os adicionais

## Rubrica completa

Ver [`grader/lib/validators/maestro-suite.ts`](../../../grader/lib/validators/maestro-suite.ts) para a implementação canônica.
