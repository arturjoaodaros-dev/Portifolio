# Operação

## Analytics (GoatCounter, sem cookies)

1. Crie uma conta em [goatcounter.com](https://www.goatcounter.com) e escolha o código do site (o `xxxx` de `xxxx.goatcounter.com`).
2. Defina `VITE_GOATCOUNTER_CODE=xxxx` no `.env` e/ou nas variáveis da Vercel e faça novo deploy.
3. Com o código definido, o build injeta `count.js` e o rodapé passa a informar "Estatísticas de acesso anônimas, sem cookies". Sem código, **nenhum script de terceiros é carregado**.

Eventos enviados (aparecem em _Events_ no painel), todos anônimos e sem dados pessoais:

| Evento | Quando |
| --- | --- |
| `certificado/<id>` | um certificado é aberto no visualizador |
| `contato/email`, `contato/github`, `contato/linkedin` | clique nos contatos |
| `erro/js`, `erro/promessa` | erro de JavaScript não tratado (log de erros do front-end) |

Bloqueadores de anúncio podem impedir a coleta; os números são uma estimativa. Esta seção não substitui orientação jurídica sobre LGPD; como não há cookies nem dados pessoais, não há banner de consentimento.

> Não foi possível validar a coleta real durante o desenvolvimento (depende da sua conta). Confira no painel após o primeiro deploy.

## Monitoramento de uptime

`.github/workflows/uptime.yml` roda a cada 30 min (melhor esforço do GitHub) e falha se: `/`, `/robots.txt`, `/sitemap.xml` ou `/llms.txt` não responderem 200; a home não contiver "Artur João Darós"; ou uma rota inexistente não devolver 404. HTTPS inválido também faz a verificação falhar (`curl` valida o certificado). O GitHub avisa por e-mail quando o workflow falha.

Ativação: no GitHub, **Settings → Secrets and variables → Actions → Variables**: `UPTIME_ENABLED = true` (e `SITE_URL`, se o domínio mudar). Fica desligado por padrão para não gerar falhas antes de o site estar no ar.

Limitações: repositórios públicos sem atividade por 60 dias têm workflows agendados desativados pelo GitHub; para alertas com SMS/push, use também um serviço externo (UptimeRobot, Better Stack) apontando para a home.

## Logs

O site é estático: não há servidor próprio nem logs de aplicação. O que existe:

- **Acessos e comportamento:** GoatCounter.
- **Erros do navegador:** eventos `erro/js` e `erro/promessa` no GoatCounter.
- **Deploys e builds:** painel da Vercel (Deployments → Build Logs).
- **Requisições ao CDN:** conforme o plano da Vercel (Logs/Observability no painel).
- **Falhas de disponibilidade:** histórico do workflow `Uptime` no GitHub Actions.

## Performance (Lighthouse)

Local (o Chrome/Edge precisa estar instalado):

```bash
npm run build
npm run lighthouse
```

No CI, o job `Lighthouse` roda 3 vezes sobre `dist/` e falha abaixo dos limites de `lighthouserc.json`; o relatório fica como artefato da execução. Notas:

- Em `http://localhost` a auditoria "não usa HTTPS" sempre penaliza _Boas práticas_; por isso o limite dessa categoria é 0,8.
- Antivírus que injetam scripts no tráfego local (ex.: Kaspersky) distorcem a medição; bloqueie-os na auditoria (`--blocked-url-patterns`).
- A fonte do título está pré-carregada e com `font-display: block`; mexer nisso pode reintroduzir CLS.

## Headers de segurança e cache

Edite só o `vercel.json`; o `_headers` do Netlify é gerado dele. Assets com hash (`/assets/*`) são imutáveis por 1 ano; certificados, 1 dia. Depois de mudar a CSP, abra o site e olhe o console: violações aparecem como `Refused to …`.

## Atualização de dependências

O Dependabot abre PRs semanais (npm, agrupando minor/patch) e mensais (Actions). O CI valida cada um; faça o merge quando `verify` e `Lighthouse` passarem.

## Resolução de problemas

| Sintoma | Causa provável |
| --- | --- |
| `npm run check` acusa placeholder `%VITE_…%` | variável ausente no `.env` |
| `check`: "não está pré-renderizado" | rodou só `vite build`; use `npm run build` |
| Console: erro de hidratação | conteúdo que difere entre servidor e cliente (datas, `window` no render) |
| `og:image` sem URL absoluta | `VITE_SITE_URL` vazio ou sem `https://` |
| Certificado novo não aparece | falta a entrada em `SOURCES` ou rodar `npm run certs` |
