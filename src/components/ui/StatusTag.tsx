import { levelLabels } from '../../data/technologies'
import type { Level } from '../../types'
import styles from './StatusTag.module.css'

export function StatusTag({ level }: { level: Level }) {
  return (
    <span className={styles.tag} data-level={level}>
      {levelLabels[level]}
    </span>
  )
}
