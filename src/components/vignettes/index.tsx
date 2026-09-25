import type { ReactNode } from "react";

// Each project's diagram. `.desk` / `.mob` variants follow the desktop and phone designs.

function Dot({ color, size = 7 }: { color: string; size?: number }) {
  return <span className="dot" style={{ width: size, height: size, background: color }} />;
}

function TaskRow({ name, children, running }: { name: string; children: ReactNode; running?: boolean }) {
  return (
    <div className={`task-row${running ? " is-running" : ""}`}>
      <span>{name}</span>
      {children}
    </div>
  );
}

function Bench() {
  return (
    <>
      <div className="vig vig-lg desk">
        <div className="row between">
          <div className="vig-title">architecture · one postgres, N workers</div>
          <div className="annot">scale out = start another worker</div>
        </div>
        <div className="row bench-arch">
          <div className="node">
            bench_web
            <br />
            <span className="node-sub">Phoenix · /api/runs</span>
          </div>
          <span className="arrow">─enqueue─▶</span>
          <div className="node node-db">
            Postgres + Oban
            <br />
            <span className="node-sub-db">one job per task</span>
          </div>
          <span className="arrow">◀─poll─</span>
          <div className="node">
            bench_worker
            <br />
            <span className="node-sub">concurrency: 20</span>
          </div>
          <div className="node node-ghost">
            bench_worker <span className="node-sub-inline">×N</span>
          </div>
        </div>
        <div className="dash-rule" />
        <div className="row between">
          <div className="vig-title">run 8f3a · trial 2 of 3 · live</div>
          <div className="row sse-live">
            <Dot color="#2F5FA8" />
            SSE · snapshot #41 · full state, not a diff
          </div>
        </div>
        <div className="task-list">
          <TaskRow name="task-012 · subprocess">
            <span className="state st-ok">completed · score 1.0</span>
          </TaskRow>
          <TaskRow name="task-013 · subprocess">
            <span className="state st-to">timeout · 30s</span>
          </TaskRow>
          <TaskRow name="task-014 · http" running>
            <span className="state st-run">
              <Dot color="#2F5FA8" size={6} />
              running
            </span>
          </TaskRow>
          <TaskRow name="task-015 · http">
            <span className="state">pending</span>
          </TaskRow>
        </div>
        <div className="vig-foot">
          Bench.Events.notify → pg_notify(&apos;run_events&apos;) → PubSub &quot;run:8f3a&quot; → GET
          /api/runs/8f3a/events
        </div>
      </div>

      <div className="vig vig-sm mob">
        <div className="row between">
          <div className="vig-title">run 8f3a · trial 2 of 3</div>
          <div className="row sse-live" style={{ fontSize: 10.5 }}>
            <Dot color="#2F5FA8" size={6} />
            SSE #41
          </div>
        </div>
        <TaskRow name="task-012">
          <span className="state st-ok">completed · 1.0</span>
        </TaskRow>
        <TaskRow name="task-013">
          <span className="state st-to">timeout</span>
        </TaskRow>
        <TaskRow name="task-014" running>
          <span className="state st-run">
            <Dot color="#2F5FA8" size={6} />
            running
          </span>
        </TaskRow>
        <TaskRow name="task-015">
          <span className="state">pending</span>
        </TaskRow>
        <div className="dash-rule" style={{ marginTop: 4 }} />
        <div className="row mob-chain">
          <div className="node">bench_web</div>
          <span className="arrow">→</span>
          <div className="node node-db">Postgres · Oban</div>
          <span className="arrow">←</span>
          <div className="node">worker ×N</div>
        </div>
        <div className="annot" style={{ textAlign: "center", fontSize: 13 }}>
          scale out = start another worker
        </div>
      </div>
    </>
  );
}

