import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Fireflies } from "@/components/Fireflies";
import { RichText } from "@/components/RichText";
import { Vignette } from "@/components/vignettes";
import { AreaGlyph, ArrowRight, ArrowUpRight } from "@/components/icons";
import { projectsIn, type Project } from "@/content/projects";
import { education, experience, formatRange, type Experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { groups, site } from "@/data/site";

function ProjectLinks({ p }: { p: Project }) {
  const { links } = p;
  if (p.status === "private") return <span className="small">Write-up available on request</span>;
  return (
    <div className="row-links">
      {links.caseStudy && (
        <Link href={links.caseStudy} className="arrow-link">
          Case study <ArrowRight />
        </Link>
      )}
      {links.live && (
        <a href={links.live} className="arrow-link">
          {p.slug === "build" ? "Open the live app" : "Live"} <ArrowRight />
        </a>
      )}
      {links.repo && (
        <a href={links.repo} className="arrow-link">
          Repository <ArrowRight />
        </a>
      )}
    </div>
  );
}

// A project row: text on the left, its diagram on the right. Phones stack: title, text, diagram, tags, links.
function WorkRow({ p }: { p: Project }) {
  return (
    <article className="work">
      <div className="work-text">
        <div className="work-head">
          <h3 className="h3">{p.title}</h3>
          {p.status === "private" && <span className="st">private</span>}
        </div>
        <p className="p work-body desk">
          <RichText text={p.body} />
        </p>
        <p className="p work-body mob">
          <RichText text={p.summary ?? p.body} />
        </p>
        <span className="tags work-tags">
          {p.tags.join(", ")}
          {p.status === "private" && ". Write-up on request."}
        </span>
        <div className="work-links">
          <ProjectLinks p={p} />
        </div>
      </div>
      {p.vignette && (
        <div className="work-art">
          <Vignette name={p.vignette} />
        </div>
      )}
    </article>
  );
}

// The one project shown full width at the top of Work.
function FeaturedRow({ p }: { p: Project }) {
  return (
    <article className="featured">
      <div className="featured-text">
        {p.meta && <span className="st st-ok self-start">{p.meta}</span>}
        <h3 className="h2 featured-title">
          {p.headline?.lead} <span className="em accent">{p.headline?.em}</span>
        </h3>
        <p className="p featured-body desk">{p.body}</p>
        <p className="p featured-body mob">{p.summary ?? p.body}</p>
        <span className="tags">{p.tags.join(", ")}</span>
        <div className="featured-links">
          <ProjectLinks p={p} />
        </div>
      </div>
      {p.vignette && (
        <div className="featured-art">
          <Vignette name={p.vignette} />
        </div>
      )}
    </article>
  );
}

function EarlierRow({ p }: { p: Project }) {
  return (
    <div className="earlier-row">
      <span className="earlier-name">
        {p.title}
        {p.meta && <span className="small"> {p.meta}</span>}
      </span>
      <p className="p earlier-body desk">{p.body}</p>
      <p className="p earlier-body mob">{p.summary ?? p.body}</p>
      <span className="tags earlier-tags">{p.tags.join(", ")}</span>
    </div>
  );
}

function ExperienceRow({ e }: { e: Experience }) {
  return (
    <div className="exp-row">
      <span className="small exp-when">{formatRange(e.start, e.end)}</span>
      <div className="exp-what">
        <div className="exp-org">
          {e.org} <span className="small exp-role">{e.role}</span>
        </div>
        <p className="p exp-summary desk">{e.summary}</p>
        <p className="p exp-summary mob">{e.summaryShort ?? e.summary}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const featured = projectsIn("featured");
  const also = projectsIn("also");
  const swe = experience.filter((e) => e.group === "swe");
  const research = experience.filter((e) => e.group === "research");
  const now = swe[0];

  return (
    <>
      <main>
        {/* HERO */}
        <section className="hero" id="top">
          <Image src={site.heroImage} alt="" fill priority sizes="100vw" className="hero-img" />
          <div className="hero-fade-x" />
          <div className="hero-fade-y" />
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

        {/* IN BRIEF: who, before any project */}
        <section id="about" className="wrap brief">
          <div className="brief-text">
            <p className="p brief-lede">{site.about}</p>
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

        {/* WORK */}
        <section id="work" className="wrap workspace">
          <div className="section-head">
            <h2 className="h2">Work</h2>
            <span className="small desk">Private projects have a write-up on request</span>
          </div>

          {featured.map((p) => (
            <FeaturedRow key={p.slug} p={p} />
          ))}

          {groups.map((g) => {
            const items = projectsIn(g.section);
            if (items.length === 0) return null;
            return (
              <div key={g.section} className="group">
                <div className="group-head">
                  <span className="icon">
                    <AreaGlyph name={g.icon} />
                  </span>
                  <div className="group-head-text">
                    <h3 className="group-title">{g.title}</h3>
                    <p className="p group-body">{g.body}</p>
                  </div>
                </div>
                {g.section === "earlier" ? (
                  <div className="earlier-list">
                    {items.map((p) => (
                      <EarlierRow key={p.slug} p={p} />
                    ))}
                  </div>
                ) : (
                  <div className="work-list">
                    {items.map((p) => (
                      <WorkRow key={p.slug} p={p} />
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {also.length > 0 && (
            <div className="smaller">
              <span className="small">Smaller</span>
              <div className="smaller-links">
                {also.map((p) =>
                  p.links.repo ? (
                    <a key={p.slug} href={p.links.repo} className="tags smaller-link">
                      {p.title}, {p.note}
                    </a>
                  ) : (
                    <span key={p.slug} className="tags">
                      {p.title}, {p.note}
                    </span>
                  ),
                )}
              </div>
            </div>
          )}
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="wrap two-col exp">
          <div className="two-col-lead">
            <h2 className="h2">Experience</h2>
            <p className="p lead-note">
              {education.school}, {education.degree}, {education.when}.
              <span className="desk"> Software engineering roles first, then research.</span>
            </p>
            {site.cv && (
              <a href={site.cv} className="arrow-link self-start" target="_blank" rel="noreferrer">
                Full CV as PDF
              </a>
            )}
          </div>
          <div className="exp-list">
            <span className="group-label">Software engineering</span>
            <div className="exp-group">
              {swe.map((e) => (
                <ExperienceRow key={e.org + e.start} e={e} />
              ))}
            </div>
            <span className="group-label group-label-2">Research</span>
            <div className="exp-group">
              {research.map((e) => (
                <ExperienceRow key={e.org + e.start} e={e} />
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="wrap two-col">
          <div className="two-col-lead">
            <h2 className="h2">Skills</h2>
            <p className="p lead-note">Everything here appears somewhere in the work above.</p>
          </div>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.name} className="skill">
                <h3>{s.name}</h3>
                <p>{s.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="cta">
          <div className="wrap cta-inner">
            <span className="small">Contact</span>
            <h2 className="h2 cta-title">
              {site.contactLine.lead} <span className="em accent">{site.contactLine.em}</span> {site.contactLine.tail}
            </h2>
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
