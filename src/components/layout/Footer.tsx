import { ArrowUp } from 'lucide-react'
import { site } from '../../data/site'
import { analyticsEnabled } from '../../lib/analytics'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer} data-tone="dark">
      <div className="container">
        <div className={styles.inner}>
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
          </p>
          <p>
            Feito com React, TypeScript e Vite.
            {analyticsEnabled && ' Estatísticas de acesso anônimas, sem cookies.'}
          </p>
          <a className={styles.top} href="#inicio">
            Voltar ao topo <ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  )
}
