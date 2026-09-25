import type { Project } from "./types";

const project: Project = {
  slug: "environment-builder",
  title: "Environment Builder",
  section: "evals",
  order: 1,
  eyebrow: "Visual RL-environment builder · Transpira",
  body: [
    "A Scratch-style, block-based builder for HUD reinforcement-learning environments. Snap together Environment, Tool, Task and Train blocks, describe each in plain language, and get an environment you can build, test and train on, with no code, JSON or CLI in the default UI. Blocks form a typed recursive tree (Task ▸ Scoring ▸ Good answer) projected to a Zod-validated IR, which a Python backend compiles into `tools.py` and `env.py`, smoke-checks, and deploys to HUD for eval and training runs.",
  ],
  mobileBody:
    "A Scratch-style block builder for HUD RL environments: snap together Environment, Tool, Task and Train blocks, describe each in plain language, and get an environment you can build, test and train on. The block tree compiles to a Zod-validated IR, then a Python backend generates `tools.py` / `env.py` and deploys to HUD.",
  tags: ["Next.js 16", "React 19", "dnd-kit", "Zod", "Python", "HUD"],
  mobileTags: ["Next.js", "dnd-kit", "Zod", "HUD"],
  links: {
    live: "https://build.transpiralabs.com",
    repo: "https://github.com/Transpira-Labs/build",
  },
  vignette: "builder",
};

export default project;
