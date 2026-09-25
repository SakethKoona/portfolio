// Personal info and the hero copy. Anything `null` is hidden rather than shown as a placeholder.
export const site = {
  name: "Saketh Koona",
  email: "koona.saketh@gmail.com",
  github: "https://github.com/SakethKoona",
  githubHandle: "SakethKoona",
  linkedin: "https://www.linkedin.com/in/skoona3/" as string | null,
  resume: "/resume.pdf" as string | null,
  cv: "/cv.pdf" as string | null,
  city: "Atlanta" as string | null,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  role: "Backend engineer, Atlanta",
  headline: { lead: "Distributed backends and", em: "RL environments" },
  intro:
    "Kafka pipelines, worker pools and a matching engine in Rust, Elixir and C++. Benchmarks and RL environments for training and evaluating AI agents. Software engineer intern at Transpira Labs.",
  introShort:
    "Kafka pipelines, worker pools and a matching engine in Rust, Elixir and C++. Benchmarks and RL environments for training and evaluating AI agents.",
  about:
    "Software engineer in Atlanta. Most of my work is distributed backends and the environments used to train and evaluate AI agents.",
  blurb: "Backend engineer in Atlanta. Distributed systems and RL environments.",
  contactLine: { lead: "Open to backend and", em: "agent evaluation", tail: "roles" },
  description:
    "Saketh Koona builds distributed backends in Rust, Elixir and C++, and evaluation and RL environments for AI agents.",
  heroImage: "/meadow-hero.png",
};

export type AreaIcon = "graph" | "ladder" | "blocks" | "check";

// The four areas under the hero.
export const areas: { icon: AreaIcon; title: string; body: string; bodyShort: string }[] = [
  {
    icon: "graph",
    title: "Distributed backends",
    body: "Kafka worker pools, job queues and process supervision in Rust and Elixir.",
    bodyShort: "Kafka worker pools and job queues in Rust and Elixir.",
  },
  {
    icon: "ladder",
    title: "Matching engines",
    body: "A price-time priority order book in C++ with binary order entry and multicast market data.",
    bodyShort: "A price-time priority order book in C++.",
  },
  {
    icon: "blocks",
    title: "RL environments",
    body: "Block-based environment building on HUD, and GRPO training against game engines.",
    bodyShort: "Block-based building on HUD, GRPO against game engines.",
  },
  {
    icon: "check",
    title: "Evals and verifiers",
    body: "Deterministic graders and RLVR environments for reasoning benchmarks like AccountingBench.",
    bodyShort: "Deterministic graders and RLVR environments.",
  },
];
