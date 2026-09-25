import { Fragment, type CSSProperties } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AlsoStrip, EvalCard, FeaturedCard } from "@/components/ProjectCards";
import { projectsIn } from "@/content/projects";
import { site } from "@/data/site";
import { experience } from "@/data/experience";

const headline = [
  ["I build", "#1F1E22"],
  ["distributed", "#1F1E22"],
  ["backends", "#2A292E"],
  ["and", "#38373C"],
  ["evaluation", "#46454A"],
  ["environments", "#55535A"],
  ["for", "#64626A"],
  ["AI", "#726F77"],
  ["agents.", "#8A888D"],
];

function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, 1)).toLocaleString("en-US", { month: "short", year: "numeric", timeZone: "UTC" });
}

function Band({ mobile }: { mobile?: boolean }) {
  if (mobile)
    return (
      <svg viewBox="0 0 350 160" preserveAspectRatio="none" role="img" aria-label="Abstract layered horizon in warm sand, terracotta and slate" className="band-svg mob">
        <rect width="350" height="160" fill="#EDE6DA" />
        <path d="M0 96 C 60 80, 110 116, 170 92 S 280 70, 350 96 L350 160 L0 160 Z" fill="#D9C9B4" />
        <path d="M0 122 C 80 100, 150 134, 220 116 S 310 100, 350 126 L350 160 L0 160 Z" fill="#C89A80" />
        <path d="M0 144 C 90 130, 190 154, 260 140 S 330 134, 350 146 L350 160 L0 160 Z" fill="#8C5A44" />
        <circle cx="290" cy="44" r="20" fill="#B84A26" opacity="0.85" />
      </svg>
    );
  return (
    <svg viewBox="0 0 1280 240" preserveAspectRatio="none" role="img" aria-label="Abstract layered horizon in warm sand, terracotta and slate" className="band-svg desk">
      <rect width="1280" height="240" fill="#EDE6DA" />
      <path d="M0 150 C 200 110, 380 190, 600 140 S 1000 100, 1280 150 L1280 240 L0 240 Z" fill="#D9C9B4" />
      <path d="M0 185 C 260 150, 520 205, 760 175 S 1120 150, 1280 190 L1280 240 L0 240 Z" fill="#C89A80" />
      <path d="M0 215 C 300 195, 640 232, 900 210 S 1180 200, 1280 220 L1280 240 L0 240 Z" fill="#8C5A44" />
      <circle cx="1040" cy="72" r="34" fill="#B84A26" opacity="0.85" />
      <g stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="1">
        <line x1="0" y1="60" x2="1280" y2="60" />
        <line x1="0" y1="96" x2="1280" y2="96" />
      </g>
    </svg>
  );
}

