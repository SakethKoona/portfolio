import type { Project } from "./types";

const project: Project = {
  slug: "distributed-dataset-processor",
  title: "Distributed Image Processing Engine",
  section: "backend",
  order: 2,
  headline: { lead: "An image pipeline in Rust,", em: "event-driven" },
  body: "Kafka worker pools behind an Axum gateway, a Tokio DAG scheduler for multi-stage transforms, and idempotent writes to S3 and MongoDB.",
  tags: ["Rust", "Axum", "Tokio", "Kafka", "S3", "MongoDB"],
  links: { repo: "https://github.com/SakethKoona/distributed-dataset-processor" },
  vignette: "dataset",
};

export default project;
