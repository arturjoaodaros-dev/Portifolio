import type { Project } from '../types'

/*
 * Projetos exibidos no site. Adicione aqui apenas projetos reais, com dados
 * verificáveis. Projetos com category: 'unity' aparecem no bloco de Unity; os
 * demais na lista principal. Exemplo de entrada:
 *
 * {
 *   id: 'nome-do-projeto',
 *   name: 'Nome do projeto',
 *   summary: 'O que é e o que faz, em uma ou duas frases.',
 *   context: 'Por que foi construído / o que foi aprendido.',
 *   stack: ['Python', 'FastAPI', 'PostgreSQL'],
 *   status: 'em-desenvolvimento',
 *   category: 'backend',
 *   image: { src: '/projects/nome.webp', alt: 'Descrição da imagem', width: 1440, height: 900 },
 *   repository: 'https://github.com/arturjoaodaros-dev/nome-do-projeto',
 *   demo: 'https://…',
 * }
 */
export const projects: Project[] = []
