import type { Project } from "./types";

const project: Project = {
  slug: "ghidra-env",
  title: "GhidraEnv",
  section: "evals",
  order: 3,
  eyebrow: "Reverse-engineering eval",
  status: "private",
  body: [
    "An eval environment for AI agents doing static binary reverse engineering through Ghidra MCP tools. 44 tasks across 6 categories, generated from 21 scenario templates over 4 synthetic binaries, graded deterministically against ground truth computed at build time. Baseline: Claude Opus 4.6 scored 0.095 mean reward overall.",
  ],
  mobileBody:
    "An eval environment for agents doing static binary reverse engineering through Ghidra MCP tools. 44 tasks across 6 categories, 21 scenario templates, 4 synthetic binaries, deterministic grading. Baseline: Claude Opus 4.6 at 0.095 mean reward.",
  tags: ["Ghidra MCP", "deterministic grading", "synthetic binaries"],
  links: {},
  vignette: "ghidra",
};

export default project;