function DatasetJson({ withEndpoint }: { withEndpoint?: boolean }) {
  return (
    <>
      {withEndpoint && (
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
      <div className="vig vig-lg vig-dataset desk">
        <div className="col" style={{ gap: 10 }}>
          <div className="vig-title">POST :3030/send_task</div>
          <pre className="code code-sm dataset-code">
            <DatasetJson />
            {"\n\n"}
            <span className="c-c">{"// upload first:"}</span>
            {"\n"}
            <span className="c-c">POST /upload_dataset → presigned PUT</span>
            {"\n"}
            <span className="c-c">{"   jpg · png · bmp · tiff · zip"}</span>
          </pre>
          <div className="annot">the 15-minute presigned URL keeps gigabytes off the API server</div>
        </div>
        <div className="col fanout">
          <div className="vig-title" style={{ marginBottom: 4 }}>
            fan-out
          </div>
          <div className="node node-db center">S3 · images/kanagawa.zip</div>
          <div className="arrow center">│</div>
          <div className="node node-kafka center">
            kafka · dataset-tasks <span className="node-sub-inline">· 3 partitions</span>
          </div>
          <div className="arrow center">│</div>
          <div className="node center">
            Decomposer
            <br />
            <span className="node-sub">unzip in memory · FuturesUnordered · one task per image</span>
          </div>
          <div className="arrow center">
            │ <span className="arrow-note">staged S3 key + UUID + mongo link to previous stage</span>
          </div>
          <div className="node node-kafka center">
            kafka · image-tasks <span className="node-sub-inline">· 3 partitions</span>
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
          <DatasetJson withEndpoint />
        </pre>
        <div className="vig vig-sm vig-stack">
          <div className="node node-db">S3 · zip</div>
          <div className="arrow">│</div>
          <div className="node node-kafka">kafka · dataset-tasks · 3 partitions</div>
          <div className="arrow">│</div>
          <div className="node">Decomposer · one Tokio task per image</div>
          <div className="arrow">│</div>
          <div className="node node-kafka">kafka · image-tasks · 3 partitions</div>
          <div className="arrow">│</div>
          <div className="ops ops-sm">
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
          <span className={side === "ask" ? "ask" : "bid"}>{r.price}</span>
          <span className="right">{r.qty}</span>
          <div className={`bar bar-${side}`} style={{ width: `${r.pct}%` }} />
        </div>
      ))}
    </>
  );
}

function SkipList() {
  return (
    <svg
      viewBox="0 0 378 250"
      width="378"
      height="250"
      role="img"
      aria-label="Skip list with three levels of express lanes over the price levels"
      className="skiplist"
    >
      <g fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6F6D74">
        <text x="0" y="36">L2</text>
        <text x="0" y="106">L1</text>
        <text x="0" y="176">L0</text>
      </g>
      <g stroke="#B9CBEA" strokeWidth="2">
        <line x1="40" y1="30" x2="300" y2="30" />
        <line x1="40" y1="100" x2="300" y2="100" />
        <line x1="40" y1="170" x2="300" y2="170" />
      </g>
      <g stroke="#D3D0CA" strokeWidth="1.5" strokeDasharray="3 3">
        <line x1="58" y1="30" x2="58" y2="170" />
        <line x1="178" y1="30" x2="178" y2="170" />
        <line x1="118" y1="100" x2="118" y2="170" />
        <line x1="238" y1="100" x2="238" y2="170" />
      </g>
      <g fill="#FFFFFF" stroke="#2F5FA8" strokeWidth="1.5">
        <rect x="40" y="18" width="36" height="24" rx="6" />
        <rect x="160" y="18" width="36" height="24" rx="6" />
        <rect x="40" y="88" width="36" height="24" rx="6" />
        <rect x="100" y="88" width="36" height="24" rx="6" />
        <rect x="160" y="88" width="36" height="24" rx="6" />
        <rect x="220" y="88" width="36" height="24" rx="6" />
      </g>
      <g fill="#FFFFFF" stroke="#8A888D" strokeWidth="1.5">
        <rect x="40" y="158" width="36" height="24" rx="6" />
        <rect x="100" y="158" width="36" height="24" rx="6" />
        <rect x="160" y="158" width="36" height="24" rx="6" />
        <rect x="220" y="158" width="36" height="24" rx="6" />
        <rect x="280" y="158" width="36" height="24" rx="6" />
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#1F1E22" textAnchor="middle">
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
        <text x="298" y="174">.08</text>
      </g>
      <g stroke="var(--accent)" strokeWidth="2" fill="none">
        <path d="M 44 30 L 160 30" strokeDasharray="4 3" />
        <path d="M 178 42 L 178 88" />
        <path d="M 196 100 L 220 100" />
        <path d="M 238 112 L 238 158" />
      </g>
      <g fontFamily="Newsreader, serif" fontStyle="italic" fontSize="11" fill="var(--accent)">
        <text x="200" y="66">search(100.06): 4 hops, not 10</text>
      </g>
      <g fontFamily="JetBrains Mono, monospace" fontSize="9.5" fill="#6F6D74">
        <text x="40" y="212">max height 16 · promote with probability p · arena-pooled nodes</text>
        <text x="40" y="228">+ hash map: an existing level is found in O(1)</text>
      </g>
    </svg>
  );
}

