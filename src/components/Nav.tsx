"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ArrowUpRight, MenuIcon } from "./icons";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// On the home page the nav sits over the hero photo; on other pages it sits on the dark ground.
export function Nav({ variant = "home" }: { variant?: "home" | "case" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <nav className={`nav nav-${variant}`} aria-label="Primary">
      <Link href="/" className="wordmark">
        {site.name}
      </Link>
      <div className="nav-links desk">
        {links.map((l) => (
          <Link key={l.label} href={l.href}>
            {l.label}
          </Link>
        ))}
      </div>
      <a href={`mailto:${site.email}`} className="pill pill-sm desk nav-cta">
        Get in touch
        <span className="arr">
          <ArrowUpRight size={12} />
        </span>
      </a>
      <button
        type="button"
        className="round menu-btn mob"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
      >
        <MenuIcon open={open} />
      </button>
      {open && (
        <div id="mobile-menu" className="menu">
          {links.map((l) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href={`mailto:${site.email}`} className="pill menu-cta">
            Get in touch
            <span className="arr">
              <ArrowUpRight />
            </span>
          </a>
        </div>
      )}
    </nav>
  );
}
