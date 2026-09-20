import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './Section.module.css'

interface SectionProps {
  id: string
  /** Número da seção, ex.: "02" */
  index: string
  label: string
  title: string
  tone?: 'light' | 'dark'
  /** offset: conteúdo alinhado à direita da coluna de rótulo; full: largura total */
  layout?: 'offset' | 'full'
  children: ReactNode
}

export function Section({ id, index, label, title, tone = 'light', layout = 'offset', children }: SectionProps) {
  const headRef = useReveal<HTMLDivElement>()
  const bodyRef = useReveal<HTMLDivElement>()
  const titleId = `${id}-titulo`

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      data-tone={tone === 'dark' ? 'dark' : undefined}
      className={styles.section}
    >
      <div className={`container ${styles.grid}`}>
        <div ref={headRef} className={`reveal ${styles.head}`}>
          <p className={`label ${styles.label}`}>
            <span className={styles.index}>{index}</span> / {label}
          </p>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
        </div>
        <div ref={bodyRef} className={`reveal ${styles.body}`} data-layout={layout}>
          {children}
        </div>
      </div>
    </section>
  )
}
