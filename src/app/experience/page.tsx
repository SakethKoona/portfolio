import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/PageHead";
import { ExperienceGroup } from "@/components/Experience";
import { education, experience } from "@/data/experience";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Experience",
  description: "Software engineering and research roles held by Saketh Koona.",
};

export default function ExperiencePage() {
  const swe = experience.filter((e) => e.group === "swe");
  const research = experience.filter((e) => e.group === "research");
  return (
    <>
      <Nav variant="page" />
      <main className="page">
        <PageHead
          title="Experience"
          lede={`${education.school}, ${education.degree}, ${education.when}. Software engineering roles first, then research.`}
          aside={
            site.cv && (
              <a href={site.cv} className="arrow-link" target="_blank" rel="noreferrer">
                Full CV as PDF
              </a>
            )
          }
        />
        <section className="wrap exp-page">
          <div className="exp-list">
            <ExperienceGroup label="Software engineering" items={swe} first />
            <ExperienceGroup label="Research" items={research} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
