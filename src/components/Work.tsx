import Link from "next/link";
import { RichText } from "./RichText";
import { Vignette } from "./vignettes";
import { AreaGlyph, ArrowRight } from "./icons";
import { projectsIn, type Project } from "@/content/projects";
import { groups } from "@/data/site";

export function ProjectLinks({ p }: { p: Project }) {
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
export function WorkRow({ p }: { p: Project }) {
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

// The one project shown full width, with its headline.
export function FeaturedRow({ p }: { p: Project }) {
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

export function EarlierRow({ p }: { p: Project }) {
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

// Every project, grouped by area. `skip` leaves out projects already shown above (the featured one).
export function WorkGroups({ skip = [] }: { skip?: string[] }) {
  const also = projectsIn("also");
  return (
    <>
      {groups.map((g) => {
        const items = projectsIn(g.section).filter((p) => !skip.includes(p.slug));
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
    </>
  );
}
