import { Section } from '../layout/Section'
import styles from './About.module.css'
import { Timeline } from './Timeline'

export function About() {
  return (
    <Section id="sobre" index="01" label="Sobre" title="Analista de Sistemas, em formação contínua.">
      <div className={styles.prose}>
        <p className={styles.lead}>
          Sou Analista de Sistemas e estou construindo conhecimento de programação de forma prática: estudo, escrevo
          código e transformo o que aprendo em projetos.
        </p>
        <p>
          Hoje o foco é backend com Python — APIs com FastAPI e dados com PostgreSQL. Pelo caminho, explorei Unity e IA
          local com Ollama, e agora aprendo o Claude e o Claude Code como ferramentas de desenvolvimento assistido por
          IA.
        </p>
        <p>A direção é seguir em backend, publicando projetos no GitHub e registrando aqui a evolução.</p>
      </div>

      <Timeline />
    </Section>
  )
}
