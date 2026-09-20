# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/); versionamento [SemVer](https://semver.org/lang/pt-BR/).

## [1.0.0] - 2026-09-20

Primeira versão do portfólio.

### Adicionado

- Site em React + TypeScript + Vite: Hero, Sobre + trajetória, Atualmente, Projetos (+ Unity), Tecnologias, Certificados e Contato.
- Visualizador de certificados com `<dialog>` nativo, navegação por teclado, zoom "Tamanho real" e suporte a toque.
- 15 certificados reais (12 DIO, 3 Claude Academy) como WebP; 5 cursos listados só como texto (as imagens disponíveis eram geradas por IA).
- Pipeline de certificados (`npm run certs`) com allowlist e extração sem perdas dos JPEGs de PDFs.
- SEO: canonical, Open Graph, Twitter Card, JSON-LD, `robots.txt`, `sitemap.xml`, `llms.txt`, favicon (SVG/ICO/PNG) e manifest, todos dependentes de `VITE_SITE_URL`.
- Página 404 personalizada com `noindex`.
- Analytics sem cookies (GoatCounter) opcional, eventos anônimos e relato de erros de JavaScript.
- Headers de segurança (CSP, HSTS, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP) e cache em `vercel.json`, convertidos para `_headers` (Netlify) no build.
- Pré-renderização (SSG) com hidratação e CSS embutido.
- CI (lint, build, verificação do `dist/`, Lighthouse CI), workflow de uptime e Dependabot.
- `npm run check` para validar o build antes de publicar.
- README, documentação de arquitetura, deploy e operação.

### Qualidade

- Lighthouse (build de produção, local): desktop 99/100/81/100 e mobile 91/100/82/100 (performance/acessibilidade/boas práticas/SEO); a única perda de boas práticas é o teste em `http://localhost`.
