import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Featured } from "@/components/Featured";
import { Fireflies } from "@/components/Fireflies";
import { RichText } from "@/components/RichText";
import { Vignette } from "@/components/vignettes";
import { AreaGlyph, ArrowRight, ArrowUpRight } from "@/components/icons";
import { projectsIn, type Project } from "@/content/projects";
import { education, experience, formatRange, type Experience } from "@/data/experience";
import { skills } from "@/data/skills";
import { areas, site } from "@/data/site";

function ProjectLinks({ p, className = "arrow-link" }: { p: Project; className?: string }) {
  const { links } = p;
  if (p.status === "private") return <span className="small">Write-up available on request</span>;
  return (
    <div className="row-links">
      {links.caseStudy && (
        <Link href={links.caseStudy} className={className}>
          Case study <ArrowRight />
        </Link>
      )}
      {links.live && (
        <a href={links.live} className={className}>
          {p.slug === "build" ? "Open the live app" : "Live"} <ArrowRight />
        </a>
      )}
      {links.repo && (
        <a href={links.repo} className={className}>
          Repository <ArrowRight />
        </a>
      )}
    </div>
  );
}

// A project row with its diagram. `mobOnly` rows exist for phones, where the carousel shows one project.
function WorkRow({ p, mobOnly }: { p: Project; mobOnly?: boolean }) {
  return (
    <article className={`work${mobOnly ? " mob" : ""}`}>
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
  const more = projectsIn("more");
  const earlier = projectsIn("earlier");
  const also = projectsIn("also");
  const swe = experience.filter((e) => e.group === "swe");
  const research = experience.filter((e) => e.group === "research");

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

        {/* FOUR AREAS */}
        <section className="wrap areas">
          {areas.map((a) => (
            <div key={a.title} className="area">
              <span className="icon">
                <AreaGlyph name={a.icon} />
              </span>
              <div className="area-title">{a.title}</div>
              <p className="p area-body desk">{a.body}</p>
              <p className="p area-body mob">{a.bodyShort}</p>
            </div>
          ))}
        </section>

        {/* FEATURED */}
        <Featured items={featured} />

        {/* MORE WORK */}
        <section className="wrap more">
          <div className="section-head">
            <h2 className="h2">More work</h2>
            <span className="small desk">Private projects have a write-up on request</span>
          </div>
          <div className="work-list">
            {featured.slice(1).map((p) => (
              <WorkRow key={p.slug} p={p} mobOnly />
            ))}
            {more.map((p) => (
              <WorkRow key={p.slug} p={p} />
            ))}
          </div>

          <div className="section-head earlier-head">
            <h3 className="h3 earlier-title">Trading, ML and hackathon projects</h3>
            <span className="small desk">Earlier work, without diagrams</span>
          </div>
          <div className="earlier-list">
            {earlier.map((p) => (
              <div key={p.slug} className="earlier-row">
                <span className="earlier-name">
                  {p.title}
                  {p.meta && <span className="small"> {p.meta}</span>}
                </span>
                <p className="p earlier-body desk">{p.body}</p>
                <p className="p earlier-body mob">{p.summary ?? p.body}</p>
                <span className="tags earlier-tags">{p.tags.join(", ")}</span>
              </div>
            ))}
          </div>

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

        {/* ABOUT + SKILLS */}
        <section id="about" className="wrap two-col about">
          <div className="two-col-lead">
            <h2 className="h2">About</h2>
            <p className="p lead-note about-note">{site.about}</p>
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
