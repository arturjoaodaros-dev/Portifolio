import { formatDate, formatDateLong, formatHours } from '../lib/format'
import type { Certificate, CertificateImage, CertificateTrack } from '../types'
import imageManifest from './certificate-images.json'

export const trackLabels: Record<CertificateTrack, string> = {
  python: 'Python',
  'dados-apis': 'Bancos de dados e APIs',
  claude: 'Claude Academy',
}

/*
 * Títulos, datas e cargas horárias transcritos dos certificados.
 * A imagem de cada um vem de scripts/build-certificates.mjs (npm run certs):
 * quem tem entrada em certificate-images.json aparece com imagem; os demais
 * aparecem apenas como texto. Para exibir a imagem de um deles, adicione o
 * arquivo em SOURCES no script e rode `npm run certs`.
 */
const entries: Omit<Certificate, 'image'>[] = [
  {
    id: 'introducao-banco-de-dados',
    title: 'Introdução Banco de Dados',
    issuer: 'DIO',
    track: 'dados-apis',
    date: '2025-08-21',
    hours: 2,
  },
  {
    id: 'strings',
    title: 'Manipulando Strings com Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-06-12',
    hours: 2,
  },
  {
    id: 'tuplas',
    title: 'Conhecendo Tuplas em Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-06-25',
    hours: 1,
  },
  {
    id: 'conjuntos',
    title: 'Explorando Conjuntos em Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-06-25',
    hours: 1,
  },
  {
    id: 'dicionarios',
    title: 'Aprendendo a Utilizar Dicionários em Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-06-26',
    hours: 1,
  },
  {
    id: 'funcoes',
    title: 'Dominando Funções Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-06-27',
    hours: 1,
  },
  {
    id: 'poo',
    title: 'Introdução à Programação Orientada a Objetos (POO) com Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-06-30',
    hours: 1,
  },
  {
    id: 'heranca',
    title: 'Aprendendo o Conceito de Herança com Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-07-04',
    hours: 1,
  },
  {
    id: 'encapsulamento',
    title: 'Aplicando Encapsulamento em Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-07-05',
    hours: 1,
  },
  {
    id: 'decoradores',
    title: 'Decoradores, Iteradores e Geradores com Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-08-02',
    hours: 1,
  },
  {
    id: 'data-hora',
    title: 'Lidando com Data, Hora e Fuso Horário no Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-08-06',
    hours: 1,
  },
  {
    id: 'arquivos',
    title: 'Manipulando Arquivos em Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-08-07',
    hours: 1,
  },
  {
    id: 'pacotes',
    title: 'Gerenciamento de Pacotes, Convenções e Boas Práticas Python',
    issuer: 'DIO',
    track: 'python',
    date: '2026-08-16',
    hours: 1,
  },
  {
    id: 'claude-code-101',
    title: 'Claude Code 101',
    issuer: 'Claude Academy',
    track: 'claude',
    date: '2026-08-25',
  },
  {
    id: 'claude-101',
    title: 'Claude 101',
    issuer: 'Claude Academy',
    track: 'claude',
    date: '2026-08-27',
  },
  {
    id: 'bancos-relacionais',
    title: 'Introdução a Banco de Dados Relacionais',
    issuer: 'DIO',
    track: 'dados-apis',
    date: '2026-08-28',
    hours: 3,
  },
  {
    id: 'claude-code-in-action',
    title: 'Claude Code in Action',
    issuer: 'Claude Academy',
    track: 'claude',
    date: '2026-08-30',
  },
  {
    id: 'python-db-api',
    title: 'Explorando Banco de Dados Relacionais com Python DB API',
    issuer: 'DIO',
    track: 'dados-apis',
    date: '2026-09-02',
    hours: 1,
  },
  {
    id: 'mongodb-nosql',
    title: 'Introdução ao MongoDB e Bancos de Dados NoSQL',
    issuer: 'DIO',
    track: 'dados-apis',
    date: '2026-09-08',
    hours: 3,
  },
  {
    id: 'rest',
    title: 'Introdução a Aplicações Rest',
    issuer: 'DIO',
    track: 'dados-apis',
    date: '2026-09-08',
    hours: 1,
  },
]

const manifest: Record<string, CertificateImage | undefined> = imageManifest

export const certificates: Certificate[] = entries
  .map((entry) => ({ ...entry, image: manifest[entry.id] }))
  .sort((a, b) => a.date.localeCompare(b.date))

export function certificatesOf(track: CertificateTrack) {
  return certificates.filter((certificate) => certificate.track === track)
}

export function certificateSrc(id: string) {
  const base = `${import.meta.env.BASE_URL}certificates/${id}`
  return { full: `${base}.webp`, thumb: `${base}-thumb.webp` }
}

/** "DIO · 30 jun 2026 · 1 h" */
export function certificateMeta({ issuer, date, hours }: Certificate) {
  return [issuer, formatDate(date), hours && formatHours(hours)].filter(Boolean).join(' · ')
}

export function describeCertificate({ title, issuer, date, hours }: Certificate) {
  const kind = issuer === 'DIO' ? 'Certificado da DIO' : 'Selo de conclusão da Claude Academy'
  const action = issuer === 'DIO' ? 'concluído' : 'emitido'
  const workload = hours ? `, carga horária de ${hours} ${hours === 1 ? 'hora' : 'horas'}` : ''
  return `${kind}: ${title}, ${action} em ${formatDateLong(date)}${workload}.`
}
