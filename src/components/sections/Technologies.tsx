import { levelDescriptions, technologies } from '../../data/technologies'
import type { Level } from '../../types'
import { Section } from '../layout/Section'
import { StatusTag } from '../ui/StatusTag'
import { TechIcon } from '../ui/TechIcon'
import styles from './Technologies.module.css'

const levels: Level[] = ['studying', 'exploring', 'used']

const groups = [
  { group: 'principal', title: 'Principais' },
  { group: 'explorada', title: 'Exploradas' },
] as const

export function Technologies() {
  return (
    <Section
      id="tecnologias"
      index="04"
      label="Tecnologias"
      title="Poucas tecnologias, com o nível de contato de cada uma."
    >
      <ul className={styles.legend} aria-label="Legenda dos níveis">
        {levels.map((level) => (
          <li key={level} className={styles.legendItem}>
            <StatusTag level={level} />
            <span>{levelDescriptions[level]}</span>
          </li>
        ))}
      </ul>

      {groups.map(({ group, title }) => {
        const items = technologies.filter((technology) => technology.group === group)

        return (
          <div key={group} className={styles.group}>
            <h3 className="label">
              {title} <span className={styles.count}>({items.length})</span>
            </h3>
            <ul className={styles.grid} data-group={group}>
              {items.map(({ name, level, note, icon }) => (
                <li key={name} className={styles.cell}>
                  <div className={styles.top}>
                    <TechIcon icon={icon} />
                    <StatusTag level={level} />
                  </div>
                  <div>
                    <h4 className={styles.name}>{name}</h4>
                    <p className={styles.note}>{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </Section>
  )
}