function Market() {
  return (
    <>
      <div className="vig vig-lg vig-market desk">
        <div className="col" style={{ gap: 8 }}>
          <div className="row between">
            <div className="vig-title">depth ladder</div>
            <div className="vig-title">price · qty</div>
          </div>
          <div className="col" style={{ gap: 3 }}>
            <Ladder rows={asks} side="ask" />
            <div className="row between spread">
              <span>spread 0.02</span>
              <span>asks ↑ · bids ↓</span>
            </div>
            <Ladder rows={bids} side="bid" />
          </div>
          <div className="vig-foot" style={{ marginTop: 4 }}>
            each level: std::list&lt;Order&gt; · FIFO · price-time priority
          </div>
        </div>
        <div className="col" style={{ gap: 8 }}>
          <div className="row between">
            <div className="vig-title">skip list · price levels</div>
            <div className="annot">express lanes skip ahead</div>
          </div>
          <SkipList />
        </div>
      </div>

      <div className="vig vig-sm mob ladder-sm" style={{ gap: 4 }}>
        <div className="row between" style={{ marginBottom: 4 }}>
          <div className="vig-title">depth ladder</div>
          <div className="vig-title">price · qty</div>
        </div>
        <Ladder rows={asks.slice(1)} side="ask" />
        <div className="row between spread">
          <span>spread 0.02</span>
          <span>asks ↑ · bids ↓</span>
        </div>
        <Ladder rows={bids.slice(0, 3)} side="bid" />
        <div className="annot" style={{ marginTop: 8, fontSize: 13 }}>
          each level: std::list, FIFO — the skip list&apos;s express lanes find 100.06 in 4 hops
        </div>
      </div>
    </>
  );
}

function Builder() {
  return (
    <>
      <div className="vig vig-side desk">
        <div className="row between">
          <div className="vig-title">blocks</div>
          <div className="pill-ok">check ✓</div>
        </div>
        <div className="blk" style={{ background: "#2F5FA8" }}>
          Environment · inventory-agent
        </div>
        <div className="blk" style={{ background: "#26252B", marginLeft: 14 }}>
          Tool · lookup_sku(sku)
        </div>
        <div className="blk-set">
          <div>Task · flag items under par</div>
          <div className="blk-task">Scoring ▸ Good answer</div>
          <div className="blk-task">Scoring ▸ Bad answer</div>
        </div>
        <div className="blk" style={{ background: "#26252B" }}>
          Train · algorithm: auto
        </div>
        <div className="vig-foot" style={{ fontSize: 10.5 }}>
          → IR → tools.py + env.py → deploy to HUD
        </div>
      </div>
      <div className="strip mob">
        <div className="strip-blk" style={{ background: "#2F5FA8" }}>
          Environment · inventory-agent
        </div>
        <div className="strip-blk" style={{ background: "#26252B", marginLeft: 12 }}>
          Tool · lookup_sku(sku)
        </div>
        <div className="strip-blk" style={{ background: "var(--accent)" }}>
          Task ▸ Scoring ▸ Good answer
        </div>
        <div style={{ fontSize: 10.5, color: "#6F6D74" }}>→ IR → env.py → deploy to HUD</div>
      </div>
    </>
  );
}

function GradeBar() {
  return (
    <div className="split-bar">
      <div style={{ width: "80%", background: "#2F5FA8" }} />
      <div style={{ width: "20%", background: "var(--accent)" }} />
    </div>
  );
}

