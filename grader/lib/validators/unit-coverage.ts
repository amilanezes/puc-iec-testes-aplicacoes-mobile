/**
 * Validator — Atividade 2 — Suíte Unitária (Parte A) + Integração (Parte B) sobre app RN (TAM).
 *
 * Stack: Expo SDK 52 (RN 0.76 + React 18.3) — RNTL de componente + integração funcionam.
 *
 * Heurístico/estrutural: confere os SINAIS da entrega (arquivos, deps, padrões).
 * A execução real dos testes (verde/vermelho) é feita pelo CI `pratica/.github/workflows/test.yml`.
 *
 * Critérios (15 pts total):
 *   Parte A — Suíte Unitária (10 pts)
 *     1. Jest + React Native Testing Library configurados        — 2pts
 *     2. Mín 4 arquivos *.test.{ts,tsx} ou *.spec                — 3pts
 *     3. Configuração de cobertura (script ou jest.config)       — 2pts
 *     4. Teste de TELA (RNTL): render + fireEvent/screen         — 2pts
 *     5. README com comandos de execução                          — 1pt
 *   Parte B — Integração (5 pts)
 *     6. Entrega de integração presente (movieFlow.integration)  — 1pt
 *     7. QueryClientProvider + API mockada (jest.mock)           — 2pts
 *     8. Fluxo do contador (favorites-count / toHaveTextContent) — 1pt
 *     9. renderHook OU NavigationContainer/AppNavigator          — 1pt
 */

import { writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  type GradeCriterion,
  type GradeResult,
  buildBreakdowns,
  computeScore,
  passThreshold,
} from '../compute-score.js';
import { parseArgs, findFiles, findReadme, readJsonSafe, readFileSafe } from '../utils.js';

