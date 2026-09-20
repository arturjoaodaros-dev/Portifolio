// Pré-renderiza o React em dist/index.html (roda depois dos dois builds do Vite).
// O HTML resultante já contém todo o conteúdo: pinta mais rápido e funciona
// para crawlers, leitores de tela e modelos de linguagem que não executam JS.
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const indexPath = path.join(root, 'dist', 'index.html')
const ssrDir = path.join(root, 'dist-ssr')

const { render } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)
const html = await readFile(indexPath, 'utf8')

const placeholder = '<div id="root"></div>'
if (!html.includes(placeholder)) throw new Error(`prerender: "${placeholder}" não encontrado em dist/index.html`)

// O CSS da página inteira tem ~5 KB comprimido: embuti-lo evita uma requisição que bloquearia a primeira pintura.
const stylesheet = /<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/g
let inlined = html.replace(placeholder, `<div id="root">${render()}</div>`)
for (const [tag, href] of inlined.matchAll(stylesheet)) {
  const css = await readFile(path.join(root, 'dist', href), 'utf8')
  inlined = inlined.replace(tag, () => `<style>${css}</style>`)
}

await writeFile(indexPath, inlined)
await rm(ssrDir, { recursive: true, force: true })
console.log('✓ dist/index.html pré-renderizado')
