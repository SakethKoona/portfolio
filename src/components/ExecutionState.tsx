"use client";

import { useEffect, useState } from "react";

// The footer's "this page's execution state": pending at the top, running while you read, completed at the end.
// Renders the design's all-lit state until mounted (and for reduced-motion visitors).
export function ExecutionState() {
  const [step, setStep] = useState<0 | 1 | 2 | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 1;
      setStep(progress < 0.04 ? 0 : progress < 0.985 ? 1 : 2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const lit = (n: 0 | 1 | 2) => step === null || step >= n;
  return (
    <>
      <span className={`state exec${step === 0 ? " is-current" : ""}`}>pending</span>
      <span className="arrow">→</span>
      <span className={`state exec${lit(1) ? " st-run" : ""}${step === 1 ? " is-current" : ""}`}>
        {step === 1 && <span className="dot dot-pulse" style={{ width: 6, height: 6, background: "#2F5FA8" }} />}
        running
      </span>
      <span className="arrow">→</span>
      <span className={`state exec${lit(2) ? " st-ok" : ""}${step === 2 ? " is-current" : ""}`}>completed</span>
    </>
  );
}
