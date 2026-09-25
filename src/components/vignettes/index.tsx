import { LiveRunDesktop, LiveRunMobile } from "./LiveRun";

// Each project's diagram, in the dark palette. `.desk` / `.mob` variants follow the desktop and phone designs.

function Build() {
  return (
    <>
      <div className="dg desk" style={{ gap: 8 }}>
        <div className="row between">
          <span className="dg-title">blocks</span>
          <span className="st st-ok">spec complete, 4 of 4</span>
        </div>
        <div className="blk blk-blue">Environment: inventory-agent</div>
        <div className="blk blk-dim" style={{ marginLeft: 18 }}>Database: postgres</div>
        <div className="blk blk-dim" style={{ marginLeft: 18 }}>Tool: lookup_sku(sku)</div>
        <div className="blk-set">
          <div>Task set: restock</div>
          <div className="blk-task">Task: flag items under par</div>
          <div className="blk-task">Task: draft the PO</div>
        </div>
        <div className="blk blk-dim">Train: algorithm auto</div>
        <div className="row between" style={{ marginTop: "auto" }}>
          <span className="sub">compiles to env_spec.json, then tools.py and env.py</span>
          <span className="annot">deploys to HUD</span>
        </div>
      </div>
      <div className="dg mob" style={{ gap: 6 }}>
        <div className="row between">
          <span className="dg-title">blocks</span>
          <span className="st st-ok">spec complete, 4 of 4</span>
        </div>
        <div className="blk blk-blue">Environment: inventory-agent</div>
        <div className="blk blk-dim" style={{ marginLeft: 14 }}>Tool: lookup_sku(sku)</div>
        <div className="blk-set">
          <div>Task set: restock</div>
          <div className="blk-task">Task: flag items under par</div>
        </div>
        <div className="blk blk-dim">Train: algorithm auto</div>
        <span className="sub" style={{ marginTop: 4 }}>compiles to env_spec.json, then deploys to HUD</span>
      </div>
    </>
  );
}

function Bench() {
  return (
    <>
      <div className="dg desk">
        <div className="row between">
          <span className="dg-title">architecture, one postgres, N workers</span>
          <span className="annot">scale out = start another worker</span>
        </div>
        <div className="row bench-arch">
          <div className="node">
            bench_web
            <br />
            <span className="sub">Phoenix, /api/runs</span>
          </div>
          <span className="arrow">─enqueue─▶</span>
          <div className="node node-db">
            Postgres + Oban
            <br />
            <span className="sub sub-blue">one job per task</span>
          </div>
          <span className="arrow">◀─poll─</span>
          <div className="node">
            bench_worker
            <br />
            <span className="sub">concurrency: 20</span>
          </div>
          <div className="node node-ghost">
            bench_worker <span className="sub">×N</span>
          </div>
        </div>
        <div className="dash" />
        <LiveRunDesktop />
        <span className="sub" style={{ marginTop: "auto" }}>
          Bench.Events.notify → pg_notify(&apos;run_events&apos;) → PubSub &quot;run:8f3a&quot; → GET /api/runs/8f3a/events
        </span>
      </div>
      <div className="dg mob">
        <LiveRunMobile />
        <div className="dash" style={{ marginTop: 4 }} />
        <div className="row chain">
          <span className="node node-xs">bench_web</span>
          <span className="arrow">→</span>
          <span className="node node-db node-xs">Postgres, Oban</span>
          <span className="arrow">←</span>
          <span className="node node-xs">worker ×N</span>
        </div>
        <span className="annot center" style={{ fontSize: 13 }}>scale out = start another worker</span>
      </div>
    </>
  );
}

function DatasetJson({ endpoint }: { endpoint?: boolean }) {
  return (
    <>
      {endpoint && (
        <>
          <span className="c-c">POST :3030/send_task</span>
          {"\n"}
        </>
      )}
      {"{\n  "}
      <span className="c-a">&quot;dataset_key&quot;</span>: <span className="c-k">&quot;images/kanagawa.zip&quot;</span>
      {",\n  "}
      <span className="c-a">&quot;operations&quot;</span>
      {": [\n    { "}
      <span className="c-a">&quot;Resize&quot;</span>
      {": { "}
      <span className="c-a">&quot;scaling_factor&quot;</span>: <span className="c-m">0.5</span>
      {" } },\n    "}
      <span className="c-k">&quot;GrayScale&quot;</span>
      {",\n    { "}
      <span className="c-a">&quot;Noise&quot;</span>
      {": { "}
      <span className="c-a">&quot;noise_level&quot;</span>: <span className="c-m">0.1</span>
      {" } }\n  ]\n}"}
    </>
  );
}

