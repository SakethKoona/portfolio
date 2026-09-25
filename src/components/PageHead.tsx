import type { ReactNode } from "react";

// The title block at the top of Work, Experience and About.
export function PageHead({ title, lede, aside }: { title: ReactNode; lede?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="wrap page-head">
      <div className="page-head-text">
        <h1 className="page-title">{title}</h1>
        {lede && <p className="p page-lede">{lede}</p>}
      </div>
      {aside && <div className="page-aside">{aside}</div>}
    </header>
  );
}
