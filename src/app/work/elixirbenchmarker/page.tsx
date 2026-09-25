import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { CaseFooter } from "@/components/Footer";
import { getProject } from "@/content/projects";
import { site } from "@/data/site";

const project = getProject("elixirbenchmarker");

export const metadata: Metadata = {
  title: `${project.title} case study`,
  description:
    "A distributed benchmark platform for AI agents on the BEAM: Postgres and Oban between the web tier and N workers, SSE snapshots, and process-group timeouts.",
};

const tags = [
  "Elixir umbrella",
  "OTP",
  "Phoenix JSON API",
  "Ecto",
  "Oban",
  "Postgres · pg_notify",
  "Phoenix.PubSub",
  "SSE",
  "Next.js · TypeScript",
  "MuonTrap",
];

const hops: { name: string; sub: string; kind?: "db" | "edge" | "dark" }[] = [
  { name: "bench_worker", sub: "Bench.Events.notify", kind: "edge" },
  { name: "INSERT run_events", sub: "+ pg_notify('run_events')", kind: "db" },
  { name: "RunEventListener", sub: "GenServer · LISTEN" },
  { name: "Phoenix.PubSub", sub: '"run:<id>"' },
  { name: "GET /api/runs/:id/events", sub: "SSE · text/event-stream", kind: "edge" },
  { name: "useRunSnapshot()", sub: "EventSource · React" },
  { name: "UI re-renders", sub: "stat tiles · live log", kind: "dark" },
];

