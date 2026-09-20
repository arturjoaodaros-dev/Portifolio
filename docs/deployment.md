# Deploy, domínio e HTTPS

O site é 100% estático (`dist/`). Hospedagem prevista: **Vercel** (Netlify funciona igual: ver o final).

## 1. Publicar na Vercel

1. Crie um repositório novo no GitHub para o portfólio e envie o código. _(O repositório antigo `Padaria-Silvano` não deve ser reutilizado.)_
2. Em [vercel.com](https://vercel.com), **Add New → Project**, importe o repositório. O `vercel.json` já define framework, build (`npm run build`) e saída (`dist`).
3. Em **Settings → Environment Variables**, confirme:
   - `VITE_SITE_URL` = `https://arturdaros.is-a.dev`
   - `VITE_GOATCOUNTER_CODE` = código do GoatCounter (ver [operação](operations.md)); pode ficar vazio.
4. **Deploy.** A partir daí: push na `main` publica em produção e cada pull request ganha um _preview_. O CI do GitHub (`.github/workflows/ci.yml`) roda lint, build, `check` e Lighthouse. **CD é feito pela própria Vercel**, sem segredos no repositório.

> Sem repositório GitHub por enquanto? `npm run verify` gera o `dist/` e o CLI da Vercel (`npx vercel --prod`) publica a partir da pasta.

## 2. Domínio `arturdaros.is-a.dev`

`is-a.dev` é um serviço gratuito de subdomínios registrado por pull request. **O registro não é feito por este projeto**: precisa ser aberto por você.

1. Na Vercel: **Project → Settings → Domains → Add** `arturdaros.is-a.dev`. A Vercel mostra o registro DNS exigido (normalmente um `CNAME`; use exatamente o valor exibido lá).
2. Abra um pull request em [`is-a-dev/register`](https://github.com/is-a-dev/register) adicionando `domains/arturdaros.json`. Formato de referência (**confira o formato e os requisitos atuais no README do repositório**):

   ```json
   {
     "owner": { "username": "arturjoaodaros-dev", "email": "SEU_EMAIL" },
     "records": { "CNAME": "VALOR_MOSTRADO_PELA_VERCEL" }
   }
   ```

3. Depois que o PR for aceito e o DNS propagar, a Vercel valida o domínio sozinha.
4. Se o domínio final for outro, altere apenas `VITE_SITE_URL` e refaça o deploy: canonical, Open Graph, sitemap, robots e llms.txt acompanham.

## 3. HTTPS

Certificado (Let's Encrypt) e redirecionamento HTTP → HTTPS são automáticos na Vercel assim que o domínio valida. O header `Strict-Transport-Security` (2 anos) está em `vercel.json`. Não foi ativado _preload_ de HSTS de propósito (é difícil de reverter).

## 4. Depois do primeiro deploy

- Confirme `https://arturdaros.is-a.dev/robots.txt`, `/sitemap.xml`, `/llms.txt` e uma rota inexistente (deve mostrar a 404 do site com status 404).
- Envie o `sitemap.xml` ao [Google Search Console](https://search.google.com/search-console).
- Ative o uptime: variável `UPTIME_ENABLED=true` no GitHub (ver [operação](operations.md)).
- Teste o cartão de compartilhamento colando a URL em um chat ou no depurador do Facebook/LinkedIn.

## Reverter uma publicação

Na Vercel, **Deployments → (deploy anterior) → Promote to Production** (instantâneo), ou `git revert` do commit.

## Alternativa: Netlify

Importe o repositório; comando `npm run build`, pasta `dist`, mesmas variáveis de ambiente. O build gera `dist/_headers` (convertido do `vercel.json`, fonte única) e a `404.html` é usada automaticamente. Domínio: aponte o `CNAME` para o host que o Netlify indicar.
