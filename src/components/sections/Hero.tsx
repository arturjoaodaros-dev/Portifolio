import { site } from '../../data/site'
import { levelLabels, technologiesAt } from '../../data/technologies'
import type { Level } from '../../types'
import { ArrowLink } from '../ui/ArrowLink'
import styles from './Hero.module.css'

const levels: Level[] = ['studying', 'exploring', 'used']

export function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="titulo-inicial">
      <div className={`container ${styles.grid}`}>
        <p className={`label ${styles.eyebrow}`}>Portfólio</p>

        <h1 id="titulo-inicial" className={styles.name}>
          <span>Artur João</span> <span>Darós</span>
        </h1>

        <p className={styles.role}>{site.role}</p>

        <div className={styles.summary}>
          <p className={styles.lead}>
            Aprendo backend na prática. Hoje estudo <mark>Python, FastAPI e PostgreSQL</mark>; ao lado, exploro o{' '}
            <mark>Claude Code</mark> e já usei Unity e IA local com Ollama.
          </p>

          <div className={styles.actions}>
            <ArrowLink href="#projetos" direction="down">
              Ver projetos
            </ArrowLink>
            <ArrowLink href="#certificados" direction="down">
              Ver certificados
            </ArrowLink>
          </div>
        </div>

        <dl className={styles.profile}>
          {levels.map((level) => (
            <div className={styles.row} key={level}>
              <dt className="label">{levelLabels[level]}</dt>
              <dd>
                <ul className={styles.names}>
                  {technologiesAt(level).map(({ name }) => (
                    <li key={name}>{level === 'used' ? name : <mark>{name}</mark>}</li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
