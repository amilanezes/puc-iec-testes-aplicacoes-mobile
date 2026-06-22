import * as fs from 'fs'
import * as path from 'path'
import { Criterion, GradeResult, computeAuto, computeScore, buildBreakdowns } from './lib/compute-score'

const args = process.argv.slice(2)
const entregaIdx = args.indexOf('--entrega')
const entregaPath = path.resolve(entregaIdx >= 0 ? args[entregaIdx + 1] : '.')

function fileExists(...parts: string[]): boolean {
  return fs.existsSync(path.join(...parts))
}

// Maestro usa header "appId: ...\n---\nsteps" — não é YAML padrão.
function checkFlow(raw: string): { complete: boolean; reason?: string } {
  if (!raw.includes('appId:')) {
    return { complete: false, reason: 'appId: ausente — arquivo incompleto' }
  }
  if (!raw.includes('assertVisible')) {
    return { complete: false, reason: 'sem assertVisible — complete os TODOs' }
  }
  const todoLines = raw.split('\n').filter(l => l.trim().startsWith('# TODO'))
  if (todoLines.length > 0) {
    return { complete: false, reason: `${todoLines.length} TODO(s) pendente(s)` }
  }
  return { complete: true }
}

const flowsDir = path.join(entregaPath, 'pratica', 'flows')

const REQUIRED_FLOWS = [
  { file: '01-launch.yaml',     label: 'Flow 1 — launch + login + lista de filmes' },
  { file: '02-search.yaml',     label: 'Flow 2 — busca parametrizada (env)' },
  { file: '03-favorite.yaml',   label: 'Flow 3 — favoritar (asserção cross-tela)' },
  { file: '04-detail.yaml',     label: 'Flow 4 — detalhe do filme + favoritar' },
  { file: '05-js-dynamic.yaml', label: 'Flow 5 — JavaScript embutido (evalScript)' },
]

const criteria: Criterion[] = []

for (const { file, label } of REQUIRED_FLOWS) {
  const flowPath = path.join(flowsDir, file)
  const exists = fileExists(flowPath)

  if (!exists) {
    criteria.push({ key: file, label, weight: 2, earned: 0, note: 'arquivo não encontrado' })
    continue
  }

  const raw = fs.readFileSync(flowPath, 'utf8')
  const check = checkFlow(raw)

  // 1pt: existe com appId · +1pt: completo (sem TODO + tem assertVisible)
  const earned = check.complete ? 2 : 1
  criteria.push({
    key: file,
    label,
    weight: 2,
    earned,
    note: check.complete ? undefined : check.reason,
  })
}

// Bônus: _fragments/ + runFlow: em algum flow
const fragmentsDir = path.join(flowsDir, '_fragments')
const hasFragments = fileExists(fragmentsDir) &&
  fs.readdirSync(fragmentsDir).some(f => f.endsWith('.yaml'))

let hasRunFlowUsage = false
if (fs.existsSync(flowsDir)) {
  const flowFiles = fs.readdirSync(flowsDir).filter(f => f.endsWith('.yaml'))
  for (const f of flowFiles) {
    const raw = fs.readFileSync(path.join(flowsDir, f), 'utf8')
    // Conta runFlow que referencia _fragments/ — tanto o shorthand inline
    // (runFlow: _fragments/x.yaml) quanto a forma em bloco (file: _fragments/x.yaml).
    const refsFragmentInline = /runFlow:\s*['"]?\.?\/?_fragments\//m.test(raw)
    const refsFragmentByFile = /\bfile:\s*['"]?\.?\/?_fragments\//m.test(raw)
    if (refsFragmentInline || refsFragmentByFile) {
      hasRunFlowUsage = true; break
    }
  }
}

criteria.push({
  key: 'bonus-runflow',
  label: 'Bônus — _fragments/ + runFlow: (fragmento reutilizável)',
  weight: 1,
  earned: hasFragments && hasRunFlowUsage ? 1 : 0,
  note: hasFragments && hasRunFlowUsage
    ? '_fragments/ presente e runFlow: usado'
    : !hasFragments
    ? '_fragments/ não encontrado'
    : 'runFlow: não encontrado em nenhum flow',
})

const { pub, priv } = buildBreakdowns(criteria)
const autoScore = computeAuto(criteria)
const totalScore = computeScore(criteria)
const maxAutoScore = criteria.filter(c => !c.manual).reduce((s, c) => s + c.weight, 0)
const maxTotalScore = criteria.reduce((s, c) => s + c.weight, 0)

const result: GradeResult = {
  autoScore,
  maxAutoScore,
  totalScore,
  maxTotalScore,
  criteria,
  breakdown: pub,
  privateBreakdown: priv,
}

fs.writeFileSync(path.join(__dirname, 'grade.json'), JSON.stringify(result, null, 2))

console.log(`\n=== GRADE RESULT ===`)
console.log(`autoScore: ${autoScore}/${maxAutoScore}`)
console.log(`totalScore: ${totalScore}/${maxTotalScore}`)
console.log(`\nBreakdown:`)
console.log(priv)
