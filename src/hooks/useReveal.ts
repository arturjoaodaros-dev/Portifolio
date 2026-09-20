import { useEffect, useRef } from 'react'

/** Marca o elemento como visível na primeira vez que ele entra na viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (!('IntersectionObserver' in window)) {
      element.dataset.visible = 'true'
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        element.dataset.visible = 'true'
        observer.disconnect()
      },
      { rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return ref
}