export default function Home() {
  const featured = projectsIn("featured");
  const evals = projectsIn("evals");
  const also = projectsIn("also");
  const whereabouts = [site.city, site.timeZone].filter(Boolean).join(" · ");

  return (
    <>
      <Nav />
      <main>
        {/* HERO */}
        <section id="top" className="wrap hero">
          <div className="hero-main">
            <div className="eyebrow eyebrow-dot">
              <span className="dot dot-accent" />
              <span className="desk-inline">{site.focus}</span>
              <span className="mob-inline">{site.focusShort}</span>
            </div>
            <h1 className="serif hero-title">
              {headline.map(([word, color], i) => (
                <Fragment key={word}>
                  <span className="hero-word" style={{ color, "--i": i } as CSSProperties}>
                    {word}
                  </span>
                  {i < headline.length - 1 && " "}
                </Fragment>
              ))}
            </h1>
            <p className="p hero-lede enter" style={{ "--d": "520ms" } as CSSProperties}>
              Most of my work is in Rust, Elixir and C++: job queues, worker pools, Kafka pipelines and a matching engine. I
              also build the benchmarks and RL environments used to test and train agents.
            </p>
            <div className="hero-actions enter" style={{ "--d": "620ms" } as CSSProperties}>
              <a href="#work" className="pill pill-dark">
                See the work
              </a>
              <a href={`mailto:${site.email}`} className="pill pill-light">
                {site.email}
              </a>
              <a href={site.github} className="pill pill-ghost desk-flex">
                GitHub ↗
              </a>
            </div>
            <div className="mono hero-status enter" style={{ "--d": "720ms" } as CSSProperties}>
              <span className="dot dot-live" />
              <span>
                currently: {site.currently}
                {whereabouts && ` · ${whereabouts}`}
              </span>
            </div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work" className="wrap section section-work">
          <div className="section-head">
            <div className="section-head-text">
              <div className="eyebrow">Selected work</div>
              <h2 className="serif h2">Backend systems</h2>
            </div>
          </div>
          {featured.map((p) => (
            <FeaturedCard key={p.slug} project={p} />
          ))}
        </section>

        {/* EVALS */}
        <section className="wrap section section-evals">
          <div className="section-head">
            <div className="section-head-text">
              <div className="eyebrow">Evals &amp; environments</div>
              <h2 className="serif h2">Agent evals and RL environments</h2>
            </div>
          </div>
          <div className="eval-grid">
            {evals.map((p) => (
              <EvalCard key={p.slug} project={p} />
            ))}
          </div>
          <AlsoStrip projects={also} />
        </section>

        {/* EXPERIENCE (only when filled in) */}
        {experience.length > 0 && (
          <section id="experience" className="wrap section section-exp">
            <div className="section-head">
              <div className="section-head-text">
                <div className="eyebrow">Experience</div>
                <h2 className="serif h2">Experience</h2>
              </div>
            </div>
            <ol className="card timeline">
              {experience.map((e) => (
                <li key={`${e.org}-${e.start}`} className={`tl-item${e.end ? "" : " is-current"}`}>
                  <span className="tl-dot" aria-hidden="true" />
                  <div className="mono tl-when">
                    {formatMonth(e.start)} to {e.end ? formatMonth(e.end) : "present"}
                  </div>
                  <div className="tl-what">
                    <h3 className="serif tl-org">{e.org}</h3>
                    <div className="tl-role">
                      {e.role}
                      {e.location && <span className="tl-loc"> · {e.location}</span>}
                    </div>
                    {e.summary && <p className="p p-15">{e.summary}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* BAND */}
        <section className="wrap section-band">
          <div className="band">
            <Band />
            <Band mobile />
          </div>
        </section>

        {/* ABOUT + CONTACT */}
        <section id="about" className="wrap section-about">
          <div className="card about spot">
            <div className="eyebrow">About</div>
            <h2 className="serif h2 about-title">Hi, I&apos;m Saketh.</h2>
            <p className="p about-p">
              I work on two things: distributed, concurrent backend systems in Rust, Elixir and C++, and evaluation and RL
              environments for AI agents. On the backend side that means queues, workers and process supervision. On the
              eval side it means harnesses, graders and reward functions that produce a score you can check.
            </p>
            <p className="p about-p">
              {site.affiliation && `I'm currently at ${site.affiliation}. `}I&apos;m open to conversations about backend
              infrastructure and agent evaluation.
            </p>
          </div>
          <div id="contact" className="card contact">
            <div className="eyebrow eyebrow-dark">Contact</div>
            <h2 className="serif contact-title">Get in touch</h2>
            <div className="contact-rows">
              <a href={`mailto:${site.email}`} className="contact-row">
                <span className="mono contact-k">EMAIL</span>
                <span>{site.email}</span>
              </a>
              <a href={site.github} className="contact-row">
                <span className="mono contact-k">GITHUB</span>
                <span>
                  <span className="desk-inline">github.com/</span>
                  {site.githubHandle} ↗
                </span>
              </a>
              {site.linkedin && (
                <a href={site.linkedin} className="contact-row">
                  <span className="mono contact-k">LINKEDIN</span>
                  <span>{site.linkedin.replace(/^https?:\/\/(www\.)?/, "")} ↗</span>
                </a>
              )}
              {site.resume && (
                <a href={site.resume} className="contact-row" target="_blank" rel="noreferrer">
                  <span className="mono contact-k">RÉSUMÉ</span>
                  <span>PDF ↗</span>
                </a>
              )}
            </div>
            {site.timeZone && (
              <div className="mono contact-foot">
                <span className="dot" style={{ width: 7, height: 7, background: "#5FBF86" }} />
                {site.timeZone}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
