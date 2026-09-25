import type { Project } from "./types";

const project: Project = {
  slug: "distributed-dataset-processor",
  title: "Distributed Dataset Processor",
  section: "featured",
  order: 2,
  eyebrow: "Producer / consumer pipeline",
  body: [
    "Automates the repetitive preprocessing behind image-ML datasets. Upload a zip through a presigned S3 URL, post a job describing the operations, and a Kafka-backed set of Rust workers fans the archive out into one Tokio task per image.",
    "MongoDB tracks batch and task metadata plus the dependency link to the previous stage, so chained operations are dependency-aware and retries are idempotent.",
  ],
  mobileBody:
    "Rust workers that automate image-dataset preprocessing. Upload a zip through a presigned S3 URL (15-minute expiry), post a job, and a Kafka-backed decomposer unzips it in memory and fans out one Tokio task per image. MongoDB links each task to the previous stage for dependency-aware chaining and idempotent retries.",
  tags: ["Rust", "Axum", "Tokio", "Kafka", "S3", "MongoDB", "Docker Compose"],
  mobileTags: ["Rust", "Axum", "Tokio", "Kafka", "S3", "MongoDB"],
  links: { repo: "https://github.com/SakethKoona/distributed-dataset-processor" },
  linkNote: "backend + workers run · monitoring UI planned",
  mobileLinkNote: "monitoring UI planned",
  vignette: "dataset",
};

export default project;
