import { Maximize2 } from 'lucide-react'
import { certificateMeta, certificateSrc, describeCertificate } from '../../data/certificates'
import type { ImagedCertificate } from '../../types'
import styles from './CertificateCard.module.css'

interface CertificateCardProps {
  certificate: ImagedCertificate
  onOpen: () => void
}

export function CertificateCard({ certificate, onOpen }: CertificateCardProps) {
  const { id, title, image } = certificate

  return (
    <button type="button" className={styles.card} onClick={onOpen} aria-label={`Ampliar certificado: ${title}`}>
      <span className={styles.plate}>
        <img
          src={certificateSrc(id).thumb}
          alt={describeCertificate(certificate)}
          width={image.thumbWidth}
          height={image.thumbHeight}
          loading="lazy"
          decoding="async"
        />
        <span className={styles.zoom} aria-hidden="true">
          <Maximize2 size={16} strokeWidth={1.75} />
        </span>
      </span>
      <span className={styles.caption}>
        <span className="label">{certificateMeta(certificate)}</span>
        <span className={styles.title}>{title}</span>
      </span>
    </button>
  )
}
