// Design-decision pull quotes. Listed in phone order; `column` places them in the desktop masonry.
export type Note = { quote: string; from: string; column: 1 | 2 | 3 };

export const notes: Note[] = [
  { quote: "Postgres is the queue. Scaling out means starting another worker — no clustering required.", from: "Bench", column: 1 },
  { quote: "N independent trials beat N copies of each task: that's what 'is this model consistent?' actually asks.", from: "Bench", column: 2 },
  { quote: "Shell-escape untrusted dataset input. It's the only thing between a benchmark and an injection.", from: "Bench", column: 3 },
  { quote: "Presigned URLs keep gigabytes of images off my API server.", from: "Dataset Processor", column: 1 },
  { quote: "Posting is irreversible — so the agent should be too careful, not too clever.", from: "AccountingBench", column: 2 },
  { quote: "No LLM judges: every answer is graded against ground truth computed at build time.", from: "GhidraEnv", column: 3 },
  { quote: "A 77% fallback rate is a baseline, not a failure.", from: "Catan RL", column: 1 },
];