async function main() {
  const args = parseArgs();
  const criteria: GradeCriterion[] = [];

  // ===== Parte A — Suíte Unitária (10 pts) =====

  // Critério 1: Jest + RNTL
  const pkgPath = join(args.entrega, 'package.json');
  const pkg = readJsonSafe<any>(pkgPath);
  const allDeps = pkg ? { ...(pkg.dependencies ?? {}), ...(pkg.devDependencies ?? {}) } : {};
  const hasJest = 'jest' in allDeps || 'jest-expo' in allDeps
    || existsSync(join(args.entrega, 'jest.config.js')) || existsSync(join(args.entrega, 'jest.config.ts'));
  const hasRNTL = '@testing-library/react-native' in allDeps;
  const setupOk = hasJest && hasRNTL;
  criteria.push({
    id: 'jest-rntl-config',
    description: 'Jest + React Native Testing Library configurados',
    weight: 2,
    earned: setupOk ? 2 : hasJest ? 1 : 0,
    publicNote: setupOk ? 'Jest + RNTL detectados' : hasJest ? 'Jest ok, RNTL ausente' : 'Jest não encontrado',
  });

  // Critério 2: arquivos de teste
  const testExts = ['.test.ts', '.test.tsx', '.test.js', '.test.jsx', '.spec.ts', '.spec.tsx', '.spec.js', '.spec.jsx'];
  const testFiles = findFiles(args.entrega, testExts);
  const minTests = 4;
  criteria.push({
    id: 'min-tests',
    description: `Mín ${minTests} arquivos de teste (*.test/*.spec)`,
    weight: 3,
    earned: testFiles.length >= minTests ? 3 : +(testFiles.length / minTests * 3).toFixed(2),
    publicNote: `${testFiles.length}/${minTests} arquivos encontrados`,
  });

  // Critério 3: cobertura
  const pkgScripts = pkg?.scripts ?? {};
  const hasCoverageScript = Object.values(pkgScripts).some((s: any) =>
    typeof s === 'string' && /coverage/.test(s)
  );
  const coverageInConfig = readFileSafe(join(args.entrega, 'jest.config.js'))?.includes('collectCoverage')
    || readFileSafe(join(args.entrega, 'jest.config.ts'))?.includes('collectCoverage')
    || JSON.stringify(pkg?.jest ?? {}).includes('coverage');
  criteria.push({
    id: 'coverage',
    description: 'Configuração de cobertura (script ou jest.config)',
    weight: 2,
    earned: hasCoverageScript || coverageInConfig ? 2 : 0,
    publicNote: hasCoverageScript ? 'Script com --coverage detectado' : coverageInConfig ? 'cobertura no config' : 'Nenhum',
  });

  // Critério 4: teste de TELA (RNTL) — render + fireEvent/screen
  const hasScreenTest = testFiles.some((f) => {
    const src = readFileSafe(f) ?? '';
    const usesRNTL = src.includes('@testing-library/react-native');
    const rendersAndInteracts = /\brender\s*\(/.test(src) && (/\bfireEvent\b/.test(src) || /\bscreen\b/.test(src) || /getByText|getByRole|getByTestId/.test(src));
    return usesRNTL && rendersAndInteracts;
  });
  criteria.push({
    id: 'screen-test',
    description: 'Teste de tela RNTL (render + interação/query)',
    weight: 2,
    earned: hasScreenTest ? 2 : 0,
    publicNote: hasScreenTest ? 'Teste de tela RNTL detectado' : 'Nenhum teste com render() + RNTL',
  });

  // Critério 5: README
  const readme = findReadme(args.entrega);
  criteria.push({
    id: 'readme',
    description: 'README com comandos de execução',
    weight: 1,
    earned: readme ? 1 : 0,
    publicNote: readme ? 'README encontrado' : 'README ausente',
  });

  // ===== Parte B — Integração (5 pts) =====

  // Arquivos de teste de integração (pasta integration/ ou nome *.integration.*)
  const integrationFiles = testFiles.filter((f) => /integration/i.test(f));
  const integSrc = integrationFiles.map((f) => readFileSafe(f) ?? '').join('\n');
  const hasEntrega = integrationFiles.some((f) => /movieFlow\.integration\.test\.tsx?$/i.test(f));

  // Critério 6: entrega de integração presente
  criteria.push({
    id: 'integ-entrega',
    description: 'Entrega de integração presente (movieFlow.integration)',
    weight: 1,
    earned: hasEntrega ? 1 : 0,
    publicNote: hasEntrega ? 'movieFlow.integration.test.tsx encontrado' : 'arquivo de entrega da Parte B ausente',
  });

  // Critério 7: QueryClientProvider + API mockada
  const hasQueryProvider = /QueryClientProvider/.test(integSrc);
  const hasApiMock = /jest\.mock\([^)]*(services\/api|@\/services\/api)/.test(integSrc);
  const c7 = (hasQueryProvider ? 1 : 0) + (hasApiMock ? 1 : 0);
  criteria.push({
    id: 'integ-query-mock',
    description: 'QueryClientProvider + API mockada (jest.mock)',
    weight: 2,
    earned: c7,
    publicNote: `QueryClientProvider: ${hasQueryProvider ? 'sim' : 'não'} · mock da API: ${hasApiMock ? 'sim' : 'não'}`,
  });

  // Critério 8: fluxo do contador
  const hasCounterFlow = /favorites-count|movie-card-heart|toHaveTextContent/.test(integSrc);
  criteria.push({
    id: 'integ-counter-flow',
    description: 'Fluxo do contador (favorites-count / toHaveTextContent)',
    weight: 1,
    earned: hasCounterFlow ? 1 : 0,
    publicNote: hasCounterFlow ? 'asserção no contador detectada' : 'nenhuma asserção de contador/favorito',
  });

  // Critério 9: renderHook OU navegação
  const hasHookOrNav = /renderHook|NavigationContainer|AppNavigator/.test(integSrc);
  criteria.push({
    id: 'integ-hook-or-nav',
    description: 'renderHook OU NavigationContainer/AppNavigator',
    weight: 1,
    earned: hasHookOrNav ? 1 : 0,
    publicNote: hasHookOrNav ? 'renderHook/navegação detectados' : 'sem renderHook nem navegação',
  });

  const { total, score } = computeScore(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'TAM-A2-Unit-Integracao',
    total,
    score: +score.toFixed(2),
    minimo,
    pass: score >= minimo,
    criteria,
    publicBreakdown,
    privateBreakdown,
    metadata: {
      studentLogin: args.studentLogin,
      entregaPath: args.entrega,
      timestamp: new Date().toISOString(),
      commitSha: args.commitSha,
    },
  };

  writeFileSync(args.output, JSON.stringify(result, null, 2));
  console.log(`Grade: ${result.score}/${result.total} (min ${result.minimo}) — ${result.pass ? 'PASS' : 'FAIL'}`);
  process.exit(result.pass ? 0 : 1);
}

main().catch((e) => {
  console.error('Validator error:', e);
  process.exit(2);
});
