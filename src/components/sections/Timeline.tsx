import { certificates } from '../../data/certificates'
import { timeline } from '../../data/timeline'
import { formatRange, pad2 } from '../../lib/format'
import type { TimelineStage } from '../../types'
import styles from './Timeline.module.css'

const statusLabels = { current: 'Agora', parallel: 'Em paralelo' } as const

/** Contagem e período saem dos certificados da etapa, nunca são digitados. */
function evidenceOf({ certificateIds }: TimelineStage) {
  if (!certificateIds?.length) return null

  const dates = certificateIds
    .map((id) => {
      const certificate = certificates.find((item) => item.id === id)
      if (!certificate) throw new Error(`Timeline: o certificado "${id}" não existe em data/certificates.ts`)
      return certificate.date
    })
    .sort()

  const count = dates.length
  return {
    count: `${count} ${count === 1 ? 'curso concluído' : 'cursos concluídos'}`,
    period: formatRange(dates[0], dates[count - 1]),
  }
}

export function Timeline() {
  return (
    <div className={styles.timeline}>
      <h3 className="label">Trajetória</h3>
      <ol className={styles.list}>
        {timeline.map((stage, position) => {
          const evidence = evidenceOf(stage)

          return (
            <li key={stage.title} className={styles.stage}>
              <span className={styles.number} aria-hidden="true">
                {pad2(position + 1)}
              </span>
              <div className={styles.text}>
                <h4 className={styles.title}>
                  {stage.title}
                  {stage.status && <mark className={styles.flag}>{statusLabels[stage.status]}</mark>}
                </h4>
                <p>{stage.description}</p>
              </div>
              {evidence && (
                <p className={`label ${styles.evidence}`}>
                  <span>{evidence.count}</span>
                  <span>{evidence.period}</span>
                </p>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
