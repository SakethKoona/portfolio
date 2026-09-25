import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Notes", href: "/#notes" },
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
            <span className="state">pending</span>
            <span className="arrow">→</span>
            <span className="state st-run">running</span>
            <span className="arrow">→</span>
            <span className="state st-ok">completed</span>
            <span className="footer-states-note desk-inline">this page&apos;s execution state</span>
          </div>
          <FooterLinks />
        </div>
        <div className="mono footer-row footer-legal">
          <span>
            © {year} {site.name} · no lorem ipsum was harmed
            <span className="desk-inline"> · every diagram above is a real code path</span>
          </span>
          <span className="ital footer-sig">supervised by one very patient GenServer</span>
        </div>
      </div>
    </footer>
  );
}

export function CaseFooter({ index, total }: { index: number; total: number }) {
  const year = new Date().getFullYear();
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <footer className="footer">
      <div className="wrap footer-case">
        <Link href="/#work" className="pill pill-light">
          ← Back to all work
        </Link>
        <div className="mono footer-case-legal">
          © {year} {site.name} · case study {pad(index)} of {pad(total)} ·{" "}
          <span className="ital footer-sig">supervised by one very patient GenServer</span>
        </div>
        <FooterLinks />
      </div>
    </footer>
  );
}
