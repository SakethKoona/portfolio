import type { Project, Section } from "./types";
import { vignetteKeys } from "@/components/vignettes";

import build from "./build";
import elixirBenchmarker from "./elixir-benchmarker";
import datasetProcessor from "./distributed-dataset-processor";
import marketSimulator from "./market-simulator";
import accountingBench from "./accounting-bench";
import ghidraEnv from "./ghidra-env";
import catanRl from "./catan-rl";
import volatility from "./volatility-forecasting";
import imcProsperity from "./imc-prosperity";
import whatsUpDoc from "./whats-up-doc";
import fakeNews from "./fake-news";
import sleepBlocker from "./sleep-blocker-app";
import gamblingMl from "./gambling-ml";

export type { Project, Section } from "./types";

const all: Project[] = [
  build,
  elixirBenchmarker,
  datasetProcessor,
  marketSimulator,
  accountingBench,
  ghidraEnv,
  catanRl,
  volatility,
  imcProsperity,
  whatsUpDoc,
  fakeNews,
  sleepBlocker,
  gamblingMl,
];

// Runs at build time: a bad content file fails `next build` instead of shipping.
function validate(projects: Project[]): Project[] {
  const errors: string[] = [];
  const slugs = new Set<string>();
  const orders = new Set<string>();
  for (const p of projects) {
    const at = `project "${p.slug || p.title}"`;
    if (!p.slug || !/^[a-z0-9-]+$/.test(p.slug)) errors.push(`${at}: slug must be lowercase kebab-case`);
    if (slugs.has(p.slug)) errors.push(`${at}: duplicate slug`);
    slugs.add(p.slug);
    const orderKey = `${p.section}:${p.order}`;
    if (orders.has(orderKey)) errors.push(`${at}: duplicate order ${p.order} in section "${p.section}"`);
    orders.add(orderKey);
    if (!p.title.trim()) errors.push(`${at}: missing title`);
    if (p.section === "also") {
      if (!p.note) errors.push(`${at}: "also" projects need a note`);
    } else {
      if (!p.body.trim()) errors.push(`${at}: missing body`);
      if (p.tags.length === 0) errors.push(`${at}: missing tags`);
    }
    if (p.section === "featured" && !p.headline) errors.push(`${at}: featured projects need a headline`);
    if ((p.section === "featured" || p.section === "more") && !p.vignette) errors.push(`${at}: missing vignette`);
    if (p.vignette && !vignetteKeys.includes(p.vignette)) errors.push(`${at}: unknown vignette "${p.vignette}"`);
    if (p.status === "private" && (p.links.repo || p.links.live))
      errors.push(`${at}: private projects must not link a repo or live URL`);
    for (const [kind, url] of Object.entries(p.links)) {
      if (!url) continue;
      const ok = kind === "caseStudy" ? url.startsWith("/") : /^https:\/\//.test(url);
      if (!ok) errors.push(`${at}: bad ${kind} link "${url}"`);
    }
    if (p.links.repo === "https://github.com/SakethKoona")
      errors.push(`${at}: repo link points at the profile, not a repo`);
  }
  if (errors.length) throw new Error(`Invalid project content:\n  - ${errors.join("\n  - ")}`);
  return projects;
}

export const projects = validate(all);

export function projectsIn(section: Section): Project[] {
  return projects.filter((p) => p.section === section).sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project {
  const p = projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`Unknown project "${slug}"`);
  return p;
}
