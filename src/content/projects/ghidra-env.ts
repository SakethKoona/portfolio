import type { Project } from "./types";

const project: Project = {
  slug: "ghidra-env",
  title: "GhidraEnv",
  section: "more",
  order: 3,
  status: "private",
  body: "An eval environment for agents doing static binary reverse engineering through Ghidra MCP tools. 44 tasks across 6 categories, generated from 21 scenario templates over 4 synthetic binaries, graded deterministically against ground truth computed at build time.",
  summary:
    "Static binary reverse engineering through Ghidra MCP tools. 44 tasks across 6 categories over 4 synthetic binaries, graded deterministically against ground truth computed at build time.",
  tags: ["Ghidra MCP", "deterministic grading", "synthetic binaries"],
  links: {},
  vignette: "ghidra",
};

export default project;
