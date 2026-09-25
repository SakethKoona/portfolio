// Personal info. Anything left `null` is hidden on the site rather than shown as a placeholder.
export const site = {
  name: "Saketh Koona",
  shortName: "saketh koona",
  email: "koona.saketh@gmail.com",
  github: "https://github.com/SakethKoona",
  githubHandle: "SakethKoona",
  linkedin: null as string | null,
  resume: "/resume.pdf" as string | null,
  city: null as string | null,
  timeZone: null as string | null,
  affiliation: null as string | null, // school or employer
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  focus: "Backend systems · Agent evals · Rust / Elixir / C++",
  focusShort: "Backend · Agent evals · Rust / Elixir / C++",
  currently: "building eval environments for agents",
  description:
    "Saketh Koona builds distributed backends in Rust, Elixir and C++, and evaluation and RL environments for AI agents.",
};
