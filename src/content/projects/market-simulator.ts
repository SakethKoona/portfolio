import type { Project } from "./types";

// Describes the C++ implementation on the cpp_imp branch.
const project: Project = {
  slug: "market-simulator",
  title: "C++ Market Exchange Simulator",
  section: "more",
  order: 1,
  status: "wip",
  body: "A price-time priority matching engine with multi-symbol order books. Each price level holds a FIFO queue of orders and the levels live in a hand-written skip list backed by an arena pool. Binary order entry over TCP, market data out over UDP multicast.",
  summary:
    "A price-time priority matching engine with multi-symbol order books. Levels live in a hand-written skip list backed by an arena pool. Binary order entry over TCP, market data over UDP multicast.",
  tags: ["C++20", "order book", "skip list", "arena allocator"],
  links: { repo: "https://github.com/SakethKoona/MarketSimulator/tree/cpp_imp" },
  vignette: "market",
};

export default project;
