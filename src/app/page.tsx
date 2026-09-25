import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AlsoStrip, EvalCard, FeaturedCard } from "@/components/ProjectCards";
import { projectsIn } from "@/content/projects";
import { notes } from "@/content/notes";
import { site } from "@/data/site";
import { experience } from "@/data/experience";

const headline = [
  ["I build", "#1F1E22"],
  ["systems", "#1F1E22"],
  ["that", "#2A292E"],
  ["stay", "#38373C"],
  ["up", "#46454A"],
  ["when", "#55535A"],
  ["the", "#64626A"],
  ["work", "#726F77"],
  ["gets", "#7E7C83"],
  ["heavy.", "#8A888D"],
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
  const columns = [1, 2, 3] as const;
  const pad = (n: number) => String(n).padStart(2, "0");

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
                <span key={word} style={{ color }}>
                  {word}
                  {i < headline.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="p hero-lede">
              I&apos;m Saketh. I write distributed, concurrent backends in Rust and Elixir, and I build the evaluation and RL
              environments that tell us whether an AI agent actually did the job.
            </p>
            <div className="hero-actions">
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
            <div className="mono hero-status">
              <span className="dot dot-live" />
              <span>
                currently: {site.currently}
                {whereabouts && ` · ${whereabouts}`}
              </span>
            </div>
          </div>
          <div className="hero-margin">
            <p className="ital hero-margin-q">Most of these started as a question I couldn&apos;t answer with a log line.</p>
            <div className="mono hero-margin-by">— margin note, not a mission statement</div>
          </div>
        </section>

        {/* SELECTED WORK */}
        <section id="work" className="wrap section section-work">
          <div className="section-head">
            <div className="section-head-text">
              <div className="eyebrow">Selected work</div>
              <h2 className="serif h2">Three systems, in the order I&apos;d show them.</h2>
            </div>
            <div className="mono section-aside">
              {pad(1)} — {pad(featured.length)} · the rest lives below
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
              <h2 className="serif h2">Where the agent gets graded.</h2>
              <p className="ital section-sub mob">no LLM judges in any of these.</p>
            </div>
            <div className="ital section-aside-ital">no LLM judges in any of these — the ground truth is computed, not vibes.</div>
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
                <h2 className="serif h2">Where I&apos;ve done it.</h2>
              </div>
            </div>
            <div className="card exp-list">
              {experience.map((e) => (
                <div key={`${e.org}-${e.start}`} className="exp-row">
                  <div className="mono exp-when">
                    {formatMonth(e.start)} — {e.end ? formatMonth(e.end) : "present"}
                  </div>
                  <div className="exp-what">
                    <div className="exp-role">
                      <span className="serif exp-org">{e.org}</span> · {e.role}
                      {e.location && <span className="exp-loc"> · {e.location}</span>}
                    </div>
                    {e.summary && <p className="p p-15">{e.summary}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NOTES */}
        <section id="notes" className="wrap section section-notes">
          <div className="section-head">
            <div className="section-head-text">
              <div className="eyebrow">Notes · design decisions</div>
              <h2 className="serif h2">Things I&apos;d argue for again.</h2>
            </div>
            <div className="mono section-aside">pulled from the projects above</div>
          </div>
          <div className="notes-grid desk-grid">
            {columns.map((c) => (
              <div key={c} className="notes-col">
                {notes
                  .filter((n) => n.column === c)
                  .map((n) => (
                    <figure key={n.quote} className="note">
                      <blockquote className="note-q">&ldquo;{n.quote}&rdquo;</blockquote>
                      <figcaption className="note-by">— {n.from}</figcaption>
                    </figure>
                  ))}
                {c === 3 && (
                  <div className="note note-dark">
                    <p className="note-q ital">What would you add? I collect these. Send one and I&apos;ll credit you in the margin.</p>
                    <a href={`mailto:${site.email}`} className="note-by note-cta">
                      → {site.email}
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="notes-list mob-flex">
            {notes.map((n) => (
              <figure key={n.quote} className="note">
                <blockquote className="note-q">&ldquo;{n.quote}&rdquo;</blockquote>
                <figcaption className="note-by">— {n.from}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* BAND */}
        <section className="wrap section-band">
          <div className="band">
            <Band />
            <Band mobile />
            <div className="band-text">
              <div className="serif band-title">Somewhere between the queue and the socket.</div>
              <div className="mono band-sub">the part of the stack I like best</div>
            </div>
          </div>
        </section>

        {/* ABOUT + CONTACT */}
        <section id="about" className="wrap section-about">
          <div className="card about">
            <div className="eyebrow">About</div>
            <h2 className="serif h2 about-title">Hi, I&apos;m Saketh.</h2>
            <p className="p about-p">
              Two threads run through everything I build. The first is distributed, concurrent backend systems in Rust and
              Elixir: queues, workers, sockets, and the supervision that keeps them honest under load. The second is
              evaluation and RL environments for AI agents: the harnesses, graders and reward functions that turn &ldquo;it
              seems to work&rdquo; into a number you can argue with.
            </p>
            <p className="p about-p">
              I care about the seams: the shell escape nobody wrote, the process that never got reaped, the eval that
              quietly grades itself.
              {site.affiliation && ` Currently at ${site.affiliation}.`}
              <span className="desk-inline"> Open to conversations about backend infrastructure and agent evaluation.</span>
            </p>
            <div className="ital about-sig">If a system can&apos;t survive a worker dying at 2am, I don&apos;t consider it done.</div>
          </div>
          <div id="contact" className="card contact">
            <div className="eyebrow eyebrow-dark">Contact</div>
            <h2 className="serif contact-title">Let&apos;s talk shop.</h2>
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
            <div className="mono contact-foot">
              <span className="dot" style={{ width: 7, height: 7, background: "#5FBF86" }} />
              replies within a few days{site.timeZone && ` · ${site.timeZone}`}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
