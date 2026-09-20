import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import { goatCounter, netlifyHeaders, preloadDisplayFont, siteFiles } from './vite-plugins/index.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  const siteUrl = (env.VITE_SITE_URL ?? '').replace(/\/$/, '')

  return {
    plugins: [react(), preloadDisplayFont(), goatCounter(env.VITE_GOATCOUNTER_CODE), siteFiles(siteUrl), netlifyHeaders()],
    build: {
      rollupOptions: {
        input: {
          main: fileURLToPath(new URL('./index.html', import.meta.url)),
          notFound: fileURLToPath(new URL('./404.html', import.meta.url)),
        },
      },
    },
  }
})
