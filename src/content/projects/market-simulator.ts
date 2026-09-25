import type { Project } from "./types";

const project: Project = {
  slug: "market-simulator",
  title: "MarketSimulator",
  section: "featured",
  order: 3,
  eyebrow: "Limit order book",
  status: "wip",
  body: [
    "A limit order book and market-data feed in Rust. Price levels are ordered by price and each holds a FIFO queue of orders, so matching is price-time priority across buy and sell sides, market and limit orders.",
    "The levels live in a hand-written skip list on raw pointers (unsafe Rust), max height 24, with probabilistic promotion. Search works; insert and delete are in progress. A Tokio UDP socket in `lob_feed` is the start of the multicast feed.",
  ],
  mobileBody:
    "A limit order book and market-data feed in Rust. Price levels hold FIFO queues of orders (price-time priority) and live in a hand-written skip list on raw pointers, max height 24, probabilistic promotion. Search works; insert and delete are in progress. A Tokio UDP socket in `lob_feed` starts the multicast feed.",
  tags: ["Rust", "unsafe · raw pointers", "Tokio UDP", "VecDeque"],
  mobileTags: ["Rust", "unsafe · raw pointers", "Tokio UDP"],
  links: { repo: "https://github.com/SakethKoona/MarketSimulator" },
  linkNote: "planned: python order flow → TCP → engine → UDP multicast",
  mobileLinkNote: "planned: TCP in → UDP multicast out",
  vignette: "market",
};

export default project;
