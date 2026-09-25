import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { CaseFooter } from "@/components/Footer";
import { getProject } from "@/content/projects";

const project = getProject("build");
const original = "https://transpiralabs.com/case-studies/benchception";

export const metadata: Metadata = {
  title: "Build case study",
  description:
    "Build, a block editor that compiles into RL environments on HUD, and Benchception, the experiment that used it to ask which frontier model is best at authoring environments.",
};

const leaderboard = [
  { who: "Qwen-8B, trained on the GPT-5.5 environment", pct: 35.7 },
  { who: "Qwen-8B, untrained baseline", pct: 33.6 },
  { who: "Qwen-8B, trained on the Claude Opus 4.8 environment", pct: 31.5 },
];

export default function BuildCaseStudy() {
  return (
    <>
      <Nav variant="page" />
      <main className="case">
        {/* HEADER */}
        <header className="wrap cs-header">
          <div className="cs-intro">
            <div className="eyebrow eyebrow-row">
              <span>Case study</span>
              <span className="rule desk-inline" />
              <span className="mob-inline">·</span>
              <span>A block editor for RL environments, and an experiment run with it</span>
            </div>
            <h1 className="serif cs-title">Build</h1>
            <p className="p cs-lede">
              Build is a Scratch-style editor where Environment, Tool, Task and Train blocks compile into a runnable,
              graded RL environment on HUD. It won first place at the HUD x YC RSI RL Hackathon. At Transpira Labs we
              then turned it on the frontier models themselves: give two of them the same spec, have each author an
              environment, train a student on each, and see whose student learns more.
            </p>
            <div className="chips">
              <span className="chip">Next.js 16</span>
              <span className="chip">React 19</span>
              <span className="chip">dnd-kit</span>
              <span className="chip">Zod IR</span>
              <span className="chip">Python</span>
              <span className="chip">FastAPI</span>
              <span className="chip">HUD</span>
              <span className="chip">GRPO</span>
            </div>
          </div>
          <div className="card glance">
            <div className="eyebrow" style={{ marginBottom: 8 }}>
              At a glance
            </div>
            <div className="kv kv-line">
              <span className="muted">Live</span>
              <a href={project.links.live} className="body-link strong">
                build.transpiralabs.com
              </a>
            </div>
            <div className="kv kv-line">
              <span className="muted">Repo</span>
              <a href={project.links.repo} className="body-link strong">
                github.com/Transpira-Labs/build
              </a>
            </div>
            <div className="kv kv-line">
              <span className="muted">Input</span>
              <span>four kinds of blocks, in plain language</span>
            </div>
            <div className="kv kv-line">
              <span className="muted">Output</span>
              <span className="mono small">tools.py, env.py, a HUD taskset</span>
            </div>
            <div className="kv kv-line">
              <span className="muted">Experiment</span>
              <a href={original} className="body-link strong">
                Benchception, at Transpira Labs
              </a>
            </div>
            <div className="kv kv-line kv-last">
              <span className="muted">Award</span>
              <span>1st place, HUD x YC RSI RL Hackathon</span>
            </div>
          </div>
        </header>

        {/* 01 THE CANVAS */}
        <section className="wrap cs-section">
          <div className="cs-arch">
            <div className="col" style={{ gap: 12 }}>
              <div className="eyebrow">01 · The canvas</div>
              <h2 className="cs-h2">Four blocks, nested, in plain language.</h2>
              <p className="p">
                Every block has a role. The four main blocks (Environment, Tool, Task, Train) sit on the canvas; groups
                like Scoring nest inside them; leaves hold text, a choice or a number. A typing rule says which children
                a block accepts, so a Good answer can only land inside Scoring, and Scoring only inside a Task. Dragging
                a block out brings its required children with it.
              </p>
              <p className="p">
                Nothing in the editor is code. The whole tree projects to one plain-language description, which is the
                only thing the compiler, and later the author models, ever see.
              </p>
              <p className="annot annot-lg">The spec is prose on purpose: it is readable, auditable and model-agnostic.</p>
            </div>
            <div className="dg" style={{ gap: 10 }}>
              <div className="row between">
                <span className="dg-title">blocks</span>
                <span className="st st-ok">check passed</span>
              </div>
              <div className="blk blk-blue">Environment: supply-chain operator on a live order queue</div>
              <div className="blk blk-dim" style={{ marginLeft: 18 }}>
                Tool: check_inventory(sku) <span className="sub">→ units on hand</span>
              </div>
              <div className="blk-set">
                <div>Task: fulfill the backlog without stocking out</div>
                <div className="blk-task">Scoring: good answer, every order filled</div>
                <div className="blk-task">Scoring: bad answer, a stock-out</div>
              </div>
              <div className="blk blk-dim">Train: algorithm auto, reward from the rubric</div>
              <div className="dash" style={{ marginTop: 6 }} />
              <span className="dg-title">projects to</span>
              <p className="p" style={{ fontSize: 14, color: "#D7E1D2", fontFamily: "var(--sans)" }}>
                &ldquo;Build an RL environment where an agent operates a supply chain: it queries inventory and supplier
                tools to clear an order backlog, scored by fill rate without stock-outs.&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* 02 THE COMPILER */}
        <section className="wrap cs-section">
          <div className="cs-head-row">
            <div className="col" style={{ gap: 10, maxWidth: 760 }}>
              <div className="eyebrow">02 · The compiler</div>
              <h2 className="cs-h2">From a spec to a graded environment in eight steps.</h2>
              <p className="p">
                The tree is validated into a Zod IR, then a Python pipeline turns it into a HUD environment. It is
                schema-agnostic on purpose: the UI&apos;s JSON changes between versions, so an LLM first normalizes
                whatever it is given into a canonical spec, and unknown blocks are kept rather than dropped.
              </p>
            </div>
            <div className="annot cs-head-annot">The model decides what to grade. It never writes the reward code itself.</div>
          </div>
          <div className="dg" style={{ gap: 14 }}>
            <ol className="cs-hops">
              {[
                ["validate", "blocks → ProjectSpec"],
                ["tool synth", "template, LLM, or stub"],
                ["task synth", "prompt + grader plan"],
                ["compile", "tools.py + env.py, smoke-checked"],
                ["golden gate", "held-out check"],
                ["baseline", "solvable and discriminating?"],
                ["train", "GRPO on HUD"],
                ["registry", "versioned, shareable"],
              ].map(([name, sub], i, all) => (
                <li key={name} className="cs-hop">
                  <div className={`node hop-node${i === 3 ? " node-db" : ""}${i === 6 ? " node-dark" : ""}`}>
                    {i + 1}. {name}
                    <br />
                    <span className="hop-sub">{sub}</span>
                  </div>
                  {i < all.length - 1 && (
                    <span className="arrow hop-arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="cs-hop-notes">
              <div className="annot">
                2: a tool is reused from a tested library (run_python, calculator, web_search, http_get, read_file) when
                the description fits; otherwise Claude writes it from the prose; otherwise a safe stub. Anything that runs
                code or touches the network is flagged to execute only inside HUD&apos;s sandbox.
              </div>
              <div className="annot">
                3: graders are rendered from a plan, not written by the model. Numeric answers use numeric_match, text
                uses exact_match or contains, and rubric tasks use an LLM judge that must be a different model from the
                agent.
              </div>
              <div className="annot">
                6 and 7: the baseline proves the environment is solvable and discriminating before anyone trains on it.
                GRPO needs reward spread within a group; if the baseline shows none, training refuses to start.
              </div>
            </div>
          </div>
        </section>

        {/* 03 TEMPLATES + STACK */}
        <section className="wrap cs-section cs-three">
          <div className="card cs-mini">
            <div className="eyebrow">03 · Templates</div>
            <div className="serif cs-mini-title">Four environments you can start from.</div>
            <p className="p p-15">
              SupChain-Bench (tool use), a Wordle solver (game), grade-school math word problems with a calculator
              (reasoning and tools), and support ticket triage (classification). Each is a complete, runnable spec, so
              the first thing a new user does is train something.
            </p>
          </div>
          <div className="card cs-mini">
            <div className="eyebrow">04 · Itself an environment</div>
            <div className="serif cs-mini-title">The builder grades agents that use it.</div>
            <p className="p p-15">
              Because the spec is plain language and the compiler is deterministic, Build doubles as an RL environment:
              give an agent a target and measure whether the blocks it assembles compile into a working environment.
            </p>
          </div>
          <div className="card cs-mini">
            <div className="eyebrow">05 · Stack</div>
            <div className="serif cs-mini-title">Two halves.</div>
            <p className="p p-15">
              The editor is Next.js 16, React 19, dnd-kit and Zod, with Google sign-in and Neon Postgres. The execution
              layer is Python: synthesis, HUD deploy, baseline and training, reached through job-based API routes the UI
              polls. LLM steps go through HUD&apos;s gateway with a single key.
            </p>
          </div>
        </section>

        {/* 06 BENCHCEPTION */}
        <section className="wrap cs-section">
          <div className="cs-head-row">
            <div className="col" style={{ gap: 10, maxWidth: 760 }}>
              <div className="eyebrow">06 · Benchception</div>
              <h2 className="cs-h2">Every RL environment is itself a task. Which frontier model is best at building one?</h2>
              <p className="p">
                The experiment we ran at Transpira Labs with Build. Two author models get the same plain-language spec
                and each writes an environment. A student model trains on each. All students, plus an untrained one, are
                then tested on a golden environment that stayed hidden through authoring and training.
              </p>
            </div>
            <div className="annot cs-head-annot">
              No contamination: the golden environment is revealed only at evaluation.
            </div>
          </div>
          <div className="dg" style={{ gap: 14 }}>
            <div className="row between wrap-row" style={{ gap: 8 }}>
              <span className="dg-title">four stages</span>
              <span className="dg-title">golden set: SupChain-Bench Verified, 33 tool questions</span>
            </div>
            <div className="bench-stages">
              <div className="node center wrap-text">
                1. Spec
                <br />
                <span className="sub">blocks → plain language</span>
              </div>
              <span className="arrow center">→</span>
              <div className="stage-split">
                <div className="node center">
                  2. Author: Claude Opus 4.8
                  <br />
                  <span className="sub">writes an environment</span>
                </div>
                <div className="node center">
                  2. Author: GPT-5.5
                  <br />
                  <span className="sub">writes an environment</span>
                </div>
              </div>
              <span className="arrow center">→</span>
              <div className="stage-split">
                <div className="node node-db center">
                  3. Student: Qwen-8B
                  <br />
                  <span className="sub">trains on the Opus env</span>
                </div>
                <div className="node node-db center">
                  3. Student: Qwen-8B
                  <br />
                  <span className="sub">trains on the GPT env</span>
                </div>
                <div className="node node-ghost center">
                  Baseline: Qwen-8B
                  <br />
                  <span className="sub">untrained</span>
                </div>
              </div>
              <span className="arrow center">→</span>
              <div className="node node-dark center wrap-text">
                4. Held-out eval
                <br />
                <span className="hop-sub">Supply Chain Bench</span>
              </div>
            </div>
          </div>
        </section>

        {/* 07 RESULTS */}
        <section className="wrap cs-section cs-plugins">
          <div className="card cs-states-card">
            <div className="eyebrow">07 · Results</div>
            <h2 className="cs-h2 cs-h2-sm">A three-way tie.</h2>
            <div className="dg" style={{ gap: 12 }}>
              <span className="dg-title">SupChain-Bench Verified, success rate</span>
              {leaderboard.map((r) => (
                <div key={r.who} className="col" style={{ gap: 6 }}>
                  <div className="kv bright">
                    <span>{r.who}</span>
                    <span className="gold">{r.pct}%</span>
                  </div>
                  <div className="meter">
                    <div style={{ width: `${r.pct}%`, background: "#E6C27A" }} />
                  </div>
                </div>
              ))}
              <span className="sub">all three within about a 3 point noise band</span>
            </div>
            <p className="p p-15">
              Neither trained student reliably beat the untrained one. On the original 40-question set all three landed
              at 44 to 45 percent; the verified 33-question set separated them slightly, and not in a consistent
              direction.
            </p>
          </div>
          <div className="card cs-states-card">
            <div className="eyebrow">08 · The reading</div>
            <h2 className="cs-h2 cs-h2-sm">The tie is the signal.</h2>
            <p className="p p-15">
              A flat leaderboard is not a broken experiment. It says that authoring a good RL environment is hard, and
              that today&apos;s frontier models, given a clean spec, produce environments too thin for a student to
              learn anything transferable from. The generated environments were low quality; the pipeline measured that
              honestly.
            </p>
            <div className="annot">
              Related: Supply Chain Bench, the paper and the sc-bench repository, are linked below.
            </div>
          </div>
        </section>

        {/* 09 NEXT */}
        <section className="wrap cs-section cs-learned">
          <div className="card cs-next" style={{ flexDirection: "column", alignItems: "stretch", gap: 16 }}>
            <div className="eyebrow">09 · What comes next</div>
            <div className="cs-next-grid">
              <div className="col" style={{ gap: 6 }}>
                <span className="cs-next-title">Harden the golden set</span>
                <p className="p p-15">Broaden and diversify the held-out environments so they cannot be gamed by a lucky match.</p>
              </div>
              <div className="col" style={{ gap: 6 }}>
                <span className="cs-next-title">Harnesses and visibility</span>
                <p className="p p-15">Inspection tools that surface reward hacks in a generated environment before anyone trains on it.</p>
              </div>
              <div className="col" style={{ gap: 6 }}>
                <span className="cs-next-title">Paper to environment</span>
                <p className="p p-15">A pipeline that turns a research paper into a golden environment, so the held-out set grows with the literature.</p>
              </div>
              <div className="col" style={{ gap: 6 }}>
                <span className="cs-next-title">Human verification</span>
                <p className="p p-15">A person reviews every generated environment before it is used, the same way the verified set was made.</p>
              </div>
            </div>
            <div className="row wrap-row" style={{ gap: 24, paddingTop: 8 }}>
              <a href={original} className="body-link">
                The original write-up at Transpira Labs
              </a>
              <a href="https://arxiv.org/pdf/2602.07342" className="body-link">
                Supply Chain Bench, paper
              </a>
              <a href="https://github.com/Transpira-Labs/sc-bench" className="body-link">
                sc-bench repository
              </a>
            </div>
          </div>
        </section>
      </main>
      <CaseFooter />
    </>
  );
}
