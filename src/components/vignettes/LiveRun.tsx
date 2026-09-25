"use client";

import { useEffect, useRef, useState } from "react";
import { RollingNumber } from "../RollingNumber";

// A simulated run: tasks advance pending → running → a terminal state, and each change bumps the SSE snapshot.
// Server render and first client render show the design's frame (task-014 running, snapshot #41).

type Outcome = "ok" | "timeout" | "failed";
const outcomes: Outcome[] = ["ok", "timeout", "ok", "ok", "failed", "ok"];
const START_CURSOR = 14;
const START_SNAPSHOT = 41;
const TICK_MS = 1800;

const kind = (i: number) => (i % 4 < 2 ? "subprocess" : "http");
const pad = (i: number) => `task-${String(i).padStart(3, "0")}`;

function useLiveCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState(START_CURSOR);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    let visible = false;
    const sync = () => {
      const run = visible && document.visibilityState === "visible";
      if (run && timer === undefined) timer = window.setInterval(() => setCursor((c) => c + 1), TICK_MS);
      if (!run && timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      if (timer !== undefined) window.clearInterval(timer);
    };
  }, []);

  return { ref, cursor, snapshot: START_SNAPSHOT + (cursor - START_CURSOR) };
}

function Status({ i, cursor, compact }: { i: number; cursor: number; compact?: boolean }) {
  if (i === cursor)
    return (
      <span className="st st-run">
        <span className="dot dot-pulse" style={{ width: 6, height: 6, background: "#9FC4D9" }} />
        running
      </span>
    );
  if (i > cursor) return <span className="st">pending</span>;
  const outcome = outcomes[i % outcomes.length];
  if (outcome === "timeout") return <span className="st st-to">{compact ? "timeout" : "timeout, 30s"}</span>;
  if (outcome === "failed") return <span className="st st-fail">failed</span>;
  return <span className="st st-ok">{compact ? "completed, 1.0" : "completed, score 1.0"}</span>;
}

function Rows({ cursor, compact }: { cursor: number; compact?: boolean }) {
  const first = cursor - 2;
  return (
    <>
      {[first, first + 1, first + 2, first + 3].map((i) => (
        <div
          key={i}
          className={`trow${i === cursor ? " is-running" : ""}${cursor !== START_CURSOR && i === first + 3 ? " is-new" : ""}`}
        >
          <span>{compact ? pad(i) : `${pad(i)}, ${kind(i)}`}</span>
          <Status i={i} cursor={cursor} compact={compact} />
        </div>
      ))}
    </>
  );
}

export function LiveRunDesktop() {
  const { ref, cursor, snapshot } = useLiveCursor();
  return (
    <div ref={ref} className="live-run">
      <div className="row between">
        <span className="dg-title">run 8f3a, trial 2 of 3, live</span>
        <span className="sse-live">
          <span className="dot dot-pulse dot-glow" style={{ width: 7, height: 7, background: "#9FC4D9" }} />
          SSE, snapshot #<RollingNumber value={snapshot} />, full state, not a diff
        </span>
      </div>
      <div className="task-list">
        <Rows cursor={cursor} />
      </div>
    </div>
  );
}

export function LiveRunMobile() {
  const { ref, cursor, snapshot } = useLiveCursor();
  return (
    <div ref={ref} className="live-run live-run-sm">
      <div className="row between">
        <span className="dg-title">run 8f3a, trial 2 of 3</span>
        <span className="sse-live" style={{ fontSize: 10.5 }}>
          <span className="dot dot-pulse dot-glow" style={{ width: 6, height: 6, background: "#9FC4D9" }} />
          SSE #<RollingNumber value={snapshot} />
        </span>
      </div>
      <Rows cursor={cursor} compact />
    </div>
  );
}
