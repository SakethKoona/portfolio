// Work and school history. The Experience section only renders when this list is non-empty.
export type Experience = {
  org: string;
  role: string;
  start: string; // e.g. "2025-06"
  end: string | null; // null = present
  location?: string;
  summary?: string;
};

export const experience: Experience[] = [];
