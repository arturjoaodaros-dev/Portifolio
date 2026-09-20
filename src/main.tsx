import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { installErrorReporting } from './lib/analytics'
import './styles/fonts.css'
import './styles/tokens.css'
import './styles/base.css'
import App from './App.tsx'

// Habilita as animações de entrada (o conteúdo só é escondido quando o JS está ativo).
document.documentElement.classList.add('js')
installErrorReporting()

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// No build o HTML já vem pré-renderizado (hidrata); no `npm run dev` a raiz está vazia.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
