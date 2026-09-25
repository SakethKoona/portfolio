import type { Project } from "./types";

const project: Project = {
  slug: "elixirbenchmarker",
  title: "ElixirBenchmarker",
  section: "featured",
  order: 2,
  headline: { lead: "ElixirBenchmarker, a benchmark platform", em: "for agents" },
  body: "Runs a dataset of agent tasks against a harness concurrently, scores each result and streams progress over SSE. Postgres and Oban sit between the web tier and the workers.",
  summary:
    "Runs a dataset of tasks against a harness concurrently, scores each result and streams progress over SSE. Postgres and Oban sit between the web tier and any number of workers.",
  tags: ["Elixir", "Phoenix", "Oban", "Postgres", "SSE"],
  links: {
    caseStudy: "/work/elixirbenchmarker",
    live: "https://elixirbenchmarker.vercel.app",
    repo: "https://github.com/SakethKoona/ElixirBenchmarker",
  },
  vignette: "bench",
};

export default project;
