import type { Project } from "./types";

const project: Project = {
  slug: "catan-rl",
  title: "Catan RL",
  section: "more",
  order: 4,
  status: "private",
  body: "Trains an open-source LLM (Qwen2.5-7B or Llama-3.1-8B) to play 4-player Catan with GRPO and LoRA. Reward comes only from the game engine: no human labels, no reward model. A PettingZoo wrapper around catanatron, text board observations, and JSON actions with 3 retries before a random fallback.",
  summary:
    "Trains Qwen2.5-7B or Llama-3.1-8B to play 4-player Catan with GRPO and LoRA. Reward comes only from the game engine, through a PettingZoo wrapper around catanatron.",
  tags: ["PettingZoo", "catanatron", "GRPO", "LoRA"],
  links: {},
  vignette: "catan",
};

export default project;
