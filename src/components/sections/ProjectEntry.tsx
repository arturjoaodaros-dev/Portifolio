import { pad2 } from '../../lib/format'
import type { Project, ProjectStatus } from '../../types'
import { ArrowLink } from '../ui/ArrowLink'
import styles from './ProjectEntry.module.css'

const statusLabels: Record<ProjectStatus, string> = {
  'em-desenvolvimento': 'Em desenvolvimento',
  concluido: 'Concluído',
  experimento: 'Experimento',
}

const categoryLabels: Record<Project['category'], string> = {
  unity: 'Unity',
  backend: 'Backend',
  ia: 'IA',
  web: 'Web',
  outro: 'Projeto',
}

export function ProjectEntry({ project, position }: { project: Project; position: number }) {
  const { name, summary, context, stack, status, category, image, repository, demo } = project

  return (
    <article className={styles.entry}>
      <span className={styles.number} aria-hidden="true">
        {pad2(position + 1)}
      </span>

      <div className={styles.text}>
        <p className="label">
          {statusLabels[status]} · {categoryLabels[category]}
        </p>
        <h3 className={styles.name}>{name}</h3>
        <p>{summary}</p>
        {context && <p className={styles.context}>{context}</p>}

        <ul className={styles.stack} aria-label="Tecnologias usadas">
          {stack.map((item) => (
            <li className="label" key={item}>
              {item}
            </li>
          ))}
        </ul>

        {(repository || demo) && (
          <div className={styles.links}>
            {repository && (
              <ArrowLink href={repository} external>
                Código no GitHub
              </ArrowLink>
            )}
            {demo && (
              <ArrowLink href={demo} external>
                Demonstração
              </ArrowLink>
            )}
          </div>
        )}
      </div>

      {image && (
        <figure className={styles.figure}>
          <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
        </figure>
      )}
    </article>
  )
}
