// Confere o build em dist/ antes de publicar:  npm run check
// Falha (exit 1) se faltar algum arquivo de SEO, se restar placeholder de env
// ou se algum certificado fora da lista aprovada chegar ao deploy.
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
// A URL esperada é a que o próprio HTML declara (canonical); sitemap, robots, llms.txt e og:image precisam concordar com ela.
let siteUrl = ''

const errors = []
const check = (condition, message) => condition || errors.push(message)
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const read = (file) => readFileSync(path.join(dist, file), 'utf8')

const required = [
  'index.html',
  '404.html',
  'robots.txt',
  'sitemap.xml',
  'llms.txt',
  '_headers',
  'og.png',
  'favicon.svg',
  'favicon.ico',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'site.webmanifest',
]
for (const file of required) check(existsSync(path.join(dist, file)), `arquivo ausente em dist/: ${file}`)

if (errors.length === 0) {
  const html = read('index.html')
  siteUrl = /rel="canonical"\s+href="(https?:\/\/[^"]+?)\/"/.exec(html)?.[1] ?? ''
  check(siteUrl.startsWith('https://'), 'canonical ausente ou sem https:// (confira VITE_SITE_URL)')
  check(!/%(VITE_)?SITE_URL%/.test(html), 'index.html ainda tem placeholder %SITE_URL% sem substituir')
  check(new RegExp(`property="og:image"\\s+content="${escapeRegExp(siteUrl)}/og.png"`).test(html), 'og:image precisa ser URL absoluta')
  check(/<div id="root"><[^/]/.test(html) && html.includes('Artur João</span>'), 'index.html não está pré-renderizado (rode npm run build completo)')
  check(/<title>[^<]{10,}<\/title>/.test(html), 'title ausente')
  check(/name="description"\s+content="[^"]{50,}/.test(html), 'meta description ausente ou curta demais')
  check(read('sitemap.xml').includes(`<loc>${siteUrl}/</loc>`), 'sitemap.xml não aponta para o canonical')
  check(read('robots.txt').includes(`Sitemap: ${siteUrl}/sitemap.xml`), 'robots.txt sem a linha Sitemap')
  check(read('llms.txt').includes(siteUrl), 'llms.txt sem a URL do site')
  check(/noindex/.test(read('404.html')), '404.html precisa de noindex')
  check(read('_headers').includes('Content-Security-Policy'), '_headers sem Content-Security-Policy')
}

// Certificados: exatamente os do manifesto (miniatura + tamanho cheio), sem marcas de geração por IA
const manifest = JSON.parse(readFileSync(path.join(root, 'src/data/certificate-images.json'), 'utf8'))
const expected = new Set(Object.keys(manifest).flatMap((id) => [`${id}.webp`, `${id}-thumb.webp`]))
const certDir = path.join(dist, 'certificates')
const actual = existsSync(certDir) ? readdirSync(certDir) : []
for (const file of expected) check(actual.includes(file), `certificado ausente: ${file}`)
for (const file of actual) {
  check(expected.has(file), `arquivo inesperado em dist/certificates: ${file}`)
  const bytes = readFileSync(path.join(certDir, file)).toString('latin1')
  check(!/dreamina|c2pa/i.test(bytes), `marca de geração por IA em ${file}`)
}

if (errors.length > 0) {
  console.error(`✗ ${errors.length} problema(s) em dist/:\n${errors.map((error) => `  - ${error}`).join('\n')}`)
  process.exit(1)
}
console.log(`✓ dist/ ok — ${required.length} arquivos obrigatórios, ${expected.size} imagens de certificado, site ${siteUrl}`)
