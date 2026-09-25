import type { Project } from "./types";

const project: Project = {
  slug: "accounting-bench",
  title: "AccountingBench",
  section: "rl",
  order: 1,
  body: "An eval where the agent closes the books for a fictional SaaS company. It reads Stripe, Ramp, Rippling and Mercury data out of Postgres, posts double-entry journal entries only through stored procedures, and submits reconciliations. A multi-month Q1 scenario covers deferred revenue, accrual reversals and prepaid amortization.",
  summary:
    "The agent closes the books for a fictional SaaS company: reads Stripe, Ramp, Rippling and Mercury data from Postgres, posts double-entry journal entries only through stored procedures, and submits reconciliations.",
  tags: ["Postgres", "stored procedures", "RLVR"],
  links: { repo: "https://github.com/SakethKoona/accounting-bench" },
  vignette: "accounting",
};

export default project;
