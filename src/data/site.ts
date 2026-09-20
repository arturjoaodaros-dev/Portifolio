interface SiteLinks {
  github: string
  email: string
  /** Cole aqui a URL do perfil para exibir o LinkedIn na seção de contato. */
  linkedin: string
}

export const site = {
  name: 'Artur João Darós',
  role: 'Analista de Sistemas',
  links: {
    github: 'https://github.com/arturjoaodaros-dev',
    email: 'arturjoaodaros@gmail.com',
    linkedin: '',
  } satisfies SiteLinks,
}

export const navigation = [
  { id: 'sobre', label: 'Sobre' },
  { id: 'atualmente', label: 'Atualmente' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'tecnologias', label: 'Tecnologias' },
  { id: 'certificados', label: 'Certificados' },
  { id: 'contato', label: 'Contato' },
] as const
