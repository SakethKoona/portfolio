import type { Project } from "./types";

const project: Project = {
  slug: "itch",
  title: "Itch",
  section: "evals",
  order: 1,
  eyebrow: "Visual RL-environment builder",
  body: [
    "A Scratch-style drag-and-drop editor for RL environments: Environment, Tool, Task, Task Set C-blocks and Database blocks snap together with peg-and-socket SVG on a pan/zoom canvas, and compile to a JSON spec for a training backend. A live completeness checker and templates (Inventory, Support, Research agents) get you to a valid spec fast.",
  ],
  mobileBody:
    "A Scratch-style block editor for RL environments: Environment, Tool, Task, Task Set and Database blocks snap together on a pan/zoom canvas and compile to a JSON spec. Live completeness checker, templates for Inventory, Support and Research agents.",
  tags: ["React 19", "TypeScript", "Vite", "Tailwind v4", "shadcn/ui"],
  mobileTags: ["React 19", "TS", "Vite", "Tailwind v4"],
  links: {
    live: "https://build-khaki-iota.vercel.app",
    repo: "https://github.com/SakethKoona/Itch",
  },
  vignette: "itch",
};

export default project;
