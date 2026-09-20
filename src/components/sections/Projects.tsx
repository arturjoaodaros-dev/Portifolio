import { projects } from '../../data/projects'
import { site } from '../../data/site'
import { Section } from '../layout/Section'
import { ArrowLink } from '../ui/ArrowLink'
import { StatusTag } from '../ui/StatusTag'
import styles from './Projects.module.css'
import { ProjectEntry } from './ProjectEntry'

const unityProjects = projects.filter(({ category }) => category === 'unity')
const otherProjects = projects.filter(({ category }) => category !== 'unity')

export function Projects() {
  return (
    <Section id="projetos" index="03" label="Projetos" title="Projetos e experimentos.">
      {otherProjects.length > 0 ? (
        <div className={styles.list}>
          {otherProjects.map((project, position) => (
            <ProjectEntry key={project.id} project={project} position={position} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>Os projetos entram aqui conforme forem publicados.</p>
          <p className={styles.emptyText}>Enquanto isso, o GitHub é o lugar mais atualizado.</p>
          <ArrowLink href={site.links.github} external>
            Ver o GitHub
          </ArrowLink>
        </div>
      )}

      <article className={styles.unity} aria-labelledby="unity-titulo">
        <div className={styles.unityHead}>
          <h3 id="unity-titulo" className={styles.unityTitle}>
            Unity
          </h3>
          <StatusTag level="used" />
        </div>
        <p className={styles.unityText}>
          Já explorei o desenvolvimento de projetos com Unity. Não é meu foco atual — faz parte da minha trajetória
          técnica.
        </p>
        {unityProjects.length > 0 && (
          <div className={styles.unityList}>
            {unityProjects.map((project, position) => (
              <ProjectEntry key={project.id} project={project} position={position} />
            ))}
          </div>
        )}
      </article>
    </Section>
  )
}
