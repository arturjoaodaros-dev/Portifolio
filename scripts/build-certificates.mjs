// Gera as imagens de certificados usadas pelo site a partir de Certifications/.
//
//   npm run certs
//
// Só entram no site os arquivos listados em SOURCES (allowlist explícita).
// Imagens que não estão aqui nunca chegam a public/. PDFs de certificado são
// uma página com um único JPEG embutido: ele é extraído sem recompressão antes
// da conversão para WebP.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceDir = path.join(root, 'Certifications')
const outputDir = path.join(root, 'public', 'certificates')
const manifestPath = path.join(root, 'src', 'data', 'certificate-images.json')

const THUMB_WIDTH = 720

/** slug do certificado → arquivo em Certifications/ */
const SOURCES = {
  poo: 'Python/POO.png',
  heranca: 'Python/Heranca.png',
  encapsulamento: 'Python/encapsulamento.png',
  decoradores: 'Python/decoratos.png',
  'data-hora': 'Python/Date.png',
  arquivos: 'Python/file.png',
  pacotes: 'Python/pacotes.pdf',
  'introducao-banco-de-dados': 'Python/IntroducaoSQL.pdf',
  'bancos-relacionais': 'Python/SQL.pdf',
  'python-db-api': 'Python/DBAPI.pdf',
  'mongodb-nosql': 'Python/NoSQL.pdf',
  rest: 'Python/REST.pdf',
  'claude-101': 'Nova pasta/Claude101.jpeg',
  'claude-code-101': 'Nova pasta/ClaudeCode101.jpeg',
  'claude-code-in-action': 'Nova pasta/ClaudeCodeInAction.jpeg',
}

function extractJpegFromPdf(pdf) {
  const text = pdf.toString('latin1')
  const filter = text.indexOf('/DCTDecode')
  if (filter === -1) throw new Error('PDF sem imagem JPEG (DCTDecode)')

  const keyword = text.indexOf('stream', filter)
  let start = keyword + 'stream'.length
  if (text[start] === '\r') start += 1
  if (text[start] === '\n') start += 1

  const end = text.indexOf('endstream', start)
  const data = pdf.subarray(start, end)
  const eoi = data.lastIndexOf(Buffer.from([0xff, 0xd9]))
  if (data[0] !== 0xff || data[1] !== 0xd8 || eoi === -1) {
    throw new Error('Stream extraído não é um JPEG válido')
  }
  return data.subarray(0, eoi + 2)
}

async function loadSource(file) {
  const buffer = await readFile(path.join(sourceDir, file))
  return file.endsWith('.pdf') ? extractJpegFromPdf(buffer) : buffer
}

await rm(outputDir, { recursive: true, force: true })
await mkdir(outputDir, { recursive: true })

const manifest = {}

for (const [slug, file] of Object.entries(SOURCES)) {
  const input = await loadSource(file)
  const { width, height } = await sharp(input).metadata()

  await sharp(input)
    .webp({ quality: 88, effort: 6, smartSubsample: true })
    .toFile(path.join(outputDir, `${slug}.webp`))

  const thumb = await sharp(input)
    .resize({ width: Math.min(THUMB_WIDTH, width), withoutEnlargement: true })
    .webp({ quality: 82, effort: 6, smartSubsample: true })
    .toFile(path.join(outputDir, `${slug}-thumb.webp`))

  manifest[slug] = {
    width,
    height,
    thumbWidth: thumb.width,
    thumbHeight: thumb.height,
  }
  console.log(`${slug.padEnd(28)} ${width}x${height}  <- ${file}`)
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`\n${Object.keys(manifest).length} certificados -> public/certificates/`)
