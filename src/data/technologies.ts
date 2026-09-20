import { Cpu, Terminal } from 'lucide-react'
import { siClaude, siFastapi, siGit, siGithub, siOllama, siPostgresql, siPython, siUnity } from 'simple-icons'
import type { Level, Technology } from '../types'

export const levelLabels: Record<Level, string> = {
  studying: 'Estudando',
  exploring: 'Explorando',
  used: 'Já usei',
}

export const levelDescriptions: Record<Level, string> = {
  studying: 'Aprendendo agora, com curso e prática.',
  exploring: 'Testando no meu fluxo de trabalho agora.',
  used: 'Tive contato em projetos ou experimentos.',
}

export const technologies: Technology[] = [
  {
    name: 'Python',
    group: 'principal',
    level: 'studying',
    note: 'Minha principal linguagem de estudo.',
    icon: { type: 'brand', path: siPython.path },
  },
  {
    name: 'FastAPI',
    group: 'principal',
    level: 'studying',
    note: 'Framework para construir APIs.',
    icon: { type: 'brand', path: siFastapi.path },
  },
  {
    name: 'PostgreSQL',
    group: 'principal',
    level: 'studying',
    note: 'Banco relacional, estudado junto com o backend.',
    icon: { type: 'brand', path: siPostgresql.path },
  },
  {
    name: 'Git',
    group: 'principal',
    level: 'used',
    note: 'Controle de versão.',
    icon: { type: 'brand', path: siGit.path },
  },
  {
    name: 'GitHub',
    group: 'principal',
    level: 'used',
    note: 'Repositórios e publicação de código.',
    icon: { type: 'brand', path: siGithub.path },
  },
  {
    name: 'Unity',
    group: 'principal',
    level: 'used',
    note: 'Explorei o desenvolvimento de projetos.',
    icon: { type: 'brand', path: siUnity.path },
  },
  {
    name: 'Claude',
    group: 'explorada',
    level: 'exploring',
    note: 'Curso Claude 101 concluído.',
    icon: { type: 'brand', path: siClaude.path },
  },
  {
    name: 'Claude Code',
    group: 'explorada',
    level: 'exploring',
    note: 'Cursos Claude Code 101 e Claude Code in Action concluídos.',
    icon: { type: 'lucide', Icon: Terminal },
  },
  {
    name: 'Ollama',
    group: 'explorada',
    level: 'used',
    note: 'Usei para rodar modelos de IA localmente.',
    icon: { type: 'brand', path: siOllama.path },
  },
  {
    name: 'IA local',
    group: 'explorada',
    level: 'used',
    note: 'Explorei modelos de IA que rodam na própria máquina.',
    icon: { type: 'lucide', Icon: Cpu },
  },
]

export function technologiesAt(level: Level) {
  return technologies.filter((technology) => technology.level === level)
}
