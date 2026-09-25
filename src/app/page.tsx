import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Fireflies } from "@/components/Fireflies";
import { ExperienceGroup } from "@/components/Experience";
import { FeaturedRow, WorkRow } from "@/components/Work";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { getProject, projectsIn } from "@/content/projects";
import { education, experience } from "@/data/experience";
import { site } from "@/data/site";

// Which projects stand out on the home page, after the featured one.
const standout = ["elixirbenchmarker", "distributed-dataset-processor"];

export default function Home() {
  const featured = projectsIn("featured");
  const picks = standout.map(getProject);
  const current = experience.filter((e) => e.end === null);
  const now = current.find((e) => e.group === "swe") ?? current[0];

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <Fireflies />
          <Nav />
          <div className="wrap hero-inner">
            <div className="hero-text">
              <span className="small enter" style={{ animationDelay: "60ms" }}>
                {site.role}
              </span>
              <h1 className="hero-title enter" style={{ animationDelay: "140ms" }}>
                {site.headline.lead}
                <br className="desk" /> <span className="em accent">{site.headline.em}</span>
              </h1>
              <p className="p hero-lede enter desk" style={{ animationDelay: "260ms" }}>
                {site.intro}
              </p>
              <p className="p hero-lede enter mob" style={{ animationDelay: "260ms" }}>
                {site.introShort}
              </p>
              <a href="#work" className="pill enter" style={{ animationDelay: "360ms" }}>
                See the work
                <span className="arr">
                  <ArrowUpRight />
                </span>
              </a>
            </div>
          </div>
          <div className="scroll-hint">
            <span className="scroll-line" />
            <span className="small">Scroll</span>
          </div>
        </section>

        {/* IN BRIEF */}
        <section id="about" className="wrap brief">
          <div className="brief-text">
            <p className="p brief-lede">{site.about}</p>
            <Link href="/about" className="arrow-link self-start">
              More about me <ArrowRight />
            </Link>
          </div>
          <dl className="brief-facts">
            <div className="fact">
              <dt className="small">Now</dt>
              <dd>
                {now.org}
                <span className="fact-sub">{now.role}</span>
              </dd>
            </div>
            <div className="fact">
              <dt className="small">Studied</dt>
              <dd>
                {education.school}
                <span className="fact-sub">
                  {education.degree}, {education.when}
                </span>
              </dd>
            </div>
            <div className="fact">
              <dt className="small">Recognition</dt>
              <dd>
                {site.recognition.split(", ")[0]}
                <span className="fact-sub">{site.recognition.split(", ").slice(1).join(", ")}</span>
              </dd>
            </div>
          </dl>
        </section>

        {/* SELECTED WORK */}
        <section id="work" className="wrap workspace">
          <div className="section-head">
            <h2 className="h2">Selected work</h2>
            <Link href="/work" className="arrow-link desk">
              All work <ArrowRight />
            </Link>
          </div>
          {featured.map((p) => (
            <FeaturedRow key={p.slug} p={p} />
          ))}
          <div className="work-list">
            {picks.map((p) => (
              <WorkRow key={p.slug} p={p} />
            ))}
          </div>
          <Link href="/work" className="arrow-link self-start see-all">
            All work, grouped by area <ArrowRight />
          </Link>
        </section>

        {/* NOW */}
        <section id="experience" className="wrap two-col exp">
          <div className="two-col-lead">
            <h2 className="h2">Now</h2>
            <p className="p lead-note">Current roles. The full history, with research, is on its own page.</p>
            <Link href="/experience" className="arrow-link self-start">
              Full experience <ArrowRight />
            </Link>
          </div>
          <div className="exp-list">
            <ExperienceGroup items={current} first />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="cta">
          <div className="wrap cta-inner">
            <span className="small">Contact</span>
            <h2 className="h2 cta-title">{site.contactTitle}</h2>
            <a href={`mailto:${site.email}`} className="pill">
              {site.email}
              <span className="arr">
                <ArrowUpRight />
              </span>
            </a>
            <div className="cta-links mob">
              <a href={site.github} className="link">
                GitHub
              </a>
              {site.linkedin && (
                <a href={site.linkedin} className="link">
                  LinkedIn
                </a>
              )}
              {site.resume && (
                <a href={site.resume} className="link" target="_blank" rel="noreferrer">
                  Résumé
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
