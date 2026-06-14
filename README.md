# Testes de Aplicações Mobile (TAM)

> **Curso:** Pós-Graduação em Engenharia de Qualidade e Teste de Software — PUC Minas IEC
> **Modalidade:** Online ao vivo · 24h · 1º/2026 (Oferta 5, Turma 1)
> **Professor:** Jackson Smith Moisés Matias
> **Apoio Acadêmico:** Patricia Gomes da Silva (patricia@pucminas.br)

Repositório público com **labs, exercícios, repos starter de aulas e materiais de referência** desta disciplina. Para alunos da Oferta 5 — Turma 1 (21/05 a 02/07/2026).

## 📱 App de referência oficial — TestesQAMobile

App educacional desenvolvido pelo prof especificamente pra esta disciplina. **35 exercícios em 12 categorias de teste** (funcional, usabilidade, UI, compatibilidade, performance, conectividade, instalação, interrupção, localização, gestos, acessibilidade, segurança) com bugs propositalmente colocados.

- 🍎 **App Store:** https://apps.apple.com/br/app/testes-qa-mobile/id6755933674
- 🤖 **Play Store:** https://play.google.com/store/apps/details?id=com.apptestesmobile
- 📦 **Bundle ID:** `com.apptestesmobile`

Instale via lojas (gratuito). Use como alvo das suítes **Maestro** (E2E) da disciplina.

## Calendário

| # | Data | Dia | Tema |
|---|------|-----|------|
| 1 | 21/05/2026 | Quinta | Fundamentos de Testes Mobile e Pirâmide de Testes |
| 2 | 28/05/2026 | Quinta | Setup RN e Testes Manuais Estruturados (SBTM, tours) |
| 3 | 15/06/2026 | Segunda | Unit Testing RN — Jest + React Native Testing Library |
| 4 | 22/06/2026 | Segunda | E2E com Maestro + Appium (comparativo) + Cloud Devices |
| 5 | 29/06/2026 | Segunda | Performance, Segurança e Observabilidade |
| 6 | 09/07/2026 | Quinta | IA em Testes Mobile, CI/CD e Apresentações Finais |

Todos encontros das 19:00 às 22:30 (horário Brasília).

## Ementa

Conceitos gerais de testes mobile. Tipos de teste (funcionais, usabilidade, integração, desempenho, segurança, estabilidade). Principais ferramentas — Jest, React Native Testing Library, Maestro e Appium. Estratégias de teste para aplicações mobile. Processos de avaliação. Verificação de desempenho de tags, keywords e métricas. Simulação de navegador remoto e visualização de aplicativos. Avaliação em dispositivos reais. Automatização de testes. Aplicação de IA em testes mobile (visual AI, geração via LLM, agentes autônomos).

## Stack didática

- **Unit / Integração:** Jest + React Native Testing Library
- **E2E cross-platform:** Maestro (mobile.dev)
- **Comparativo E2E:** Appium 2 (panorama)
- **Cloud devices:** Firebase Test Lab + BrowserStack App Live
- **Performance:** Android Studio Profiler, Xcode Instruments, Macrobenchmark
- **Segurança:** OWASP MASVS v2.1, MobSF, Frida (defensiva)
- **Observabilidade:** Sentry, Datadog RUM Mobile, OpenTelemetry
- **IA:** Claude API + AppAgent + DroidBot+LLM + MobileAgent

## Estrutura do repo

```
.
├── exercicios/      # Atividades por aula (cada uma com pratica/ — sem gabarito)
├── slides/          # PDFs das aulas
├── grader/          # Autograder (CI)
├── docs/            # Guias auxiliares
└── README.md        # Você está aqui
```

## Avaliação (100 pts)

| Item | Pontos |
|------|--------|
| Atividade 1 — Análise de Cobertura (ou Casos de Teste) | 15 |
| Atividade 2 — Setup + Suíte Unitária (Jest/RNTL) | 10 |
| Atividade 3 — Suíte Maestro E2E | 15 |
| Atividade 4 — Performance + Security | 10 |
| **Projeto Final** | **50** |

