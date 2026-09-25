import type { Project } from "./types";

const project: Project = {
  slug: "catan-rl",
  title: "Catan RL",
  section: "evals",
  order: 4,
  eyebrow: "RL · GRPO + LoRA",
  status: "private",
  body: [
    "Trains an open-source LLM (Qwen2.5-7B / Llama-3.1-8B) to play 4-player Catan with GRPO + LoRA. Reward comes only from the game engine: no human labels, no reward model. A PettingZoo wrapper around catanatron, text board observations, and `<think>/<action>` JSON output with 3 retries before a random fallback. The KL reference is the same model with LoRA disabled in place.",
  ],
  mobileBody:
    "Trains Qwen2.5-7B / Llama-3.1-8B to play 4-player Catan with GRPO + LoRA. Reward comes only from the game engine (PettingZoo over catanatron): no human labels, no reward model. `<think>/<action>` JSON output, 3 retries, then a random fallback. KL reference: LoRA disabled in place, β = 0.04.",
  tags: ["PettingZoo", "catanatron", "β = 0.04"],
  links: {},
  vignette: "catan",
};

export default project;