export default function BenchCaseStudy() {
  const repo = project.links.repo;
  const live = project.links.live;

  return (
    <>
      <Nav variant="case" />
      <main className="case">
        {/* HEADER */}
        <header className="wrap cs-header">
          <div className="cs-intro">
            <div className="eyebrow eyebrow-row">
              <span>Case study · 01</span>
              <span className="rule desk-inline" />
              <span className="mob-inline">·</span>
              <span>Distributed benchmarking for AI agents</span>
            </div>
            <h1 className="serif cs-title">ElixirBenchmarker</h1>
            <p className="p cs-lede">
              A benchmark platform for AI agents, built on the BEAM. It runs a dataset of tasks against a harness
              concurrently, scores each result, and streams progress to the browser. Postgres sits between the web tier
              and any number of worker nodes.
            </p>
            <div className="chips">
              {tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="card glance">
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              At a glance
            </div>
            {live && (
              <div className="kv kv-line">
                <span className="muted">Live</span>
                <a href={live} className="body-link strong">
                  {live.replace("https://", "")} ↗
                </a>
              </div>
            )}
            {repo && (
              <div className="kv kv-line">
                <span className="muted">Repo</span>
                <a href={repo} className="body-link strong">
                  {repo.replace("https://", "")} ↗
                </a>
              </div>
            )}
            <div className="kv kv-line">
              <span className="muted">Input</span>
              <span>a dataset of tasks + a harness</span>
            </div>
            <div className="kv kv-line">
              <span className="muted">Executors</span>
              <span className="mono small">
                http · subprocess · <span className="faint">containers (planned)</span>
              </span>
            </div>
            <div className="kv kv-line">
              <span className="muted">Scorers</span>
              <span className="mono small">
                deterministic · <span className="faint">llm_judge, human (planned)</span>
              </span>
            </div>
            <div className="kv kv-line kv-last">
              <span className="muted">Trials</span>
              <span className="mono small">1 · 3 · 5 independent runs</span>
            </div>
          </div>
        </header>

        {/* ARCHITECTURE */}
        <section className="wrap cs-section">
          <div className="cs-arch">
            <div className="col" style={{ gap: 12 }}>
              <div className="eyebrow">01 · Architecture</div>
              <h2 className="cs-h2">One database, three OTP apps, N workers.</h2>
              <p className="p">
                An umbrella with three apps sharing one Postgres database. Postgres and Oban are the integration point
                rather than BEAM clustering: <span className="mono code-inline">bench_web</span> enqueues one job per task
                and <span className="mono code-inline">bench_worker</span> nodes poll and execute. To scale out I start
                another worker node; there is no distribution config.
              </p>
              <p className="annot annot-lg">The web tier never talks to a worker directly, only to the database.</p>
            </div>
            <div className="vig cs-arch-vig">
              <div className="row between wrap" style={{ gap: 8 }}>
                <div className="vig-title">umbrella · shared postgres</div>
                <div className="vig-title">arrows = writes/reads, not RPC</div>
              </div>
              <div className="cs-apps">
                <div className="app">
                  <h4>bench_core</h4>
                  <ul>
                    <li>Ecto schemas &amp; contexts</li>
                    <li>Bench.Executor behaviour</li>
                    <li>Bench.Scorer behaviour</li>
                    <li>Oban worker module</li>
                    <li>Bench.Events.notify/2</li>
                  </ul>
                  <div className="arrow app-arrow">│ depends on</div>
                </div>
                <div className="app app-edge">
                  <h4>bench_web · Phoenix</h4>
                  <ul>
                    <li>GET/POST /api/datasets</li>
                    <li>GET/POST /api/harnesses</li>
                    <li>GET/POST /api/benchmarks</li>
                    <li>GET/POST /api/runs</li>
                    <li>GET /api/runs/:id/events · SSE</li>
                  </ul>
                  <div className="arrow app-arrow">│ INSERT oban_jobs · one per task</div>
                </div>
                <div className="app">
                  <h4>bench_worker</h4>
                  <ul>
                    <li>supervises the Oban queue</li>
                    <li>queue tasks: 20 concurrency</li>
                    <li>runs Executor → Scorer</li>
                    <li>emits RunEvents</li>
                    <li className="faint">× as many nodes as you like</li>
                  </ul>
                  <div className="arrow app-arrow">│ poll · claim · execute</div>
                </div>
              </div>
              <div className="cs-arrows desk-grid">
                <div className="arrow">│ depends on</div>
                <div className="arrow">│ INSERT oban_jobs · one per task</div>
                <div className="arrow">│ poll · claim · execute</div>
              </div>
              <div className="node node-db cs-db">
                Postgres · datasets · harnesses · benchmarks · runs · run_events · oban_jobs
              </div>
              <div className="row between wrap" style={{ gap: 8 }}>
                <div className="annot">scale out: `mix run` another bench_worker and it starts claiming jobs</div>
                <div className="mono small muted">no BEAM clustering · no libcluster · no :global</div>
              </div>
            </div>
          </div>
        </section>

        {/* REALTIME */}
        <section className="wrap cs-section">
          <div className="cs-head-row">
            <div className="col" style={{ gap: 10, maxWidth: 760 }}>
              <div className="eyebrow">02 · Realtime path</div>
              <h2 className="cs-h2">Realtime path: worker to browser in seven steps</h2>
              <p className="p">
                Every state change is written as a RunEvent, then a Postgres NOTIFY fans it into the web tier. The SSE
                endpoint pushes a full run snapshot each time, not a diff, so a client that reconnects mid-run just gets the
                current truth.
              </p>
            </div>
            <div className="annot cs-head-annot">Full snapshots use more bandwidth, but a reconnecting client never misses an event.</div>
          </div>
          <div className="vig cs-hops-vig">
            <ol className="cs-hops">
              {hops.map((h, i) => (
                <li key={h.name} className="cs-hop">
                  <div className={`node hop-node${h.kind === "db" ? " node-db" : ""}${h.kind === "edge" ? " node-edge" : ""}${h.kind === "dark" ? " node-dark" : ""}`}>
                    {h.name}
                    <br />
                    <span className="hop-sub">{h.sub}</span>
                  </div>
                  {i < hops.length - 1 && (
                    <span className="arrow hop-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="cs-hop-notes">
              <div className="annot">1–2: the worker never opens a socket; a row + NOTIFY is the whole contract</div>
              <div className="annot">3–4: one listener process per web node, fanned out by run id</div>
              <div className="annot">5–7: the browser holds one EventSource per run page</div>
            </div>
          </div>
        </section>

        {/* PLUGINS + STATES */}
        <section className="wrap cs-section cs-plugins">
          <div className="card cs-plugin-card">
            <div className="col" style={{ gap: 12 }}>
              <div className="eyebrow">03 · Plugin pattern</div>
              <h2 className="cs-h2 cs-h2-sm">Executors and scorers are plugins</h2>
              <p className="p p-15">
                An executor knows how to run one task against a harness. A scorer knows how to turn a result into a number.
                Adding a new kind of either is one module implementing one callback.
              </p>
              <div className="col" style={{ gap: 6, marginTop: 4 }}>
                <div className="row wrap" style={{ gap: 8 }}>
                  <span className="state mono st-ok">http</span>
                  <span className="state mono st-ok">subprocess</span>
                  <span className="state mono">containers · planned</span>
                </div>
                <div className="row wrap" style={{ gap: 8 }}>
                  <span className="state mono st-ok">deterministic</span>
                  <span className="state mono">llm_judge · planned</span>
                  <span className="state mono">human · planned</span>
                </div>
              </div>
            </div>
            <pre className="code">
              <span className="c-c"># bench_core/lib/bench/executor.ex</span>
              {"\n"}
              <span className="c-k">defmodule</span> <span className="c-m">Bench.Executor</span> <span className="c-k">do</span>
              {"\n  "}
              <span className="c-k">@callback</span>
              {" run(task, harness, opts) ::\n    {"}
              <span className="c-a">:ok</span>
              {", result} | {"}
              <span className="c-a">:error</span>
              {", term}\n"}
              <span className="c-k">end</span>
              {"\n\n"}
              <span className="c-c"># bench_core/lib/bench/scorer.ex</span>
              {"\n"}
              <span className="c-k">defmodule</span> <span className="c-m">Bench.Scorer</span> <span className="c-k">do</span>
              {"\n  "}
              <span className="c-k">@callback</span>
              {" score(task, result, config) ::\n    {"}
              <span className="c-a">:ok</span>
              {", float} | {"}
              <span className="c-a">:error</span>
              {", term}\n"}
              <span className="c-k">end</span>
              {"\n\n"}
              <span className="c-c"># subprocess executor: MuonTrap reaps the OS process,</span>
              {"\n"}
              <span className="c-c"># input is single-quote shell-escaped before it ever</span>
              {"\n"}
              <span className="c-c"># touches a command line.</span>
              {"\n"}
              <span className="c-m">MuonTrap</span>
              {".cmd(cmd, args, timeout: opts["}
              <span className="c-a">:timeout</span>
              {"])"}
            </pre>
          </div>
          <div className="card cs-states-card">
            <div className="eyebrow">04 · Execution states</div>
            <h2 className="cs-h2 cs-h2-sm">Five execution states</h2>
            <div className="vig cs-states">
              <div className="row center-x" style={{ gap: 8 }}>
                <span className="state mono">pending</span>
                <span className="arrow">→</span>
                <span className="state mono st-run">running</span>
              </div>
              <div className="row center-x">
                <span className="arrow">↓ one of</span>
              </div>
              <div className="row center-x wrap" style={{ gap: 8 }}>
                <span className="state mono st-ok">completed</span>
                <span className="state mono st-fail">failed</span>
                <span className="state mono st-to">timeout</span>
              </div>
            </div>
            <p className="p p-15">
              Timeout is a separate terminal state from failed, so a hung harness is reported as a timeout rather than
              a generic error.
            </p>
            <div className="annot">MuonTrap guarantees the child is reaped even when the BEAM process that spawned it dies first.</div>
          </div>
        </section>

        {/* TRIALS + SAFETY */}
        <section className="wrap cs-section cs-three">
          <div className="card cs-mini">
            <div className="eyebrow">05 · Trials</div>
            <div className="serif cs-mini-title">A benchmark is a saved (dataset, scorer) pair.</div>
            <p className="p p-15">
              Launch it as 1, 3 or 5 independent trials. Each trial is a full run, so the spread between them answers
              &ldquo;is this model consistent?&rdquo; instead of averaging it away.
            </p>
            <div className="row wrap cs-mini-foot" style={{ gap: 6 }}>
              <span className="state mono">trial 1</span>
              <span className="state mono">trial 2</span>
              <span className="state mono">trial 3</span>
              <span className="mono small faint">· compare the spread</span>
            </div>
          </div>
          <div className="card cs-mini">
            <div className="eyebrow">06 · Shell escaping</div>
            <div className="serif cs-mini-title">Dataset input is untrusted.</div>
            <p className="p p-15">
              The subprocess executor single-quote-escapes every task input before it reaches a command line.
            </p>
            <div className="mono cs-escape cs-mini-foot">
              &apos;it&apos;&quot;&apos;&quot;&apos;s escaped&apos;
            </div>
          </div>
          <div className="card cs-mini">
            <div className="eyebrow">07 · Process control</div>
            <div className="serif cs-mini-title">Timeouts end the whole process group.</div>
            <p className="p p-15">
              MuonTrap wraps the OS process, so a timeout tears down the whole process group and nothing leaks when a
              worker crashes mid-task.
            </p>
            <div className="row wrap cs-mini-foot" style={{ gap: 8 }}>
              <span className="state mono st-to">timeout · 30s</span>
              <span className="mono small faint">→ process group killed, task marked timeout</span>
            </div>
          </div>
        </section>

        {/* UI */}
        <section className="wrap cs-section">
          <div className="cs-head-row">
            <div className="col" style={{ gap: 10 }}>
              <div className="eyebrow">08 · The UI</div>
              <h2 className="cs-h2">The dashboard</h2>
            </div>
            <div className="mono small muted">Next.js · TypeScript · one EventSource per run</div>
          </div>
          <div className="bench-ui" aria-label="Illustration of the bench dashboard">
            <div className="row between wrap bench-ui-top">
              <div className="row" style={{ gap: 10 }}>
                <span className="dot" style={{ width: 10, height: 10, background: "#B84A26" }} />
                <span className="mono bench-ui-brand">bench</span>
              </div>
              <div className="row bench-ui-tabs">
                {["Overview", "Runs", "Benchmarks", "Datasets", "Harnesses", "Models", "Tools"].map((t, i) => (
                  <span key={t} className={`ui-tab${i === 0 ? " ui-tab-on" : ""}`}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="pill bench-ui-launch" aria-hidden="true">
                Launch benchmark
              </span>
            </div>
            <div className="bench-tiles">
              <div className="tile">
                <span className="l">Benchmarks</span>
                <span className="n">4</span>
              </div>
              <div className="tile">
                <span className="l">In flight</span>
                <span className="n" style={{ color: "#2F5FA8" }}>
                  2
                </span>
              </div>
              <div className="tile">
                <span className="l">Completed</span>
                <span className="n" style={{ color: "#1E5C38" }}>
                  37
                </span>
              </div>
              <div className="tile">
                <span className="l">Failed</span>
                <span className="n" style={{ color: "#8C3618" }}>
                  1
                </span>
              </div>
            </div>
            <div className="bench-ui-body">
              <div className="bench-panel">
                <div className="row between wrap" style={{ gap: 8 }}>
                  <span className="vig-title">live log · run 8f3a</span>
                  <span className="row sse-live" style={{ gap: 6 }}>
                    <span className="dot" style={{ width: 6, height: 6, background: "#2F5FA8" }} />
                    connected · snapshot #41
                  </span>
                </div>
                <div className="log">
                  <div>12:04:01&nbsp; run 8f3a&nbsp; trial 2/3&nbsp; started · 24 tasks · executor=subprocess · scorer=deterministic</div>
                  <div>
                    12:04:03&nbsp; task-012&nbsp; <span style={{ color: "#1E5C38" }}>completed</span>&nbsp; score=1.0&nbsp; 1.8s
                  </div>
                  <div>
                    12:04:09&nbsp; task-013&nbsp; <span style={{ color: "#6E4B00" }}>timeout</span>&nbsp;&nbsp;&nbsp; 30.0s · process group reaped
                  </div>
                  <div>
                    12:04:09&nbsp; task-014&nbsp; <span style={{ color: "#1F3B6E" }}>running</span>&nbsp;&nbsp;&nbsp; http · POST harness/run
                  </div>
                  <div>12:04:09&nbsp; task-015&nbsp; pending</div>
                  <div>12:04:10&nbsp; snapshot&nbsp; #41 pushed via SSE · full state</div>
                </div>
              </div>
              <div className="bench-panel">
                <span className="vig-title">benchmark · trials</span>
                <div className="kv kv-line kv-tight">
                  <span>trial 1</span>
                  <span className="state mono st-ok">completed · 0.83</span>
                </div>
                <div className="kv kv-line kv-tight">
                  <span>trial 2</span>
                  <span className="state mono st-run">running · 2 / 24</span>
                </div>
                <div className="kv kv-line kv-tight kv-last">
                  <span>trial 3</span>
                  <span className="state mono">pending</span>
                </div>
                <div className="annot" style={{ marginTop: "auto", fontSize: 13 }}>
                  Illustrative numbers.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEARNED + NEXT */}
        <section className="wrap cs-section cs-learned">
          <div className="card cs-next">
            <div className="eyebrow">Next up</div>
            <div className="row cs-next-item">
              <span className="dot" style={{ width: 7, height: 7, background: "#E7B08A" }} />
              containers executor
            </div>
            <div className="row cs-next-item">
              <span className="dot" style={{ width: 7, height: 7, background: "#E7B08A" }} />
              llm_judge and human scorers
            </div>
            <a href={`mailto:${site.email}`} className="pill pill-white">
              {site.email}
            </a>
          </div>
        </section>
      </main>
      <CaseFooter />
    </>
  );
}
