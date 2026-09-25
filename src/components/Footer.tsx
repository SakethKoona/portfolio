import Link from "next/link";
import { projectsIn } from "@/content/projects";
import { site } from "@/data/site";

const pages = [
  { label: "Work", href: "/#work" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const listed = [...projectsIn("featured"), ...projectsIn("backend"), ...projectsIn("rl")]
    .filter((p) => p.links.repo || p.links.live)
    .slice(0, 4);
  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div className="foot-about">
          <span className="wordmark">{site.name}</span>
          <p className="p foot-blurb">{site.blurb}</p>
          <span className="small foot-year">© {year}</span>
        </div>
        <div className="foot-col">
          <span className="foot-head">Pages</span>
          {pages.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div className="foot-col">
          <span className="foot-head">Projects</span>
          {listed.map((p) => (
            <a key={p.slug} href={p.links.live ?? p.links.repo}>
              {p.title === "Distributed Image Processing Engine" ? "Image engine" : p.title}
            </a>
          ))}
        </div>
        <div className="foot-col">
          <span className="foot-head">Elsewhere</span>
          <a href={site.github}>GitHub</a>
          {site.linkedin && <a href={site.linkedin}>LinkedIn</a>}
          {site.resume && (
            <a href={site.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
          )}
        </div>
      </div>
      <div className="wrap foot-mobile mob">
        <div className="foot-links">
          {pages.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <span className="small">
          © {year} {site.name}
        </span>
      </div>
    </footer>
  );
}

export function CaseFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="foot">
      <div className="wrap foot-case">
        <Link href="/#work" className="arrow-link">
          Back to all work
        </Link>
        <span className="small">
          © {year} {site.name}
        </span>
        <div className="foot-links">
          {pages.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
