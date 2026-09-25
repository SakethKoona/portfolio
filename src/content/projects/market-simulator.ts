import type { Project } from "./types";

// Describes the C++ implementation on the cpp_imp branch.
const project: Project = {
  slug: "market-simulator",
  title: "MarketSimulator",
  section: "featured",
  order: 3,
  eyebrow: "Limit order book · C++20",
  status: "wip",
  body: [
    "A multi-symbol matching engine in C++20. Each symbol gets its own Level 3 order book: every resting order is tracked individually in a FIFO queue at its price level, so matching is price-time priority across market and limit orders, with GTC, IOC and FOK time-in-force.",
    "Price levels live in a hand-written skip list whose nodes come from a custom arena pool with a free list, plus a hash map so finding an existing level is O(1). An order-id index points straight at each order's level and list position, so cancels and modifies never search. Book and trade events go into a ring buffer, the start of an ITCH-style feed.",
  ],
  mobileBody:
    "A multi-symbol matching engine in C++20 with a Level 3 book per symbol: FIFO queues per price level (price-time priority), market and limit orders, GTC / IOC / FOK. Levels live in a hand-written skip list backed by an arena pool, and an order-id index makes cancels and modifies O(1). Book and trade events feed a ring buffer for an ITCH-style stream.",
  tags: ["C++20", "Level 3 book", "skip list", "arena allocator", "GTC · IOC · FOK"],
  mobileTags: ["C++20", "skip list", "arena allocator"],
  links: { repo: "https://github.com/SakethKoona/MarketSimulator/tree/cpp_imp" },
  linkNote: "planned: Python order flow → TCP in → UDP multicast out",
  mobileLinkNote: "planned: TCP in → UDP multicast out",
  vignette: "market",
};

export default project;
