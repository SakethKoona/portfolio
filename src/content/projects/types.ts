import type { VignetteKey } from "@/components/vignettes";

export type Section = "featured" | "evals" | "also";

export type Project = {
  slug: string;
  title: string;
  section: Section;
  /** Position within its section (1-based). */
  order: number;
  /** Short category line above the title. */
  eyebrow: string;
  status?: "wip" | "private" | "archived";
  /** Desktop paragraphs. Wrap code in `backticks` to render it monospace. */
  body: string[];
  /** Condensed single paragraph for phones. Falls back to body. */
  mobileBody?: string;
  tags: string[];
  mobileTags?: string[];
  links: {
    live?: string;
    repo?: string;
    /** Internal route to a long-form case study. */
    caseStudy?: string;
  };
  /** Small mono note beside the links. */
  linkNote?: string;
  mobileLinkNote?: string;
  vignette?: VignetteKey;
  /** One-line description for the "Also" strip. */
  note?: string;
};
