import type { Project } from "./types";

const project: Project = {
  slug: "whats-up-doc",
  title: "What's Up Doc",
  section: "earlier",
  order: 3,
  meta: "Hackalytics 2025",
  body: "A RAG chatbot over 20,000+ medication records that maps generic to brand-name drugs and surfaces comparison options, on a FAISS index, plus a patient-caller dashboard that summarizes messages and triages them by urgency.",
  summary:
    "A RAG chatbot over 20,000+ medication records on a FAISS index, with a patient-caller dashboard that triages requests by urgency.",
  tags: ["Python", "LangChain", "FAISS", "Flask", "React"],
  links: {},
};

export default project;
