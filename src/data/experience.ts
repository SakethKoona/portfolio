// Work and research history, from the CV. Grouped on the page as "Software engineering" then "Research".
export type Experience = {
  org: string;
  role: string;
  group: "swe" | "research";
  start: string; // "2026-07"
  end: string | null; // null = present
  summary: string;
  /** Shorter text for phones. Falls back to summary. */
  summaryShort?: string;
};

export const experience: Experience[] = [
  {
    org: "Transpira Labs",
    role: "Software engineer intern",
    group: "swe",
    start: "2026-07",
    end: null,
    summary:
      "Core GTM platform with an in-browser WebRTC softphone and webhook pipelines. An AI quoting engine over Gmail, WhatsApp, Twilio and SMS. RLVR environments and deterministic verifiers for GDPVal and AccountingBench.",
    summaryShort:
      "WebRTC softphone and webhook pipelines for the GTM platform, an AI quoting engine over Gmail, WhatsApp, Twilio and SMS, and RLVR environments with deterministic verifiers.",
  },
  {
    org: "NVIDIA NeMo-RL",
    role: "Open source contributor",
    group: "swe",
    start: "2026-06",
    end: null,
    summary: "800+ lines of unit and functional tests covering untested CLI entry points for checkpoint converters.",
    summaryShort: "800+ lines of tests for untested checkpoint-converter CLI entry points.",
  },
  {
    org: "Joint Finance Data Committee",
    role: "Lead data chair, Georgia Tech",
    group: "swe",
    start: "2025-04",
    end: "2025-12",
    summary:
      "Led 15 people on the data systems behind 450+ student organizations. Postgres on AWS RDS for $25M a year in transactions, Airflow ETL for 12k a month, and XGBoost auditing that saved $13K.",
    summaryShort:
      "Led 15 people. Postgres on AWS RDS for $25M a year, Airflow ETL for 12k transactions a month, XGBoost auditing that saved $13K.",
  },
  {
    org: "AI-Based Innovation and Discovery Lab, Georgia Tech",
    role: "Lead machine learning engineer",
    group: "research",
    start: "2024-08",
    end: null,
    summary:
      "A custom MDP and RL environment for portfolio optimization with masked actions and action-to-weight mappings. A DDQN trained in PyTorch over 10,000+ episodes on risk-adjusted rewards reached a 12.6% average cumulative return and a Sharpe ratio of 1.4 in backtests. LLMs fine-tuned on 100+ trading books with LangChain and Ollama (ROUGE-1 0.68, BLEU 0.53).",
    summaryShort:
      "An RL environment for portfolio optimization and a DDQN trained over 10,000+ episodes: 12.6% average cumulative return, Sharpe 1.4 in backtests. LLMs fine-tuned on 100+ trading books with LangChain and Ollama.",
  },
  {
    org: "SIPLab, Georgia Tech",
    role: "Machine learning researcher",
    group: "research",
    start: "2025-01",
    end: "2026-05",
    summary:
      "State-space models in PyTorch for latent brain dynamics across 256 channels, GRU networks simulating opsin behavior at 2% reconstruction error, a seeded synthetic-data pipeline with 95% eigenvalue recovery, and GPU experiments on H200 clusters with Snakemake and SLURM.",
    summaryShort:
      "State-space models in PyTorch across 256 neural channels, GRU networks at 2% reconstruction error, GPU experiments on H200 clusters.",
  },
  {
    org: "Madabhushi Lab, Emory University",
    role: "Computer vision engineer",
    group: "research",
    start: "2024-08",
    end: "2025-01",
    summary:
      "Segmentation models that separate blood vessels from noise in OCTA retinal scans. Preprocessing and augmentation over 150+ scans with OpenCV and NumPy, and nn-UNet and OCTA-Net architectures reaching 97.6% accuracy on the initial training set.",
    summaryShort:
      "Segmentation models separating blood vessels from noise in OCTA retinal scans; nn-UNet and OCTA-Net at 97.6% accuracy on the initial training set.",
  },
];

export const education = {
  school: "Georgia Tech",
  degree: "BS in Industrial Engineering",
  when: "May 2026",
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function monthName(ym: string) {
  const [, m] = ym.split("-").map(Number);
  return months[m - 1];
}

/** "July 2026 to now", "April to December 2025", "January 2025 to May 2026". */
export function formatRange(start: string, end: string | null) {
  const [sy] = start.split("-");
  if (!end) return `${monthName(start)} ${sy} to now`;
  const [ey] = end.split("-");
  if (sy === ey) return `${monthName(start)} to ${monthName(end)} ${ey}`;
  return `${monthName(start)} ${sy} to ${monthName(end)} ${ey}`;
}
