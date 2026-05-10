/**
 * Validator — Atividade 4 — Suíte Maestro Cross-Platform (TAM).
 *
 * Critérios (15 pts total):
 *   1. Mín 5 flows YAML com extensão .yaml/.yml em flows/        — 4pts
 *   2. Cada flow tem appId definido                              — 2pts (0.4 cada, max 5 flows)
 *   3. Maestro CLI executa todos os flows sem erro de parse      — 4pts
 *   4. Pelo menos 5 flows passam em emulator Android (real run)  — 4pts
 *   5. Repo tem README.md descrevendo cada flow + comando run    — 1pt
 *
 * Min pra status check verde: 60% (9/15).
 *
 * Modo dry-run (--no-run): pula o passo 4 (real execution) — usado em smoke
 * tests locais. Sempre rodar com execução real em CI.
 */

import { readFileSync, existsSync, readdirSync, writeFileSync } from 'node:fs';
import { join, basename } from 'node:path';
import { execSync } from 'node:child_process';
import { parse as parseYaml } from 'yaml';
import {
  type GradeCriterion,
  type GradeResult,
  buildBreakdowns,
  computeScore,
  passThreshold,
} from '../compute-score.js';

interface CliArgs {
  entrega: string;
  output: string;
  studentLogin: string;
  commitSha: string;
  noRun: boolean;
}

function parseArgs(): CliArgs {
  const args = process.argv.slice(2);
  const get = (flag: string, defaultValue?: string) => {
    const idx = args.indexOf(flag);
    if (idx === -1) {
      if (defaultValue !== undefined) return defaultValue;
      throw new Error(`Missing required flag: ${flag}`);
    }
    return args[idx + 1] ?? '';
  };
  return {
    entrega: get('--entrega'),
    output: get('--output'),
    studentLogin: get('--student-login', 'unknown'),
    commitSha: get('--commit-sha', 'unknown'),
    noRun: args.includes('--no-run'),
  };
}

function listYamlFiles(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.yaml') || f.endsWith('.yml'))
    .map((f) => join(dir, f));
}

function flowHasAppId(file: string): boolean {
  try {
    const content = readFileSync(file, 'utf8');
    const docs = content.split(/^---\s*$/m).map((s) => s.trim()).filter(Boolean);
    const header = docs[0] ?? '';
    const parsed = parseYaml(header);
    return typeof parsed === 'object' && parsed !== null && 'appId' in parsed;
  } catch {
    return false;
  }
}

