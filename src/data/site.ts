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
  role: "Software engineer, Atlanta",
  headline: { lead: "Distributed systems and", em: "machine learning" },
  intro:
    "Backend infrastructure in Rust, Elixir and C++, RL environments and evals for AI agents, and applied machine learning research. Software engineer intern at Transpira Labs.",
  introShort:
    "Backend infrastructure in Rust, Elixir and C++, RL environments and evals for AI agents, and applied machine learning research.",
  about:
    "Software engineer in Atlanta, working across distributed systems and machine learning: backend infrastructure, RL environments and evals, and research in neural dynamics and portfolio optimization.",
  blurb: "Software and machine learning engineer in Atlanta.",
  contactTitle: "Get in touch",
  description:
    "Saketh Koona, software and machine learning engineer in Atlanta: distributed backends in Rust, Elixir and C++, RL environments and evals for AI agents, and applied ML research.",
  recognition: "First place, HUD x YC RSI RL Hackathon",
  // The About page, in order.
  bio: [
    "I'm Saketh, a software engineer in Atlanta. I work across distributed systems and machine learning: backend infrastructure, RL environments and evals for AI agents, and applied ML research.",
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
