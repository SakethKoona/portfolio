@AGENTS.md

# Portfolio

Saketh Koona's personal site. Design source: the "Night meadow" boards on the "Saketh Koona · Portfolio directions"
design canvas (desktop 1440, mobile 390). Match them closely.

- Palette: ground `#0A100D`, panels `#101913`, text `#E9F0E4` / `#A9B5A6` / `#8E9A8B`, hairlines
  `rgba(233,240,228,0.09)`, sage accent `#B7D9A2`, gold `#E6C27A`, blue `#9FC4D9`, rose `#D9A9A2`.
- Type: Hanken Grotesk 300 for everything, Instrument Serif italic for the one accent phrase per headline,
  JetBrains Mono only inside diagrams. No all-caps labels outside diagrams, no em dashes anywhere.
- Static export (`output: "export"`); no server features. Plain CSS in `src/app/globals.css`.
  Breakpoints: ≤1240, ≤1100 tablet, ≤720 phone. `.desk` / `.mob` switch desktop and phone variants.
- Content is data: `src/data/*.ts`, `src/content/projects/*.ts`. The validator in `src/content/projects/index.ts`
  runs at build time.
- Never invent facts, metrics, employers or awards. Everything on the page comes from the CV in `public/cv.pdf`
  or the project repos. GhidraEnv and Catan RL are private: no repo or live link.
