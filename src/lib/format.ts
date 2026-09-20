const MONTHS_SHORT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

const MONTHS_LONG = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
]

function parse(iso: string) {
  const [year, month, day] = iso.split('-').map(Number)
  return { year, month: month - 1, day }
}

/** 2026-06-30 → "30 jun 2026" */
export function formatDate(iso: string) {
  const { year, month, day } = parse(iso)
  return `${day} ${MONTHS_SHORT[month]} ${year}`
}

/** 2026-06-30 → "30 de junho de 2026" */
export function formatDateLong(iso: string) {
  const { year, month, day } = parse(iso)
  return `${day} de ${MONTHS_LONG[month]} de ${year}`
}

/** Intervalo compacto: "ago 2026", "jun–ago 2026" ou "ago 2025 – set 2026" */
export function formatRange(startIso: string, endIso: string) {
  const start = parse(startIso)
  const end = parse(endIso)
  if (start.year !== end.year) {
    return `${MONTHS_SHORT[start.month]} ${start.year} – ${MONTHS_SHORT[end.month]} ${end.year}`
  }
  if (start.month === end.month) return `${MONTHS_SHORT[end.month]} ${end.year}`
  return `${MONTHS_SHORT[start.month]}–${MONTHS_SHORT[end.month]} ${end.year}`
}

export function formatHours(hours: number) {
  return `${hours} h`
}

/** 3 → "03" */
export function pad2(value: number) {
  return String(value).padStart(2, '0')
}
