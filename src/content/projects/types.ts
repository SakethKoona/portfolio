import type { VignetteKey } from "@/components/vignettes";

/**
 * featured: the one project shown full width at the top of Work, with a diagram.
 * backend:  "Backend systems" rows, each with a diagram.
 * rl:       "RL environments and evals" rows, each with a diagram.
 * earlier:  "Trading and ML" text rows.
 * also:     one line each.
 */
export type Section = "featured" | "backend" | "rl" | "earlier" | "also";

export type Project = {
  slug: string;
  title: string;
  section: Section;
  /** Position within its section (1-based). */
  order: number;
  /** Featured only: the headline, split around the italic part. */
  headline?: { lead: string; em: string };
  status?: "wip" | "private" | "archived";
  /** Row paragraph. Wrap code in `backticks` to render it monospace. */
  body: string;
  /** Carousel and phone paragraph. Falls back to body. */
  summary?: string;
  /** Shown as a comma-separated line. */
  tags: string[];
  links: {
    live?: string;
    repo?: string;
    /** Internal route to a long-form case study. */
    caseStudy?: string;
  };
  vignette?: VignetteKey;
  /** Small label beside the title, e.g. "Hackalytics 2025". */
  meta?: string;
  /** One-line description for the "Smaller" list. */
  note?: string;
};
