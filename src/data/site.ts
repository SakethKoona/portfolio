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
  recognition: "First place, HUD x YC RSI RL Hackathon",
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
