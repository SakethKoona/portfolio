import type { Project } from "./types";

const project: Project = {
  slug: "accounting-bench",
  title: "AccountingBench",
  section: "evals",
  order: 2,
  eyebrow: "LLM eval · month-end close",
  body: [
    "An eval environment where the agent closes the books for a fictional SaaS company. It reads Stripe, Ramp, Rippling and Mercury data out of Postgres, posts double-entry journal entries only through stored procedures (posting is irreversible), and submits reconciliations. A multi-month Q1 scenario covers deferred revenue, accrual reversals and prepaid amortization.",
  ],
  mobileBody:
    "The agent closes the books for a fictional SaaS company: reads Stripe, Ramp, Rippling and Mercury data from Postgres, posts double-entry journal entries only through stored procedures (irreversible), and submits reconciliations. Q1 scenario with deferred revenue, accrual reversals and prepaid amortization.",
  tags: ["Postgres", "stored procs", "CPA baseline"],
  links: { repo: "https://github.com/SakethKoona/accounting-bench" },
  vignette: "accounting",
};

export default project;
