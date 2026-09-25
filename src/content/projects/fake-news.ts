import type { Project } from "./types";

const project: Project = {
  slug: "fake-news",
  title: "Fake news classification",
  section: "earlier",
  order: 4,
  body: "An LSTM classifier trained on 5K+ articles, with NLTK and spaCy preprocessing over 15K+ sequences. L2 regularization and dropout lifted test accuracy 15 points, to 92.3%.",
  summary: "An LSTM classifier trained on 5K+ articles, 92.3% test accuracy after L2 regularization and dropout.",
  tags: ["TensorFlow", "Keras", "NLTK", "spaCy"],
  links: {},
};

export default project;
