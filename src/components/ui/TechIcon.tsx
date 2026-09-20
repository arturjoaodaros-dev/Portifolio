import type { TechIconSource } from '../../types'

export function TechIcon({ icon, size = 36 }: { icon: TechIconSource; size?: number }) {
  if (icon.type === 'lucide') {
    const { Icon } = icon
    return <Icon size={size} strokeWidth={1.4} aria-hidden="true" />
  }

  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  )
}
