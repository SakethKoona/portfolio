import Link from "next/link";
import { site } from "@/data/site";
import { ExecutionState } from "./ExecutionState";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

function FooterLinks() {
  return (
    <div className="footer-links">
      {links.map((l) => (
        <Link key={l.label} href={l.href}>
          {l.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <div className="footer-row">
          <div className="mono footer-states">
            <ExecutionState />
            <span className="footer-states-note desk-inline">page progress</span>
          </div>
          <FooterLinks />
        </div>
        <div className="mono footer-row footer-legal">
          <span>
            © {year} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}

export function CaseFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer-case">
        <Link href="/#work" className="pill pill-light">
          ← Back to all work
        </Link>
        <div className="mono footer-case-legal">
          © {year} {site.name}
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
}
