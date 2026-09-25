import { formatRange, type Experience } from "@/data/experience";

export function ExperienceRow({ e }: { e: Experience }) {
  return (
    <div className="exp-row">
      <span className="small exp-when">{formatRange(e.start, e.end)}</span>
      <div className="exp-what">
        <div className="exp-org">
          {e.org} <span className="small exp-role">{e.role}</span>
        </div>
        <p className="p exp-summary desk">{e.summary}</p>
        <p className="p exp-summary mob">{e.summaryShort ?? e.summary}</p>
      </div>
    </div>
  );
}

export function ExperienceGroup({ label, items, first }: { label?: string; items: Experience[]; first?: boolean }) {
  if (items.length === 0) return null;
  return (
    <>
      {label && <span className={`group-label${first ? "" : " group-label-2"}`}>{label}</span>}
      <div className="exp-group">
        {items.map((e) => (
          <ExperienceRow key={e.org + e.start} e={e} />
        ))}
      </div>
    </>
  );
}
