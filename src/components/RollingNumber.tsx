// Odometer-style digits: each digit is a 0–9 strip translated to the current value.
export function RollingNumber({ value }: { value: number }) {
  const digits = String(value).split("");
  return (
    <span className="roll" aria-label={String(value)}>
      {digits.map((d, i) => (
        <span key={digits.length - i} className="roll-digit" aria-hidden="true">
          <span className="roll-strip" style={{ transform: `translateY(-${Number(d) * 10}%)` }}>
            {"0123456789".split("").map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}
