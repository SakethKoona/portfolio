@AGENTS.md

# Portfolio

Saketh Koona's personal site. Design source: the "Saketh Koona — Portfolio" design canvas (desktop 1440, mobile 390,
ElixirBenchmarker case study). Match it closely: warm-gray ground `#F4F3F0`, white cards r20, Newsreader display /
Instrument Sans body / JetBrains Mono labels, terracotta accent `#B84A26`, ink blue `#2F5FA8` for diagrams.

- Static export (`output: "export"`); no server features.
- Plain CSS in `src/app/globals.css`. Breakpoints: ≤1240, ≤1100 tablet, ≤720 phone. `.desk*` / `.mob*` helpers switch
  between the desktop and phone variants where the design differs.
- Content is data: `src/data/site.ts`, `src/data/experience.ts`, `src/content/projects/*.ts`, `src/content/notes.ts`.
  The validator in `src/content/projects/index.ts` runs at build time.
- Never invent facts, metrics, employers or awards. Unknown personal details stay `null` and are hidden, not shown as
  placeholders. GhidraEnv and Catan RL are private: no repo or live link.