function Dataset() {
  const ops = ["resize", "grayscale", "noise", "augment"];
  return (
    <>
      <div className="dg dg-split desk">
        <div className="col" style={{ gap: 10 }}>
          <span className="dg-title">POST :3030/send_task</span>
          <pre className="code">
            <DatasetJson />
            {"\n\n"}
            <span className="c-c">{"// upload first:"}</span>
            {"\n"}
            <span className="c-c">POST /upload_dataset → presigned PUT</span>
            {"\n"}
            <span className="c-c">{"   jpg, png, bmp, tiff, zip"}</span>
          </pre>
          <span className="annot">the 15-minute presigned URL keeps gigabytes off the API server</span>
        </div>
        <div className="col fanout">
          <span className="dg-title" style={{ marginBottom: 4 }}>fan-out</span>
          <div className="node node-db center">S3, images/kanagawa.zip</div>
          <div className="arrow center">│</div>
          <div className="node node-k center">
            kafka, dataset-tasks <span className="sub">3 partitions</span>
          </div>
          <div className="arrow center">│</div>
          <div className="node center wrap-text">
            Decomposer
            <br />
            <span className="sub">unzip in memory, FuturesUnordered, one task per image</span>
          </div>
          <div className="arrow center">
            │ <span className="sub" style={{ fontSize: 10 }}>staged S3 key + UUID + mongo link to previous stage</span>
          </div>
          <div className="node node-k center">
            kafka, image-tasks <span className="sub">3 partitions</span>
          </div>
          <div className="arrow center">│</div>
          <div className="ops">
            {ops.map((op) => (
              <div key={op} className="node node-op">
                {op}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mob col" style={{ gap: 12 }}>
        <pre className="code code-xs">
          <DatasetJson endpoint />
        </pre>
        <div className="dg dg-stack">
          <div className="node node-db">S3, zip</div>
          <div className="arrow">│</div>
          <div className="node node-k">kafka, dataset-tasks, 3 partitions</div>
          <div className="arrow">│</div>
          <div className="node">Decomposer, one Tokio task per image</div>
          <div className="arrow">│</div>
          <div className="node node-k">kafka, image-tasks, 3 partitions</div>
          <div className="arrow">│</div>
          <div className="ops">
            {["resize", "gray", "noise", "augment"].map((op) => (
              <div key={op} className="node node-op">
                {op}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

const asks = [
  { price: "100.08", qty: 140, pct: 28 },
  { price: "100.06", qty: 310, pct: 62 },
  { price: "100.04", qty: 220, pct: 44 },
  { price: "100.02", qty: 90, pct: 18 },
];
const bids = [
  { price: "100.00", qty: 180, pct: 36 },
  { price: "99.98", qty: 400, pct: 80 },
  { price: "99.96", qty: 260, pct: 52 },
  { price: "99.94", qty: 120, pct: 24 },
];

function Ladder({ rows, side }: { rows: typeof asks; side: "ask" | "bid" }) {
  return (
    <>
      {rows.map((r) => (
        <div key={r.price} className="ladder">
          <span className={side}>{r.price}</span>
          <span className="right">{r.qty}</span>
          <div className={`bar bar-${side}`} style={{ width: `${r.pct}%` }} />
        </div>
      ))}
    </>
  );
}

function Spread() {
  return (
    <div className="spread">
      <span>spread 0.02</span>
      <span>asks above, bids below</span>
    </div>
  );
}

function SkipList() {
  return (
    <svg
      viewBox="0 0 300 236"
      width="300"
      height="236"
      role="img"
      aria-label="Skip list with three levels of express lanes over the price levels"
      className="skiplist"
    >
      <g fontFamily="var(--mono)" fontSize="10" fill="#8E9A8B">
        <text x="0" y="36">L2</text>
        <text x="0" y="106">L1</text>
        <text x="0" y="176">L0</text>
      </g>
      <g stroke="rgba(159,196,217,0.45)" strokeWidth="2">
        <line x1="40" y1="30" x2="300" y2="30" />
        <line x1="40" y1="100" x2="300" y2="100" />
        <line x1="40" y1="170" x2="300" y2="170" />
      </g>
      <g stroke="rgba(233,240,228,0.2)" strokeWidth="1.5" strokeDasharray="3 3">
        <line x1="58" y1="30" x2="58" y2="170" />
        <line x1="178" y1="30" x2="178" y2="170" />
        <line x1="118" y1="100" x2="118" y2="170" />
        <line x1="238" y1="100" x2="238" y2="170" />
      </g>
      <g fill="#101913" stroke="#9FC4D9" strokeWidth="1.5">
        <rect x="40" y="18" width="36" height="24" rx="6" />
        <rect x="160" y="18" width="36" height="24" rx="6" />
        <rect x="40" y="88" width="36" height="24" rx="6" />
        <rect x="100" y="88" width="36" height="24" rx="6" />
        <rect x="160" y="88" width="36" height="24" rx="6" />
        <rect x="220" y="88" width="36" height="24" rx="6" />
      </g>
      <g fill="#101913" stroke="#6F7C6B" strokeWidth="1.5">
        <rect x="40" y="158" width="36" height="24" rx="6" />
        <rect x="100" y="158" width="36" height="24" rx="6" />
        <rect x="160" y="158" width="36" height="24" rx="6" />
        <rect x="220" y="158" width="36" height="24" rx="6" />
        <rect x="262" y="158" width="36" height="24" rx="6" />
      </g>
      <g fontFamily="var(--mono)" fontSize="9" fill="#E9F0E4" textAnchor="middle">
        <text x="58" y="34">.94</text>
        <text x="178" y="34">.02</text>
        <text x="58" y="104">.94</text>
        <text x="118" y="104">.98</text>
        <text x="178" y="104">.02</text>
        <text x="238" y="104">.06</text>
        <text x="58" y="174">.94</text>
        <text x="118" y="174">.98</text>
        <text x="178" y="174">.02</text>
        <text x="238" y="174">.06</text>
        <text x="280" y="174">.08</text>
      </g>
      <g stroke="var(--accent)" strokeWidth="2" fill="none">
        <path d="M 44 30 L 160 30" strokeDasharray="4 3" />
        <path d="M 178 42 L 178 88" />
        <path d="M 196 100 L 220 100" />
        <path d="M 238 112 L 238 158" />
      </g>
      <g fontFamily="var(--serif)" fontStyle="italic" fontSize="12" fill="var(--accent)">
        <text x="186" y="66">search(100.06): 4 hops, not 10</text>
      </g>
      <g fontFamily="var(--mono)" fontSize="9.5" fill="#8E9A8B">
        <text x="40" y="212">max height 16, promote with probability p</text>
        <text x="40" y="228">arena-pooled nodes, O(1) lookup of an existing level</text>
      </g>
    </svg>
  );
}

function Market() {
  return (
    <>
      <div className="dg dg-market desk">
        <div className="col" style={{ gap: 4 }}>
          <div className="row between" style={{ marginBottom: 4 }}>
            <span className="dg-title">depth ladder</span>
            <span className="dg-title">price, qty</span>
          </div>
          <Ladder rows={asks} side="ask" />
          <Spread />
          <Ladder rows={bids} side="bid" />
          <span className="sub" style={{ marginTop: 6 }}>each level: std::list&lt;Order&gt;, FIFO, price-time priority</span>
        </div>
        <div className="col" style={{ gap: 6 }}>
          <div className="row between">
            <span className="dg-title">skip list, price levels</span>
            <span className="annot" style={{ fontSize: 14 }}>express lanes skip ahead</span>
          </div>
          <SkipList />
        </div>
      </div>
      <div className="dg mob" style={{ gap: 4 }}>
        <div className="row between" style={{ marginBottom: 4 }}>
          <span className="dg-title">depth ladder</span>
          <span className="dg-title">price, qty</span>
        </div>
        <Ladder rows={asks.slice(1)} side="ask" />
        <Spread />
        <Ladder rows={bids.slice(0, 3)} side="bid" />
        <span className="annot" style={{ marginTop: 8, fontSize: 13 }}>
          each level: std::list, FIFO. The skip list finds 100.06 in 4 hops.
        </span>
      </div>
    </>
  );
}

function Accounting() {
  return (
    <>
      <div className="dg desk" style={{ gap: 10 }}>
        <span className="dg-title">journal entry, post_je()</span>
        <div className="box">
          <div className="kv bright">
            <span>Dr Deferred revenue</span>
            <span>4,200.00</span>
          </div>
          <div className="kv bright" style={{ paddingLeft: 14 }}>
            <span>Cr Subscription revenue</span>
            <span>4,200.00</span>
          </div>
          <span className="sub rose" style={{ marginTop: 2 }}>irreversible, no UPDATE path exists</span>
        </div>
        <span className="dg-title" style={{ marginTop: 6 }}>grade</span>
        <div className="split-bar">
          <div style={{ width: "80%", background: "#9FC4D9" }} />
          <div style={{ width: "20%", background: "var(--accent)" }} />
        </div>
        <div className="kv">
          <span className="blue">80% accuracy against a CPA</span>
          <span className="accent">20% reconciliations</span>
        </div>
        <span className="sub" style={{ marginTop: 6 }}>pass = accuracy at or above 0.95 and every reconciliation passing</span>
        <span className="annot" style={{ marginTop: 4 }}>posting is irreversible, so the agent has to be careful rather than clever</span>
      </div>
      <div className="dg mob">
        <span className="dg-title">journal entry, post_je()</span>
        <div className="kv bright">
          <span>Dr Deferred revenue</span>
          <span>4,200.00</span>
        </div>
        <div className="kv bright" style={{ paddingLeft: 12 }}>
          <span>Cr Subscription revenue</span>
          <span>4,200.00</span>
        </div>
        <div className="split-bar split-bar-sm">
          <div style={{ width: "80%", background: "#9FC4D9" }} />
          <div style={{ width: "20%", background: "var(--accent)" }} />
        </div>
        <div className="kv">
          <span className="blue">80% accuracy against a CPA</span>
          <span className="accent">20% reconciliations</span>
        </div>
        <span className="sub">pass = accuracy at or above 0.95 and all reconciliations passing</span>
      </div>
    </>
  );
}

function Meter({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="meter">
      <div style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

function Ghidra() {
  const cats = ["navigation", "xrefs", "vulns", "crypto detection", "symbols", "strings"];
  return (
    <>
      <div className="dg desk" style={{ gap: 10 }}>
        <span className="dg-title">44 tasks, 6 categories</span>
        <div className="row wrap-row" style={{ gap: 6 }}>
          {cats.map((c) => (
            <span key={c} className="tag-o">
              {c}
            </span>
          ))}
        </div>
        <span className="dg-title" style={{ marginTop: 6 }}>binaries</span>
        <div className="bins">
          {["vuln_stack", "simple_re", "algo_impl", "malware_sim"].map((b) => (
            <div key={b} className="node node-op" style={{ padding: 6 }}>
              {b}
            </div>
          ))}
        </div>
        <div className="box" style={{ marginTop: 10, gap: 8 }}>
          <div className="kv bright">
            <span>baseline, Claude Opus 4.6</span>
            <span className="gold">0.095 mean reward</span>
          </div>
          <Meter pct={9.5} color="#E6C27A" />
        </div>
        <span className="annot">no LLM judges: every answer is checked against ground truth computed at build time</span>
      </div>
      <div className="dg mob">
        <div className="row wrap-row" style={{ gap: 4 }}>
          {cats.map((c) => (
            <span key={c} className="tag-o">
              {c === "crypto detection" ? "crypto" : c}
            </span>
          ))}
        </div>
        <div className="kv bright" style={{ marginTop: 4 }}>
          <span>baseline, Claude Opus 4.6</span>
          <span className="gold">0.095</span>
        </div>
        <Meter pct={9.5} color="#E6C27A" />
      </div>
    </>
  );
}

function Catan() {
  const rewards: [string, string][] = [
    ["settlement", "+0.10 to +0.12"],
    ["city", "+0.15"],
    ["win", "+1.00"],
  ];
  return (
    <>
      <div className="dg desk" style={{ gap: 8 }}>
        <span className="dg-title">shaped reward, from the engine only</span>
        {rewards.map(([k, v]) => (
          <div key={k} className="trow kv">
            <span>{k}</span>
            <span className="blue" style={k === "win" ? { fontWeight: 500 } : undefined}>
              {v}
            </span>
          </div>
        ))}
        <span className="dg-title" style={{ marginTop: 8 }}>baseline, untrained</span>
        <div className="kv bright">
          <span>random fallback</span>
          <span className="gold">77%</span>
        </div>
        <Meter pct={77} color="#E6C27A" />
        <div className="kv bright">
          <span>games won</span>
          <span>0 of 4</span>
        </div>
        <div className="row between" style={{ marginTop: 6 }}>
          <span className="sub">target after training: 35% win rate or better</span>
          <span className="annot" style={{ fontSize: 14 }}>a 77% fallback rate is a baseline, not a failure</span>
        </div>
      </div>
      <div className="dg mob" style={{ gap: 6 }}>
        {rewards.map(([k, v]) => (
          <div key={k} className="kv">
            <span>{k}</span>
            <span className="blue">{v}</span>
          </div>
        ))}
        <div className="dash" />
        <div className="kv bright">
          <span>untrained: random fallback</span>
          <span className="gold">77%</span>
        </div>
        <Meter pct={77} color="#E6C27A" />
        <div className="kv">
          <span>games won</span>
          <span>0 of 4, target 35% or better</span>
        </div>
      </div>
    </>
  );
}

const vignettes = {
  build: Build,
  bench: Bench,
  dataset: Dataset,
  market: Market,
  accounting: Accounting,
  ghidra: Ghidra,
  catan: Catan,
} as const;

export type VignetteKey = keyof typeof vignettes;
export const vignetteKeys = Object.keys(vignettes) as VignetteKey[];

export function Vignette({ name }: { name: VignetteKey }) {
  const V = vignettes[name];
  return <V />;
}
