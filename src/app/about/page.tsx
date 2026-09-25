import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/PageHead";
import { education } from "@/data/experience";
import { skills } from "@/data/skills";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <>
      <Nav variant="page" />
      <main className="page">
        <PageHead title="About" />
        <section className="wrap about-page">
          <div className="bio">
            {site.bio.map((para) => (
              <p key={para} className="p bio-p">
                {para}
              </p>
            ))}
          </div>
          <dl className="brief-facts about-facts">
            <div className="fact">
              <dt className="small">Based in</dt>
              <dd>{site.city}</dd>
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
            <div className="fact">
              <dt className="small">Elsewhere</dt>
              <dd className="fact-links">
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
              </dd>
            </div>
          </dl>
        </section>
        <section id="skills" className="wrap two-col skills-page">
          <div className="two-col-lead">
            <h2 className="h2">Skills</h2>
            <p className="p lead-note">Everything here appears somewhere in the work or experience.</p>
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
      </main>
      <Footer />
    </>
  );
}