function runMaestroCheck(file: string): { ok: boolean; output: string } {
  try {
    // `maestro check <file>` valida sintaxe sem rodar
    const output = execSync(`maestro check "${file}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
    });
    return { ok: true, output };
  } catch (e: any) {
    return { ok: false, output: e.stdout?.toString() ?? e.message ?? String(e) };
  }
}

function runMaestroExecute(file: string): {
  ok: boolean;
  duration: number;
  output: string;
} {
  const start = Date.now();
  try {
    const output = execSync(`maestro test "${file}"`, {
      encoding: 'utf8',
      stdio: 'pipe',
      timeout: 180_000, // 3min por flow
    });
    return { ok: true, duration: Date.now() - start, output };
  } catch (e: any) {
    return {
      ok: false,
      duration: Date.now() - start,
      output: e.stdout?.toString() ?? e.message ?? String(e),
    };
  }
}

function checkReadmeExists(entregaDir: string): boolean {
  const candidates = ['README.md', 'README.MD', 'readme.md'];
  return candidates.some((name) => existsSync(join(entregaDir, name)));
}

function readmeMencionaFlows(entregaDir: string, flowFiles: string[]): boolean {
  const candidates = ['README.md', 'README.MD', 'readme.md'];
  for (const name of candidates) {
    const path = join(entregaDir, name);
    if (!existsSync(path)) continue;
    const content = readFileSync(path, 'utf8').toLowerCase();
    const flowNames = flowFiles.map((f) => basename(f).toLowerCase().replace(/\.(yaml|yml)$/, ''));
    return flowNames.every((n) => content.includes(n));
  }
  return false;
}

async function main() {
  const args = parseArgs();
  const flowsDir = join(args.entrega, 'flows');
  const flowFiles = listYamlFiles(flowsDir);
  const criteria: GradeCriterion[] = [];

  // Critério 1: mín 5 flows
  const minFlows = 5;
  const numFlows = flowFiles.length;
  criteria.push({
    id: 'min-flows',
    description: `Mínimo ${minFlows} flows YAML em flows/`,
    weight: 4,
    earned: numFlows >= minFlows ? 4 : Math.min(numFlows, minFlows) * (4 / minFlows),
    publicNote: `${numFlows}/${minFlows} flows encontrados`,
  });

  // Critério 2: appId em cada flow (peso total 2pts, distribuído nos flows até 5)
  const flowsWithAppId = flowFiles.filter(flowHasAppId);
  const flowsToScore = Math.min(numFlows, minFlows);
  const earnedAppId = flowsToScore > 0 ? (flowsWithAppId.length / flowsToScore) * 2 : 0;
  criteria.push({
    id: 'app-id',
    description: 'Cada flow declara appId no header YAML',
    weight: 2,
    earned: Math.min(2, +earnedAppId.toFixed(2)),
    publicNote: `${flowsWithAppId.length}/${flowsToScore} flows com appId`,
  });

  // Critério 3: parse válido (maestro check)
  let parseOkCount = 0;
  const parseDetails: string[] = [];
  for (const f of flowFiles) {
    const { ok, output } = runMaestroCheck(f);
    if (ok) {
      parseOkCount++;
    } else {
      parseDetails.push(`${basename(f)}: ${output.slice(0, 200)}`);
    }
  }
  const parseRatio = numFlows > 0 ? parseOkCount / numFlows : 0;
  criteria.push({
    id: 'parse-valido',
    description: 'Maestro CLI valida sintaxe de todos os flows',
    weight: 4,
    earned: +(parseRatio * 4).toFixed(2),
    publicNote: `${parseOkCount}/${numFlows} flows com parse válido`,
    privateNote: parseDetails.length > 0 ? `Erros:\n${parseDetails.join('\n')}` : undefined,
  });

  // Critério 4: execução real (skip em --no-run)
  if (args.noRun) {
    criteria.push({
      id: 'execucao-real',
      description: 'Mín 5 flows passam em emulator Android',
      weight: 4,
      earned: 0,
      publicNote: 'SKIP (--no-run, modo dry-run local)',
      privateNote: 'Execução real não rodada nesta invocação',
    });
  } else {
    let runOkCount = 0;
    const runDetails: string[] = [];
    for (const f of flowFiles.slice(0, minFlows)) {
      const { ok, duration, output } = runMaestroExecute(f);
      if (ok) {
        runOkCount++;
      } else {
        runDetails.push(`${basename(f)} (${duration}ms): ${output.slice(0, 300)}`);
      }
    }
    const runRatio = Math.min(runOkCount, minFlows) / minFlows;
    criteria.push({
      id: 'execucao-real',
      description: 'Mín 5 flows passam em emulator Android',
      weight: 4,
      earned: +(runRatio * 4).toFixed(2),
      publicNote: `${runOkCount}/${minFlows} flows executados com sucesso`,
      privateNote: runDetails.length > 0 ? `Falhas:\n${runDetails.join('\n')}` : undefined,
    });
  }

  // Critério 5: README descrevendo flows
  const hasReadme = checkReadmeExists(args.entrega);
  const readmeMencionas = hasReadme && readmeMencionaFlows(args.entrega, flowFiles);
  criteria.push({
    id: 'readme',
    description: 'README.md descrevendo cada flow + comando de execução',
    weight: 1,
    earned: !hasReadme ? 0 : readmeMencionas ? 1 : 0.5,
    publicNote: !hasReadme
      ? 'README.md ausente'
      : readmeMencionas
        ? 'README menciona todos os flows'
        : 'README presente mas não menciona alguns flows',
  });

  const { total, score } = computeScore(criteria);
  const minimo = passThreshold(total, 60);
  const { publicBreakdown, privateBreakdown } = buildBreakdowns(criteria);

  const result: GradeResult = {
    atividade: 'TAM-A4-Maestro-Suite',
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

  // Sair com código apropriado
  process.exit(result.pass ? 0 : 1);
}

main().catch((e) => {
  console.error('Validator error:', e);
  process.exit(2);
});
