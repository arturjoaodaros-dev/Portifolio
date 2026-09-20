import type { FocusItem } from '../types'
import { certificatesOf } from './certificates'

export const pipeline = [
  { name: 'Estudar', description: 'Cursos e exercícios para entender o conceito.' },
  { name: 'Experimentar', description: 'Usar a ferramenta para ver como ela funciona.' },
  { name: 'Construir', description: 'Projetos que existem e estão publicados.' },
] as const

export const focusItems: FocusItem[] = [
  {
    name: 'Python',
    stage: 'studying',
    summary: 'Minha principal linguagem de estudo.',
    evidence: `${certificatesOf('python').length} cursos concluídos`,
  },
  {
    name: 'FastAPI',
    stage: 'studying',
    summary: 'Meu foco atual em desenvolvimento backend.',
    evidence: 'Base: curso de introdução a aplicações REST',
  },
  {
    name: 'PostgreSQL',
    stage: 'studying',
    summary: 'Banco de dados que estudo junto com o backend.',
    evidence: 'Base: cursos de bancos relacionais e Python DB API',
  },
  {
    name: 'Claude e Claude Code',
    stage: 'exploring',
    summary: 'Ferramentas que estou explorando para desenvolvimento assistido por IA.',
    evidence: `${certificatesOf('claude').length} cursos da Claude Academy`,
  },
]
