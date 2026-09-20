# Arquitetura

## Estrutura

```
Certifications/        originais dos certificados (fora do git e do deploy)
public/                servido como está: favicons, og.png, manifest, certificates/ (gerados)
scripts/               build-certificates · prerender · check-dist
seo/                   llms.template.txt
vite-plugins/          preload da fonte · GoatCounter · robots/sitemap/llms · _headers
src/
  data/                todo o conteúdo (tipado)
  components/          layout/ · ui/ · sections/
  hooks/               useReveal · useActiveSection
  lib/                 format (datas pt-BR) · analytics
  styles/              tokens · base · fonts · not-found
  entry-server.tsx     usado só na pré-renderização
404.html               segunda entrada do Vite (compartilha fontes e estilos)
vercel.json            headers (fonte única; vira _headers no build)
```

## Pipeline de build (`npm run build`)

1. `tsc -b`: checagem de tipos.
2. `vite build`: cliente (index + 404), robots/sitemap/llms/`_headers`, hash de assets, preload da fonte do título.
3. `vite build --ssr`: bundle de servidor só para renderizar o React em texto.
4. `scripts/prerender.mjs`: injeta o HTML renderizado em `dist/index.html`, embute o CSS (≈ 5 KB comprimido) e apaga `dist-ssr/`.

O cliente **hidrata** esse HTML (`hydrateRoot`). Em `npm run dev` a raiz está vazia e o React monta normalmente. Sem JavaScript o conteúdo continua legível; as animações de entrada só escondem conteúdo quando a classe `js` existe.

## Modelo de conteúdo

- `certificates.ts` é a fonte da verdade dos cursos. A imagem vem de `certificate-images.json` (gerado): quem não tem entrada aparece só como texto.
- `timeline.ts` referencia certificados por `id`; contagem e período são **derivados** (nunca digitados). Um `id` inexistente lança erro explícito.
- `technologies.ts` define o nível (`studying`, `exploring`, `used`); Hero, Atualmente e Tecnologias derivam dele.
- `projects.ts` começa vazio de propósito: só projetos reais entram.

## Decisões de design

- **Cor única de destaque: o marca-texto amarelo**, que significa "estou estudando/explorando agora". Não é decorativo.
- Sem gradientes, brilho, vidro, grid decorativo, partículas ou animação contínua. Animações: entrada discreta (uma vez), sublinhados, fade do visualizador. Todas respeitam `prefers-reduced-motion`.
- Tipografia: Archivo variável (largura e peso) para títulos e corpo; IBM Plex Mono para rótulos, datas e tags. Só o subconjunto `latin` é publicado.
- A fonte do título usa `font-display: block` (pré-carregada) porque o nome gigante não pode "pular" na troca de fonte.

## Segurança

CSP em [`vercel.json`](../vercel.json): apenas `'self'` mais `gc.zgo.at` e `*.goatcounter.com` (analytics). `style-src 'unsafe-inline'` existe por causa do CSS embutido no HTML no pré-render (evita uma requisição bloqueante); **scripts inline não são permitidos**. Ao adicionar um serviço de terceiros, inclua o domínio na CSP e rode `npm run verify`.

## Certificados: pipeline e regra de autenticidade

`scripts/build-certificates.mjs` usa uma **allowlist** (`SOURCES`), extrai o JPEG embutido dos PDFs sem recompressão e gera WebP (miniatura 720 px e tamanho cheio). Cinco cursos existiam apenas como imagens regeneradas por IA; por isso aparecem só como texto até serem reemitidos.
