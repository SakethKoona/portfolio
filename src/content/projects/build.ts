import type { Project } from "./types";

const project: Project = {
  slug: "build",
  title: "Build",
  section: "featured",
  order: 1,
  headline: { lead: "Build, a block editor for", em: "RL environments" },
  body: "Scratch-style editor that compiles blocks into RL environments on HUD. First place, HUD x YC RSI RL Hackathon.",
  summary:
    "Environment, Tool, Task and Train blocks that compile into runnable RL environments on HUD. First place at the HUD x YC RSI RL Hackathon.",
  meta: "First place, HUD x YC RSI RL Hackathon",
  tags: ["Python", "HUD", "React", "FastAPI"],
  links: {
    caseStudy: "/work/build",
    live: "https://build.transpiralabs.com",
    repo: "https://github.com/Transpira-Labs/build",
  },
  vignette: "build",
};

export default project;
