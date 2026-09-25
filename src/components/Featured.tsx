"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/projects";
import { ArrowLeft, ArrowRight } from "./icons";
import { Vignette } from "./vignettes";

// The featured carousel: text for the current project on the left, its diagram on the right.
// Phones hide the controls and show the first project only; the others appear as rows further down.
export function Featured({ items }: { items: Project[] }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const p = items[i];
  const pad = (k: number) => String(k).padStart(2, "0");
  const primary = p.links.live
    ? { href: p.links.live, label: "Open the live app" }
    : p.links.repo
      ? { href: p.links.repo, label: "Repository" }
      : null;

  return (
    <section id="work" className="wrap featured">
      <div className="featured-text">
        <span className="small">Featured project</span>
        <h2 className="h2 featured-title">
          {p.headline?.lead} <span className="em accent">{p.headline?.em}</span>
        </h2>
        <p className="p featured-body">{p.summary ?? p.body}</p>
        <div className="featured-links">
          {p.links.caseStudy && (
            <Link href={p.links.caseStudy} className="arrow-link">
              Case study <ArrowRight />
            </Link>
          )}
          {primary && (
            <a href={primary.href} className="arrow-link">
              {primary.label} <ArrowRight />
            </a>
          )}
        </div>
        <div className="featured-controls">
          <button type="button" className="round" aria-label="Previous project" onClick={() => setI((i + n - 1) % n)}>
            <ArrowLeft />
          </button>
          <button type="button" className="round" aria-label="Next project" onClick={() => setI((i + 1) % n)}>
            <ArrowRight />
          </button>
          <span className="small featured-count">
            <span className="on">{pad(i + 1)}</span> / {pad(n)}
          </span>
        </div>
      </div>
      <div className="featured-art">
        {items.map((it, k) => (
          <div key={it.slug} className={`slide${k === i ? " is-active" : ""}`} aria-hidden={k !== i}>
            {it.vignette && <Vignette name={it.vignette} />}
          </div>
        ))}
      </div>
    </section>
  );
}
