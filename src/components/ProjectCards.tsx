import Link from "next/link";
import type { Project } from "@/content/projects";
import { RichText } from "./RichText";
import { Vignette } from "./vignettes";

const pad = (n: number) => String(n).padStart(2, "0");

function Tags({ project }: { project: Project }) {
  const mobile = project.mobileTags ?? project.tags;
  const same = mobile.join("|") === project.tags.join("|");
  return (
    <>
      <div className={`tags${same ? "" : " desk-flex"}`}>
        {project.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
      {!same && (
        <div className="tags mob-flex">
          {mobile.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      )}
    </>
  );
}

function Body({ project, className = "p" }: { project: Project; className?: string }) {
  return (
    <>
      {project.body.map((para, i) => (
        <p key={i} className={`${className} desk${i > 0 ? " p-small" : ""}`}>
          <RichText text={para} />
        </p>
      ))}
      <p className={`${className} mob`}>
        <RichText text={project.mobileBody ?? project.body.join(" ")} />
      </p>
    </>
  );
}

function StatusChip({ project }: { project: Project }) {
  if (project.status === "wip") return <span className="state st-to chip-plain">work in progress</span>;
  if (project.status === "private") return <span className="state chip-plain">private · write-up on request</span>;
  return null;
}

export function FeaturedCard({ project }: { project: Project }) {
  const { links } = project;
  const primaryRepo = !links.caseStudy && links.repo;
  return (
    <article className="card featured">
      <div className="featured-text">
        <div className="eyebrow eyebrow-row">
          <span>{pad(project.order)}</span>
          <span className="rule desk-inline" />
          <span className="mob-inline">·</span>
          <span>{project.eyebrow}</span>
          <StatusChip project={project} />
        </div>
        <h3 className="serif featured-title">{project.title}</h3>
        <Body project={project} />
        <Tags project={project} />
        <div className="featured-links">
          {links.caseStudy && (
            <Link href={links.caseStudy} className="pill pill-dark pill-sm">
              <span className="desk-inline">Read the deep dive →</span>
              <span className="mob-inline">Deep dive →</span>
            </Link>
          )}
          {primaryRepo && (
            <a href={links.repo} className="pill pill-light pill-sm">
              Repo ↗
            </a>
          )}
          {links.live && (
            <a href={links.live} className="body-link">
              Live ↗
            </a>
          )}
          {links.caseStudy && links.repo && (
            <a href={links.repo} className="body-link">
              Repo ↗
            </a>
          )}
          {project.linkNote && (
            <>
              <span className="mono link-note desk-inline">{project.linkNote}</span>
              <span className="mono link-note mob-inline">{project.mobileLinkNote ?? project.linkNote}</span>
            </>
          )}
        </div>
      </div>
      {project.vignette && (
        <div className="featured-vig">
          <Vignette name={project.vignette} />
        </div>
      )}
    </article>
  );
}

export function EvalCard({ project }: { project: Project }) {
  const { links } = project;
  return (
    <article className="card eval">
      <div className="eval-text">
        <div className="eyebrow eyebrow-row">
          <span>{project.eyebrow}</span>
          <StatusChip project={project} />
        </div>
        <h3 className="serif eval-title">{project.title}</h3>
        <Body project={project} className="p p-15" />
        <Tags project={project} />
        {(links.live || links.repo) && (
          <div className="eval-links">
            {links.live && (
              <a href={links.live} className="body-link">
                Live demo ↗
              </a>
            )}
            {links.repo && (
              <a href={links.repo} className="body-link">
                Repo ↗
              </a>
            )}
          </div>
        )}
      </div>
      {project.vignette && (
        <div className="eval-vig">
          <Vignette name={project.vignette} />
        </div>
      )}
    </article>
  );
}

export function AlsoStrip({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;
  return (
    <div className="mono also">
      <span className="eyebrow also-label">Also</span>
      {projects.map((p, i) => (
        <span key={p.slug} className="also-item">
          {i > 0 && <span className="also-sep">·</span>}
          {p.links.repo ? (
            <a href={p.links.repo} className="also-link">
              {p.title}
            </a>
          ) : (
            p.title
          )}{" "}
          · {p.note}
        </span>
      ))}
    </div>
  );
}
