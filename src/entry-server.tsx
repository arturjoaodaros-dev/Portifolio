import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

/** Usado só no build (scripts/prerender.mjs): gera o HTML inicial que o navegador hidrata. */
export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
