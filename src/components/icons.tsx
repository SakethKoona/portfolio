import type { AreaIcon } from "@/data/site";

const stroke = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Diagonal arrow used inside the pill buttons. */
export function ArrowUpRight({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" strokeWidth="1.6" aria-hidden="true" {...stroke}>
      <path d="M2.5 9.5 9.5 2.5M4 2.5h5.5V8" />
    </svg>
  );
}

export function ArrowRight({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" strokeWidth="1.4" aria-hidden="true" {...stroke}>
      <path d="M2 7h10M8 3l4 4-4 4" />
    </svg>
  );
}

export function ArrowLeft({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" strokeWidth="1.4" aria-hidden="true" {...stroke}>
      <path d="M12 7H2M6 3 2 7l4 4" />
    </svg>
  );
}

export function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" strokeWidth="1.4" aria-hidden="true" {...stroke}>
      {open ? (
        <>
          <line x1="4" y1="4" x2="14" y2="14" />
          <line x1="14" y1="4" x2="4" y2="14" />
        </>
      ) : (
        <>
          <line x1="2" y1="6" x2="16" y2="6" />
          <line x1="2" y1="12" x2="16" y2="12" />
        </>
      )}
    </svg>
  );
}

export function AreaGlyph({ name }: { name: AreaIcon }) {
  const props = { width: 18, height: 18, viewBox: "0 0 18 18", strokeWidth: "1.3", "aria-hidden": true, ...stroke } as const;
  switch (name) {
    case "graph":
      return (
        <svg {...props}>
          <circle cx="4" cy="9" r="2" />
          <circle cx="14" cy="4.5" r="2" />
          <circle cx="14" cy="13.5" r="2" />
          <path d="M6 8.2l6-2.9M6 9.8l6 2.9" />
        </svg>
      );
    case "ladder":
      return (
        <svg {...props}>
          <path d="M3 4h9M3 7h7M3 11h12M3 14h6" />
        </svg>
      );
    case "blocks":
      return (
        <svg {...props}>
          <rect x="2.5" y="2.5" width="5.5" height="5.5" rx="1" />
          <rect x="10" y="2.5" width="5.5" height="5.5" rx="1" />
          <rect x="2.5" y="10" width="5.5" height="5.5" rx="1" />
          <rect x="10" y="10" width="5.5" height="5.5" rx="1" />
        </svg>
      );
    case "check":
      return (
        <svg {...props}>
          <circle cx="9" cy="9" r="6.5" />
          <path d="m6 9 2 2 4-4.5" />
        </svg>
      );
  }
}
