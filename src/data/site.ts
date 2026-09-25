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
  contactTitle: "Get in touch",
  description:
    "Saketh Koona builds distributed backends in Rust, Elixir and C++, and evaluation and RL environments for AI agents.",
  recognition: "First place, HUD x YC RSI RL Hackathon",
  // The About page, in order.
  bio: [
    "I'm Saketh, a software engineer in Atlanta. I build distributed backends and the environments used to train and evaluate AI agents.",
    "I studied Industrial Engineering at Georgia Tech. Alongside the degree I led the team building financial data systems for the Joint Finance Data Committee, modeled neural dynamics in the SIPLab, worked on retinal-scan segmentation in Emory's Madabhushi Lab, and built an RL environment for portfolio optimization in the AI-Based Innovation and Discovery Lab.",
    "Since July 2026 I have been a software engineer intern at Transpira Labs, working on a GTM platform, an AI quoting engine, freight ingestion pipelines and RLVR environments with deterministic verifiers. I also contribute tests to NVIDIA NeMo-RL.",
    "On my own time I build systems projects: an event-driven image pipeline in Rust, a matching engine in C++ and a benchmark platform in Elixir. Build, a Scratch-style editor for RL environments, won first place at the HUD x YC RSI RL Hackathon.",
  ],
};

export type AreaIcon = "graph" | "ladder" | "blocks" | "check";

// The work groups. `section` matches the project content files.
export const groups: { section: "backend" | "rl" | "earlier"; icon: AreaIcon; title: string; body: string }[] = [
  {
    section: "backend",
    icon: "graph",
    title: "Backend systems",
    body: "Job queues, worker pools and a matching engine in Elixir, Rust and C++.",
  },
  {
    section: "rl",
    icon: "blocks",
    title: "RL environments and evals",
    body: "Deterministic graders and RLVR environments for training and evaluating agents.",
  },
  {
    section: "earlier",
    icon: "ladder",
    title: "Trading and ML",
    body: "Earlier work in quantitative finance and applied ML, without diagrams.",
  },
]
