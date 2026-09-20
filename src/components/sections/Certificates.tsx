import { useState } from 'react'
import { certificates, certificatesOf, trackLabels } from '../../data/certificates'
import { trackEvent } from '../../lib/analytics'
import { formatDate, formatHours } from '../../lib/format'
import type { CertificateTrack, ImagedCertificate } from '../../types'
import { Section } from '../layout/Section'
import { CertificateCard } from './CertificateCard'
import { CertificateLightbox } from './CertificateLightbox'
import styles from './Certificates.module.css'

type Filter = 'all' | CertificateTrack

const filters: { value: Filter; label: string; count: number }[] = [
  { value: 'all', label: 'Todos', count: certificates.length },
  ...(Object.keys(trackLabels) as CertificateTrack[]).map((track) => ({
    value: track,
    label: trackLabels[track],
    count: certificatesOf(track).length,
  })),
]

const withImageCount = certificates.filter(({ image }) => image).length

export function Certificates() {
  const [filter, setFilter] = useState<Filter>('all')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const visible = certificates.filter(({ track }) => filter === 'all' || track === filter)
  const imaged = visible.filter((certificate): certificate is ImagedCertificate => certificate.image !== undefined)
  const textOnly = visible.filter(({ image }) => !image)

  return (
    <Section id="certificados" index="05" label="Certificados" title="Cursos concluídos e certificados." layout="full">
      <div className={styles.intro}>
        <p>
          {certificates.length} cursos concluídos, em ordem cronológica. {withImageCount} têm o certificado disponível
          para ampliar.
        </p>

        <div role="group" aria-label="Filtrar por trilha" className={styles.filters}>
          {filters.map(({ value, label, count }) => (
            <button
              key={value}
              type="button"
              className={styles.filter}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label} <span className={styles.filterCount}>{count}</span>
            </button>
          ))}
        </div>
        <p className="visually-hidden" aria-live="polite">
          {visible.length} cursos exibidos
        </p>
      </div>

      <ul className={styles.grid}>
        {imaged.map((certificate, position) => (
          <li key={certificate.id}>
            <CertificateCard certificate={certificate} onOpen={() => {
                setOpenIndex(position)
                trackEvent(`certificado/${certificate.id}`, certificate.title)
              }} />
          </li>
        ))}
      </ul>

      {textOnly.length > 0 && (
        <div className={styles.more}>
          <h3 className="label">Também concluídos</h3>
          <ul className={styles.rows}>
            {textOnly.map(({ id, title, date, hours }) => (
              <li key={id} className={styles.row}>
                <span className={styles.rowTitle}>{title}</span>
                <span className="label">
                  {formatDate(date)}
                  {hours ? ` · ${formatHours(hours)}` : ''}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.note}>Certificado ainda não incluído neste site.</p>
        </div>
      )}

      <CertificateLightbox
        items={imaged}
        index={openIndex}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </Section>
  )
}
