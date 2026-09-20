interface GoatCounter {
  count?: (vars: { path: string; title?: string; event?: boolean }) => void
}

declare global {
  interface Window {
    goatcounter?: GoatCounter
  }
}

/** Analytics só está ativo quando VITE_GOATCOUNTER_CODE está definido (ver .env). */
export const analyticsEnabled = Boolean(import.meta.env.VITE_GOATCOUNTER_CODE)

/** Evento anônimo (sem cookies, sem dados pessoais). Não faz nada se o analytics estiver desligado ou bloqueado. */
export function trackEvent(name: string, title?: string) {
  window.goatcounter?.count?.({ path: name, title, event: true })
}

/** Registra erros de JavaScript como eventos: serve de log de erros do front-end. */
export function installErrorReporting() {
  window.addEventListener('error', ({ message }) => trackEvent('erro/js', message.slice(0, 120)))
  window.addEventListener('unhandledrejection', ({ reason }) =>
    trackEvent('erro/promessa', String(reason instanceof Error ? reason.message : reason).slice(0, 120)),
  )
}
