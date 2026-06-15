/**
 * Validator — Atividade 2 — Suíte Jest/RNTL (Testes de Aplicações Mobile).
 *
 * RUBRICA REAL do enunciado (15 pts · Parte A: 10 · Parte B: 5):
 *   1. npm install && npm test roda (eliminatório)              — 2pts
 *   2. Parte A · favoritesStore (6 verdes)                      — 2pts
 *   3. Parte A · MovieCard RNTL (render + press navega)         — 2pts
 *   4. Parte A · isTokenError (5 verdes)                        — 2pts
 *   5. Parte A · counterStore (3 verdes)                        — 1pt
 *   6. Parte A · cobertura ≥ 70% em src/store e src/utils       — 1pt
 *   7. Parte B · movieFlow.integration (lista + ♥1 + ♥0)        — 5pts
 *
 * Diferente dos validators estáticos: este lê o RESULTADO de `jest --json`
 * (rodado num job SEM token — ver grade-atividade-02-run.yml) + coverage-summary.
 * Conta VERDES por suíte com denominador ESPERADO FIXO (deletar testes não infla).
 * PRINCÍPIO: nota MÍNIMA. Só credita verde de verdade. Min p/ status: 60% (9/15).
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { basename } from 'node:path';
import {
  type GradeCriterion,
  type GradeResult,
  buildBreakdowns,
  computeScore,
  computeAuto,
  passThreshold,
} from '../compute-score.js';

interface CliArgs {
  results: string; // saída de jest --json
  coverage: string; // coverage-summary.json (json-summary)
  output: string;
  studentLogin: string;
  commitSha: string;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const get = (flag: string, def?: string) => {
    const i = args.indexOf(flag);
    if (i === -1) {
      if (def !== undefined) return def;
      throw new Error(`Missing required flag: ${flag}`);
    }
    return args[i + 1] ?? '';
  };
  return {
    results: get('--results'),
    coverage: get('--coverage', ''),
    output: get('--output'),
    studentLogin: get('--student-login', 'unknown'),
    commitSha: get('--commit-sha', 'unknown'),
  };
}

function readJsonSafe(path: string): any | null {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch {
    return null;
  }
}

/** Verdes/total de uma suíte casando o basename do arquivo por substring. */
function suite(results: any, key: string): { passed: number; total: number; found: boolean } {
  const t = (results?.testResults ?? []).find((r: any) =>
    basename(r.name ?? '').toLowerCase().includes(key.toLowerCase()),
  );
  if (!t) return { passed: 0, total: 0, found: false };
  const ar = t.assertionResults ?? [];
  return { passed: ar.filter((a: any) => a.status === 'passed').length, total: ar.length, found: true };
}

/** Crédito proporcional aos VERDES com denominador esperado fixo. */
function credit(passed: number, expected: number, weight: number): number {
  return +(Math.min(passed, expected) / expected * weight).toFixed(2);
}

/** % de cobertura agregada (statements) dos arquivos sob um prefixo de pasta. */
function coveragePct(cov: any, folder: string): number | null {
  if (!cov) return null;
  let covered = 0;
  let total = 0;
  let any = false;
  for (const [file, data] of Object.entries<any>(cov)) {
    if (file === 'total') continue;
    if (file.replace(/\\/g, '/').includes(`/${folder}/`)) {
      any = true;
      covered += data.statements?.covered ?? 0;
      total += data.statements?.total ?? 0;
    }
  }
  if (!any || total === 0) return null;
  return (covered / total) * 100;
}

async function main() {
  const args = parseArgs();
  const results = readJsonSafe(args.results);
  const cov = args.coverage ? readJsonSafe(args.coverage) : null;
  const criteria: GradeCriterion[] = [];

  const ran = !!results && (results.numTotalTests ?? 0) > 0;

  // 1) eliminatório — a suíte rodou
  criteria.push({
    id: 'roda',
    description: 'npm install && npm test roda (eliminatório)',
    weight: 2,
    earned: ran ? 2 : 0,
    publicNote: ran
      ? `Suíte executou — ${results.numPassedTests}/${results.numTotalTests} verdes`
      : 'A suíte não executou (erro de install/config ou 0 testes)',
    privateNote: ran ? `failed=${results.numFailedTests} todo=${results.numTodoTests}` : 'sem results.json válido',
  });

  // Se nem rodou, zera o resto (eliminatório) e sai.
  const suites: Array<[string, string, string, number, number]> = [
    // [id, descrição, chave-do-arquivo, esperado, peso]
    ['favorites-store', 'Parte A · favoritesStore (6 verdes)', 'favoritesStore', 6, 2],
    ['moviecard', 'Parte A · MovieCard RNTL (render + press navega)', 'MovieCard', 2, 2],
    ['istokenerror', 'Parte A · isTokenError (5 verdes)', 'isTokenError', 5, 2],
    ['counterstore', 'Parte A · counterStore (3 verdes)', 'counterStore', 3, 1],
  ];
  for (const [id, desc, key, expected, weight] of suites) {
    const s = suite(results, key);
    criteria.push({
      id,
      description: desc,
      weight,
      earned: ran ? credit(s.passed, expected, weight) : 0,
      publicNote: !ran
        ? 'eliminatório não atendido'
        : s.found
          ? `${s.passed}/${expected} verdes`
          : `arquivo de teste ${key} não encontrado`,
      privateNote: `found=${s.found} passed=${s.passed} total=${s.total}`,
    });
  }

  // 6) cobertura ≥ 70% em src/store E src/utils
  const covStore = coveragePct(cov, 'store');
  const covUtils = coveragePct(cov, 'utils');
  const covOk = covStore !== null && covUtils !== null && covStore >= 70 && covUtils >= 70;
  criteria.push({
    id: 'coverage',
    description: 'Parte A · cobertura ≥ 70% em src/store e src/utils',
    weight: 1,
    earned: ran && covOk ? 1 : 0,
    publicNote:
      covStore === null || covUtils === null
        ? 'Sem relatório de cobertura (rode com --coverage)'
        : `store ${covStore.toFixed(0)}% · utils ${covUtils.toFixed(0)}% (min 70%)`,
    privateNote: `store=${covStore} utils=${covUtils}`,
  });

  // 7) Parte B · movieFlow.integration (4 asserções → 5 pts)
  const mf = suite(results, 'movieFlow');
  criteria.push({
    id: 'parte-b-movieflow',
    description: 'Parte B · movieFlow.integration (lista aparece + favoritar ♥1 + desfavoritar ♥0)',
    weight: 5,
    earned: ran ? credit(mf.passed, 4, 5) : 0,
    publicNote: !ran
      ? 'eliminatório não atendido'
      : mf.found
        ? `${mf.passed}/4 asserções verdes`
        : 'movieFlow.integration.test.tsx não encontrado',
    privateNote: `found=${mf.found} passed=${mf.passed} total=${mf.total}`,
  });

  const { total } = computeScore(criteria);
  const { autoScore, autoTotal, manualTotal } = computeAuto(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'TESTES-A2-Suite-Jest-RNTL',
    total,
    score: autoScore,
    autoScore,
    autoTotal,
    manualTotal,
    minimo,
    pass: autoScore >= minimo,
    criteria,
    publicBreakdown,
    privateBreakdown,
    metadata: {
      studentLogin: args.studentLogin,
      entregaPath: args.results,
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
