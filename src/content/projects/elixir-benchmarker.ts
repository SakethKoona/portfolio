import type { Project } from "./types";

const project: Project = {
  slug: "elixirbenchmarker",
  title: "ElixirBenchmarker",
  section: "featured",
  order: 1,
  eyebrow: "Distributed benchmarking",
  body: [
    "A distributed, highly concurrent benchmark platform for AI agents. Hand it a dataset of tasks, point it at a harness (an HTTP API or a CLI subprocess), and it runs the whole dataset concurrently, scores each result, and streams progress to the UI as it happens.",
    "Postgres and Oban are the integration point, not BEAM clustering: the web app enqueues one job per task, workers poll and execute. Scaling out means starting another worker node.",
  ],
  mobileBody:
    "A distributed, highly concurrent benchmark platform for AI agents. Hand it a dataset of tasks and a harness (HTTP API or CLI subprocess); it runs the dataset concurrently, scores each result, and streams progress to the UI over SSE. Postgres and Oban are the integration point: scaling out means starting another worker.",
  tags: ["Elixir · OTP", "Phoenix", "Oban", "Postgres", "SSE", "Next.js / TS"],
  mobileTags: ["Elixir · OTP", "Phoenix", "Oban", "Postgres", "SSE", "Next.js"],
  links: {
    caseStudy: "/work/elixirbenchmarker",
    live: "https://elixirbenchmarker.vercel.app",
    repo: "https://github.com/SakethKoona/ElixirBenchmarker",
  },
  vignette: "bench",
};

export default project;
