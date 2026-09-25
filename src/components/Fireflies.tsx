// The drawn fireflies and faint beam layered over the hero photo. Two crops: desktop and phone.

const motes: [number, number, number, number][] = [
  [612, 118, 1.4, 0.7], [700, 72, 1, 0.5], [745, 190, 1.8, 0.8], [520, 230, 1.1, 0.4], [808, 150, 1.2, 0.6],
  [655, 262, 1.5, 0.7], [580, 330, 1, 0.4], [720, 318, 2, 0.9], [470, 150, 1, 0.3], [850, 260, 1.2, 0.5],
  [610, 410, 1.4, 0.6], [690, 440, 1, 0.5], [540, 470, 1.6, 0.7], [770, 400, 1.2, 0.6], [430, 360, 1, 0.3],
  [640, 520, 1.3, 0.6], [500, 560, 1, 0.45], [830, 500, 1.5, 0.55],
];
const gold: [number, number, number][] = [
  [668, 196, 2.2], [586, 392, 1.8], [790, 470, 1.6], [525, 585, 3.5], [687, 645, 3],
];

function Motes({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9F2E1" stopOpacity="0.10" />
          <stop offset="1" stopColor="#E9F2E1" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <polygon points="640,0 900,0 900,140 430,820 250,820" fill={`url(#${id}-beam)`} />
      <g fill="#E9F0E4" className="ff ff-a">
        {motes.slice(0, 9).map(([x, y, r, o]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={o} />
        ))}
      </g>
      <g fill="#E9F0E4" className="ff ff-b">
        {motes.slice(9).map(([x, y, r, o]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} opacity={o} />
        ))}
      </g>
      <g fill="#E6C27A" className="ff ff-c">
        {gold.map(([x, y, r]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r * 2.6} opacity="0.22" filter={`url(#${id}-blur)`} />
            <circle cx={x} cy={y} r={r} opacity="0.9" />
          </g>
        ))}
      </g>
    </>
  );
}

export function Fireflies() {
  return (
    <>
      <svg className="fireflies desk" viewBox="0 0 900 820" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <Motes id="ffd" />
      </svg>
      <svg className="fireflies mob" viewBox="240 200 660 620" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <Motes id="ffm" />
      </svg>
    </>
  );
}