function Accounting() {
  return (
    <>
      <div className="vig vig-side desk" style={{ gap: 8 }}>
        <div className="vig-title">journal entry · post_je()</div>
        <div className="je">
          <div className="kv">
            <span>Dr Deferred revenue</span>
            <span>4,200.00</span>
          </div>
          <div className="kv" style={{ paddingLeft: 14 }}>
            <span>Cr Subscription revenue</span>
            <span>4,200.00</span>
          </div>
          <div className="je-note">irreversible · no UPDATE path exists</div>
        </div>
        <div className="vig-title" style={{ marginTop: 4 }}>
          grade
        </div>
        <GradeBar />
        <div className="kv">
          <span className="ink-blue">80% accuracy vs CPA</span>
          <span className="ink-rust">20% recons</span>
        </div>
        <div className="vig-foot" style={{ fontSize: 11 }}>
          pass = accuracy ≥ 0.95 <span style={{ color: "#8A888D" }}>and</span> every recon passing
        </div>
      </div>
      <div className="strip mob">
        <div className="kv">
          <span>Dr Deferred revenue</span>
          <span>4,200.00</span>
        </div>
        <div className="kv" style={{ paddingLeft: 12 }}>
          <span>Cr Subscription revenue</span>
          <span>4,200.00</span>
        </div>
        <div className="split-bar split-bar-sm">
          <div style={{ width: "80%", background: "#2F5FA8" }} />
          <div style={{ width: "20%", background: "var(--accent)" }} />
        </div>
        <div className="kv">
          <span className="ink-blue">80% accuracy vs CPA</span>
          <span className="ink-rust">20% recons</span>
        </div>
        <div style={{ fontSize: 10.5, color: "#6F6D74" }}>pass = accuracy ≥ 0.95 and all recons passing</div>
      </div>
    </>
  );
}

function Meter({ pct }: { pct: number }) {
  return (
    <div className="meter">
      <div style={{ width: `${pct}%` }} />
    </div>
  );
}

function Ghidra() {
  const cats = ["navigation", "xrefs", "vulns", "crypto detection", "symbols", "strings"];
  return (
    <>
      <div className="vig vig-side desk" style={{ gap: 8 }}>
        <div className="vig-title">44 tasks · 6 categories</div>
        <div className="row wrap" style={{ gap: 5 }}>
          {cats.map((c) => (
            <span key={c} className="tag tag-white">
              {c}
            </span>
          ))}
        </div>
        <div className="vig-title" style={{ marginTop: 4 }}>
          binaries
        </div>
        <div className="bins">
          {["vuln_stack", "simple_re", "algo_impl", "malware_sim"].map((b) => (
            <div key={b} className="node node-bin">
              {b}
            </div>
          ))}
        </div>
        <div className="je" style={{ marginTop: "auto" }}>
          <div className="kv">
            <span>baseline · Opus 4.6</span>
            <span className="ink-rust" style={{ fontWeight: 500 }}>
              0.095 mean reward
            </span>
          </div>
          <div style={{ marginTop: 6 }}>
            <Meter pct={9.5} />
          </div>
        </div>
      </div>
      <div className="strip mob">
        <div className="row wrap" style={{ gap: 4 }}>
          {cats.map((c) => (
            <span key={c} className="tag tag-white">
              {c === "crypto detection" ? "crypto" : c}
            </span>
          ))}
        </div>
        <div className="kv" style={{ marginTop: 4 }}>
          <span>baseline · Opus 4.6</span>
          <span className="ink-rust">0.095</span>
        </div>
        <Meter pct={9.5} />
      </div>
    </>
  );
}

function Catan() {
  const rewards = [
    ["settlement", "+0.10 – 0.12"],
    ["city", "+0.15"],
    ["win", "+1.00"],
  ];
  return (
    <>
      <div className="vig vig-side desk">
        <div className="vig-title">shaped reward · from the engine only</div>
        <div className="col" style={{ gap: 3, fontSize: 11.5 }}>
          {rewards.map(([k, v]) => (
            <div key={k} className="kv kv-box">
              <span>{k}</span>
              <span className="ink-blue" style={k === "win" ? { fontWeight: 500 } : undefined}>
                {v}
              </span>
            </div>
          ))}
        </div>
        <div className="vig-title" style={{ marginTop: 6 }}>
          baseline, untrained
        </div>
        <div className="kv">
          <span>random fallback</span>
          <span className="ink-rust">77%</span>
        </div>
        <Meter pct={77} />
        <div className="kv">
          <span>games won</span>
          <span>0 of 4</span>
        </div>
        <div className="vig-foot" style={{ fontSize: 11 }}>
          target after training: ≥ 35% win rate
        </div>
      </div>
      <div className="strip mob">
        {rewards.map(([k, v]) => (
          <div key={k} className="kv">
            <span>{k}</span>
            <span className="ink-blue">{v}</span>
          </div>
        ))}
        <div className="dash-rule" />
        <div className="kv">
          <span>untrained: random fallback</span>
          <span className="ink-rust">77%</span>
        </div>
        <div className="kv">
          <span>games won</span>
          <span>0 of 4 · target ≥ 35%</span>
        </div>
      </div>
    </>
  );
}

const vignettes = {
  bench: Bench,
  dataset: Dataset,
  market: Market,
  builder: Builder,
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
