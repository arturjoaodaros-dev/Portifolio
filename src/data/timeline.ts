import type { TimelineStage } from '../types'
import { certificatesOf } from './certificates'

/*
 * Etapas da evolução. Datas e contagens NÃO são digitadas aqui: saem dos
 * certificados listados em certificateIds. Etapas sem certificados (sem data
 * confiável) aparecem sem data.
 */
export const timeline: TimelineStage[] = [
  {
    title: 'Fundamentos',
    description: 'Ponto de partida: atuo como Analista de Sistemas.',
  },
  {
    title: 'Programação com Python',
    description:
      'Tipos de dados, funções e orientação a objetos; depois decoradores, arquivos, datas e gerenciamento de pacotes.',
    certificateIds: certificatesOf('python').map(({ id }) => id),
  },
  {
    title: 'Bancos de dados',
    description: 'Bancos relacionais, SQL com Python (DB API) e uma introdução a NoSQL com MongoDB.',
    certificateIds: ['introducao-banco-de-dados', 'bancos-relacionais', 'python-db-api', 'mongodb-nosql'],
  },
  {
    title: 'Backend e APIs',
    description: 'Introdução a aplicações REST concluída. Agora: FastAPI para a API e PostgreSQL para os dados.',
    certificateIds: ['rest'],
    status: 'current',
  },
  {
    title: 'Projetos práticos',
    description: 'Projetos experimentais, incluindo trabalhos com Unity.',
  },
  {
    title: 'IA e novas ferramentas',
    description: 'Ollama e IA local; Claude e Claude Code para desenvolvimento assistido por IA.',
    certificateIds: certificatesOf('claude').map(({ id }) => id),
    status: 'parallel',
  },
]
