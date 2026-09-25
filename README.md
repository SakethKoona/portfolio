# saketh koona — portfolio

Personal site. Next.js 16 static export, plain CSS, no UI framework. Design: "Night meadow" (dark ground, one
photo hero with drawn fireflies, italic serif accent, hairline sections, mono diagrams).

```sh
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/, validates content
npm run lint
```

## Content

| What | Where |
| --- | --- |
| Name, links, hero copy, the work groups | `src/data/site.ts` |
| Experience (software engineering and research groups), education | `src/data/experience.ts` |
| Skill groups | `src/data/skills.ts` |
| Projects, one file each | `src/content/projects/*.ts`, registered in `index.ts` |
| Project diagrams | `src/components/vignettes/index.tsx` (live run: `LiveRun.tsx`) |
| Pages | `src/app/page.tsx`, `src/app/work`, `src/app/experience`, `src/app/about`, `src/app/work/elixirbenchmarker` |
| Hero photo, résumé, full CV | `public/meadow-hero.png`, `public/resume.pdf`, `public/cv.pdf` |

Pages: `/` (hero, in brief, selected work, current roles, contact), `/work` (every project, grouped by area),
`/experience` (software engineering and research), `/about` (bio, facts, skills), `/work/elixirbenchmarker`
(case study). The home page's standout projects are the `standout` list in `src/app/page.tsx`. Project sections: `featured` (needs `headline` and a `vignette`),
`backend` and `rl` (rows with a diagram), `earlier` (text rows), `also` (one line). `next build` fails on bad content: duplicate slugs or orders, missing
fields, unknown vignettes, non-https links, repo links that point at the GitHub profile, or private projects that
carry a link.

## Deploy

Vercel, Next.js preset. `NEXT_PUBLIC_SITE_URL` is the production URL (used for metadata). Pushes to `main`
deploy to production.
