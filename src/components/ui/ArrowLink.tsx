import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react'
import type { ReactNode } from 'react'
import styles from './ArrowLink.module.css'

interface ArrowLinkProps {
  href: string
  children: ReactNode
  /** Abre em nova aba e mostra a seta diagonal */
  external?: boolean
  direction?: 'right' | 'down'
  onClick?: () => void
}

export function ArrowLink({ href, children, external = false, direction = 'right', onClick }: ArrowLinkProps) {
  const Icon = external ? ArrowUpRight : direction === 'down' ? ArrowDown : ArrowRight

  return (
    <a
      className={styles.link}
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <Icon className={styles.icon} size={18} strokeWidth={1.75} aria-hidden="true" />
      {external && <span className="visually-hidden">(abre em nova aba)</span>}
    </a>
  )
}
