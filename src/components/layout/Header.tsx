import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { navigation, site } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { pad2 } from '../../lib/format'
import styles from './Header.module.css'

const sectionIds = navigation.map(({ id }) => id)

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    if (!menuOpen) return

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      menuButton.current?.focus()
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [menuOpen])

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <a className={styles.brand} href="#inicio">
          {site.name}
        </a>

        <button
          ref={menuButton}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="menu-principal"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <>
              Fechar <X size={18} strokeWidth={1.75} aria-hidden="true" />
            </>
          ) : (
            'Menu'
          )}
        </button>

        <nav id="menu-principal" className={styles.nav} data-open={menuOpen} aria-label="Principal">
          <ul className={styles.list}>
            {navigation.map(({ id, label }, position) => (
              <li key={id}>
                <a
                  className={styles.link}
                  href={`#${id}`}
                  aria-current={activeId === id ? 'location' : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  <span className={styles.number} aria-hidden="true">
                    {pad2(position + 1)}
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