## Como usar

```bash
# Clone
git clone https://github.com/jacksonsmith/puc-iec-testes-aplicacoes-mobile.git
cd puc-iec-testes-aplicacoes-mobile

# Cada atividade tem seu código-base em exercicios/NN-.../pratica/
cd exercicios/02-suite-jest-rntl/pratica
# Siga o README/enunciado específico da atividade
```

## Pré-requisitos

- **Node.js** ≥ 22 LTS
- **Xcode** 16+ (macOS) — para iOS
- **Android Studio** Iguana+ + emulador Pixel 8 — para Android
- **Watchman** (`brew install watchman`)
- **Maestro CLI:** `curl -Ls "https://get.maestro.mobile.dev" | bash`
- **MobSF** (Docker): `docker pull opensecurity/mobile-security-framework-mobsf`
- Conta GitHub para entregas
- (Opcional) Conta Firebase Test Lab — 100 min/mês free

## Bibliografia principal

- KNOTT, D. *Hands-On Mobile App Testing*. Pearson, 2015.
- BLACK, R.; VAN VEENENDAAL, E. *Foundations of Software Testing*, 4th ed. Cengage, 2020.
- MESZAROS, G. *xUnit Test Patterns*. Addison-Wesley, 2007.
- KHORIKOV, V. *Unit Testing: Principles, Practices, and Patterns*. Manning, 2020.

Bibliografia completa em [`BIBLIOGRAFIA.md`](./BIBLIOGRAFIA.md).

## Projeto Final em Grupo

Grupos de 3-4 alunos, escolha um dos 10 temas:

1. Automação Mobile End-to-End
2. Native UI Testing
3. Performance Mobile Testing
4. Mobile Security Testing
5. Visual AI em Mobile
6. Test Generation com LLM
7. AI Agent para Exploratory Mobile
8. CI/CD Pipeline Mobile
9. Mobile API Contract Testing
10. Accessibility Testing Mobile

Detalhes do projeto final serão publicados no Canvas e neste repositório próximo à Aula 6.

## Como entregar atividades

Guia completo passo-a-passo: [`COMO_ENTREGAR.md`](./COMO_ENTREGAR.md) (fork → clone → branch → commit → push → PR → link Canvas).

Slides da abertura da Aula 2 com tutorial Fork+PR: [`slides/intro-fluxo-pr-github.pdf`](./slides/intro-fluxo-pr-github.pdf).

## Auto-grading via CI 🤖

Algumas atividades são **avaliadas automaticamente** em PR. Workflow:

1. **Fork** este repositório
2. Crie sua pasta de entrega seguindo convenção:
   `exercicios/<NN>-<atividade>/aluno-<seu-github-username>/`
3. Implemente seguindo o `README.md` de cada exercício
4. Push para seu fork + abra **Pull Request** para `main`
5. CI dispara automaticamente:
   - Bot posta **score + breakdown** no PR
   - Status check verde se ≥ 60% do total
   - Detalhe completo em artifact (acesso prof)

**Atividades com auto-grading ativo:**

| # | Atividade | Status |
|---|-----------|--------|
| A2 | [Setup + Suíte Unitária](./exercicios/02-suite-jest-rntl/) | 🔧 Em breve |
| A3 | [Suíte Maestro E2E](./exercicios/03-maestro-e2e/) | 🔧 Em breve |
| A1, A4 | Análise de Cobertura, Performance/Security | 📝 Manual (correção pelo prof) |

Ver [`grader/README.md`](./grader/README.md) para documentação técnica do autograder.

## Coordenação

- **Tadeu Faria** — tadeurf7@gmail.com
- **Livia Fantoni** — liviarezende@pucminas.br

## Contato

Dúvidas: via Canvas, fórum ou e-mail (informado em sala).

---

Material didático autoral. Licenciado MIT — ver [LICENSE](./LICENSE).
