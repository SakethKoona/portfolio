# saketh koona — portfolio

Personal site. Next.js 16 static export, plain CSS, no UI framework.

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/, validates content
npm run lint
```

## Content

| What | Where |
| --- | --- |
| Name, email, links, résumé, city / time zone / school | `src/data/site.ts` |
| Experience (section hidden while empty) | `src/data/experience.ts` |
| Projects, one file each | `src/content/projects/*.ts`, registered in `index.ts` |
| Design-decision notes | `src/content/notes.ts` |
| Project diagrams ("vignettes") | `src/components/vignettes/index.tsx` |
| ElixirBenchmarker case study | `src/app/work/elixirbenchmarker/page.tsx` |
| Résumé PDF | `public/resume.pdf` |

Adding a project: add a file in `src/content/projects/`, import it in `index.ts`, and set its `section`
(`featured`, `evals`, or `also`), `order`, and `vignette` (an existing key, or add one). `next build`
fails on bad content: duplicate slugs or orders, missing fields, unknown vignettes, non-https links,
repo links that point at the GitHub profile, or private projects that carry a link.

## Still to fill in

These are `null` in `src/data/site.ts` and hidden on the site until set: `city`, `timeZone`,
`affiliation` (school or employer), `linkedin`. `src/data/experience.ts` is empty.

## Deploy

Vercel, Next.js preset. Set `NEXT_PUBLIC_SITE_URL` to the production URL (used for metadata).
Pushes to `main` deploy to production.
