import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHead } from "@/components/PageHead";
import { FeaturedRow, WorkGroups } from "@/components/Work";
import { projectsIn } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Backend systems, RL environments and evals, and earlier trading and ML projects by Saketh Koona.",
};

export default function WorkPage() {
  const featured = projectsIn("featured");
  return (
    <>
      <Nav variant="page" />
      <main className="page">
        <PageHead
          title="Work"
          lede="Backend systems in Elixir, Rust and C++, environments for training and evaluating agents, and earlier work in trading and ML."
          aside={<span className="small">Private projects have a write-up on request</span>}
        />
        <section className="wrap workspace workspace-page">
          {featured.map((p) => (
            <FeaturedRow key={p.slug} p={p} />
          ))}
          <WorkGroups skip={featured.map((p) => p.slug)} />
        </section>
      </main>
      <Footer />
    </>
  );
}
