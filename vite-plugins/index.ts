import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'

/** Pré-carrega a fonte do título (que tem hash no build) para evitar a troca visível de fonte. */
export function preloadDisplayFont(): Plugin {
  let base = '/'

  return {
    name: 'preload-display-font',
    configResolved(config) {
      base = config.base
    },
    transformIndexHtml(_html, { bundle }) {
      if (!bundle) return

      return Object.keys(bundle)
        .filter((file) => /archivo-latin-wdth-normal.*\.woff2$/.test(file))
        .map((file) => ({
          tag: 'link',
          injectTo: 'head' as const,
          attrs: { rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: '', href: `${base}${file}` },
        }))
    },
  }
}

/** Analytics sem cookies (GoatCounter). Sem código configurado, nada é injetado. */
export function goatCounter(code: string | undefined): Plugin {
  return {
    name: 'goatcounter',
    transformIndexHtml() {
      if (!code) return

      return [
        {
          tag: 'script',
          injectTo: 'head' as const,
          attrs: { async: true, src: 'https://gc.zgo.at/count.js', 'data-goatcounter': `https://${code}.goatcounter.com/count` },
        },
      ]
    },
  }
}

/** Gera robots.txt, sitemap.xml e llms.txt com a URL pública configurada em VITE_SITE_URL. */
export function siteFiles(siteUrl: string): Plugin {
  return {
    name: 'site-files',
    apply: 'build',
    generateBundle() {
      const emit = (fileName: string, source: string) => this.emitFile({ type: 'asset', fileName, source })

      const robots = ['User-agent: *', 'Allow: /', ...(siteUrl ? ['', `Sitemap: ${siteUrl}/sitemap.xml`] : [])]
      emit('robots.txt', `${robots.join('\n')}\n`)

      if (siteUrl) {
        const lastmod = new Date().toISOString().slice(0, 10)
        emit(
          'sitemap.xml',
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>\n</urlset>\n`,
        )
      }

      const llms = readFileSync(new URL('../seo/llms.template.txt', import.meta.url), 'utf8')
      emit('llms.txt', llms.replaceAll('{{SITE_URL}}', siteUrl || '(URL ainda não definida)'))
    },
  }
}

interface HeaderRule {
  source: string
  headers: { key: string; value: string }[]
}

/** vercel.json é a fonte única dos headers; aqui ele é convertido para o formato _headers do Netlify. */
export function netlifyHeaders(): Plugin {
  return {
    name: 'netlify-headers',
    apply: 'build',
    generateBundle() {
      const { headers } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')) as {
        headers: HeaderRule[]
      }

      const source = headers
        .map(({ source: path, headers: list }) =>
          [path.replace('(.*)', '*'), ...list.map(({ key, value }) => `  ${key}: ${value}`)].join('\n'),
        )
        .join('\n\n')

      this.emitFile({ type: 'asset', fileName: '_headers', source: `${source}\n` })
    },
  }
}
