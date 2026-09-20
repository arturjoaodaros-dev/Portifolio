import { ArrowUpRight, ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react'
import { type KeyboardEvent, type MouseEvent, useEffect, useRef, useState } from 'react'
import { certificateMeta, certificateSrc, describeCertificate } from '../../data/certificates'
import { pad2 } from '../../lib/format'
import type { ImagedCertificate } from '../../types'
import styles from './CertificateLightbox.module.css'

interface CertificateLightboxProps {
  items: ImagedCertificate[]
  /** Posição do certificado aberto em items; null com o visualizador fechado */
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function CertificateLightbox({ items, index, onIndexChange, onClose }: CertificateLightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [zoomedId, setZoomedId] = useState<string | null>(null)

  const isOpen = index !== null
  const certificate = index === null ? undefined : items[index]
  // Guardar o id (e não um booleano) faz o zoom voltar ao normal ao trocar de certificado.
  const zoomed = certificate !== undefined && zoomedId === certificate.id

  // <dialog> nativo: showModal() cuida de foco preso, Esc e retorno do foco ao card.
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  }, [isOpen])

  function step(delta: number) {
    if (index === null) return
    onIndexChange((index + delta + items.length) % items.length)
  }

  function toggleZoom() {
    if (certificate) setZoomedId(zoomed ? null : certificate.id)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDialogElement>) {
    // Com zoom, as setas rolam a imagem em vez de trocar de certificado.
    if (zoomed) return
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    } else if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    }
  }

  function closeOnBackdrop(event: MouseEvent<HTMLElement>) {
    if (event.target === event.currentTarget) dialogRef.current?.close()
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="certificado-titulo"
      onClose={() => {
        setZoomedId(null)
        onClose()
      }}
      onKeyDown={handleKeyDown}
    >
      {certificate && index !== null && (
        // tabIndex -1: clicar em área não focável mantém o foco dentro do diálogo (senão as setas param de funcionar)
        <div className={styles.frame} tabIndex={-1}>
          <div className={styles.bar}>
            <p className="label" aria-hidden="true">
              {pad2(index + 1)} / {pad2(items.length)}
            </p>
            <div className={styles.actions}>
              <button type="button" className={styles.tool} aria-pressed={zoomed} onClick={toggleZoom}>
                <ZoomIn size={18} strokeWidth={1.75} aria-hidden="true" />
                Tamanho real
              </button>
              <button type="button" className={styles.tool} onClick={() => dialogRef.current?.close()}>
                Fechar <X size={20} strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            className={styles.stage}
            data-zoomed={zoomed}
            onClick={closeOnBackdrop}
            // Sempre focável: sair do zoom com a área focada não pode jogar o foco para o body
            tabIndex={zoomed ? 0 : -1}
            {...(zoomed ? { role: 'region', 'aria-label': 'Certificado em tamanho real' } : {})}
          >
            <img
              key={certificate.id}
              src={certificateSrc(certificate.id).full}
              alt={describeCertificate(certificate)}
              width={certificate.image.width}
              height={certificate.image.height}
              decoding="async"
              onClick={toggleZoom}
            />
          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.tool} onClick={() => step(-1)} aria-label="Certificado anterior">
              <ChevronLeft size={22} strokeWidth={1.75} aria-hidden="true" />
              <span>Anterior</span>
            </button>

            <div className={styles.caption} aria-live="polite">
              <p className="label">{certificateMeta(certificate)}</p>
              <h2 id="certificado-titulo" className={styles.title}>
                {certificate.title}
              </h2>
              <a href={certificateSrc(certificate.id).full} target="_blank" rel="noopener noreferrer">
                Abrir imagem em nova aba <ArrowUpRight size={16} strokeWidth={1.75} aria-hidden="true" />
                <span className="visually-hidden">(abre em nova aba)</span>
              </a>
            </div>

            <button type="button" className={styles.tool} onClick={() => step(1)} aria-label="Próximo certificado">
              <span>Próximo</span>
              <ChevronRight size={22} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </dialog>
  )
}
