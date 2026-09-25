"use client";

import Link from "next/link";
import { useState } from "react";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav({ variant = "home" }: { variant?: "home" | "case" }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="nav wrap" aria-label="Primary">
      <Link href="/" className="brand serif">
        <span className="dot dot-accent" />
        {site.shortName}
      </Link>
      <div className="nav-links">
        {links.map((l) => (
          <Link key={l.label} href={l.href} className={variant === "case" && l.label === "Work" ? "is-current" : undefined}>
            {l.label}
          </Link>
        ))}
      </div>
      <div className="nav-actions">
        {variant === "case" ? (
          <Link href="/#work" className="pill pill-light pill-sm">
            ← All work
          </Link>
        ) : (
          <Link href="/#contact" className="pill pill-light pill-sm">
            Say hi
          </Link>
        )}
        {site.resume && (
          <a href={site.resume} className="pill pill-dark pill-sm" target="_blank" rel="noreferrer">
            Résumé <span className="mono pill-meta">[PDF]</span>
          </a>
        )}
      </div>
      <div className="nav-mobile">
        {site.resume && (
          <a href={site.resume} className="pill pill-dark pill-xs" target="_blank" rel="noreferrer">
            Résumé
          </a>
        )}
        <button
          type="button"
          className="menu-btn"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#1F1E22" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <line x1="4" y1="4" x2="14" y2="14" />
                <line x1="14" y1="4" x2="4" y2="14" />
              </>
            ) : (
              <>
                <line x1="2" y1="5" x2="16" y2="5" />
                <line x1="2" y1="9" x2="16" y2="9" />
                <line x1="2" y1="13" x2="16" y2="13" />
              </>
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div id="mobile-menu" className="mobile-menu">
          {links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
