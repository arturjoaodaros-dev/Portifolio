import { site } from '../../data/site'
import { trackEvent } from '../../lib/analytics'
import { Section } from '../layout/Section'
import { ArrowLink } from '../ui/ArrowLink'
import styles from './Contact.module.css'

const profiles = [
  { label: 'GitHub', href: site.links.github },
  { label: 'LinkedIn', href: site.links.linkedin },
].filter(({ href }) => href)

export function Contact() {
  const { email } = site.links

  return (
    <Section id="contato" index="06" label="Contato" title="Fale comigo." tone="dark">
      <p className={styles.intro}>Sobre backend, Python ou os projetos que estou construindo: o e-mail é o caminho mais direto.</p>

      <a className={styles.email} href={`mailto:${email}`} onClick={() => trackEvent('contato/email')}>
        {email}
      </a>

      <ul className={styles.profiles}>
        {profiles.map(({ label, href }) => (
          <li key={label} className={styles.profile}>
            <span className="label">{label}</span>
            <ArrowLink href={href} external onClick={() => trackEvent(`contato/${label.toLowerCase()}`)}>
              {href.replace(/^https?:\/\//, '')}
            </ArrowLink>
          </li>
        ))}
      </ul>
    </Section>
  )
}
