import { useEffect, useState } from 'react'

/** Id da seção que cruza a faixa central da viewport, ou null no topo da página. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    let current: string | null = null

    const observer = new IntersectionObserver(
      (entries) => {
        for (const { target, isIntersecting } of entries) {
          if (isIntersecting) current = target.id
          else if (current === target.id) current = null
        }
        setActive(current)
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}
