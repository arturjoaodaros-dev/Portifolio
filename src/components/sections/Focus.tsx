import { focusItems, pipeline } from '../../data/focus'
import { pad2 } from '../../lib/format'
import { Section } from '../layout/Section'
import { ArrowLink } from '../ui/ArrowLink'
import { StatusTag } from '../ui/StatusTag'
import styles from './Focus.module.css'

export function Focus() {
  return (
    <Section id="atualmente" index="02" label="Atualmente" title="O que estou estudando agora." tone="dark">
      <p className={styles.intro}>
        Estudar, experimentar e construir são etapas diferentes. Aqui, cada tecnologia aparece na etapa em que está de
        verdade.
      </p>

      <ol className={styles.pipeline}>
        {pipeline.map(({ name, description }, position) => (
          <li key={name} className={styles.step}>
            <span className="label">{pad2(position + 1)}</span>
            <strong className={styles.stepName}>{name}</strong>
            <span className={styles.stepText}>{description}</span>
            {name === 'Construir' && <ArrowLink href="#projetos">Ver projetos</ArrowLink>}
          </li>
        ))}
      </ol>

      <ul className={styles.items}>
        {focusItems.map(({ name, stage, summary, evidence }, position) => (
          <li key={name} className={styles.item}>
            <span className={styles.number} aria-hidden="true">
              {pad2(position + 1)}
            </span>
            <h3 className={styles.name}>{name}</h3>
            <div className={styles.detail}>
              <p>{summary}</p>
              <p className={`label ${styles.evidence}`}>{evidence}</p>
            </div>
            <div className={styles.tag}>
              <StatusTag level={stage} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
