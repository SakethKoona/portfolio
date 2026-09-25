// The drawn night meadow behind the hero: one soft beam, a field of grass strokes lit where the beam lands,
// seed heads, a few gold flowers and drifting fireflies. Two crops: desktop and phone.

// Back layer of grass: x at the base, control point, tip, opacity (brighter near the light).
const grass: [number, number, number, number, number, number][] = [
  [120, 126, 758, 134, 730, 0.2], [150, 142, 743, 134, 705, 0.25], [185, 189, 764, 195, 740, 0.22], [215, 225, 728, 237, 680, 0.3],
  [240, 234, 752, 228, 720, 0.28], [270, 278, 716, 288, 660, 0.38], [295, 285, 740, 275, 700, 0.34], [320, 326, 704, 334, 640, 0.45],
  [345, 341, 734, 335, 690, 0.42], [370, 382, 695, 394, 625, 0.55], [392, 384, 722, 376, 670, 0.5], [415, 421, 686, 427, 610, 0.62],
  [438, 426, 710, 416, 650, 0.6], [460, 468, 677, 478, 595, 0.7], [482, 476, 701, 470, 635, 0.68], [505, 515, 671, 525, 585, 0.78],
  [527, 519, 692, 509, 620, 0.76], [550, 556, 665, 564, 575, 0.85], [572, 562, 686, 552, 610, 0.84], [595, 603, 662, 611, 570, 0.9],
  [617, 611, 680, 605, 600, 0.86], [640, 652, 671, 662, 585, 0.82], [662, 654, 698, 646, 630, 0.76], [685, 691, 677, 697, 595, 0.7],
  [707, 697, 707, 687, 645, 0.64], [730, 738, 689, 748, 615, 0.58], [752, 746, 716, 740, 660, 0.5], [775, 785, 701, 795, 635, 0.44],
  [797, 789, 728, 781, 680, 0.38], [820, 826, 716, 834, 660, 0.32], [842, 836, 740, 830, 700, 0.26], [865, 873, 731, 881, 685, 0.22],
  [885, 881, 752, 877, 720, 0.18],
];
// Front layer: shorter, darker blades.
const front: [number, number, number, number, number, number][] = [
  [260, 264, 790, 268, 770, 0.5], [400, 394, 784, 390, 760, 0.6], [540, 546, 778, 552, 750, 0.7], [680, 676, 787, 672, 765, 0.65],
  [810, 814, 793, 818, 775, 0.5], [470, 474, 796, 478, 780, 0.6], [610, 606, 792, 600, 772, 0.7],
];
const seeds: [number, number, number][] = [[427, 608, 7], [564, 573, 8], [662, 583, 7], [795, 633, 6]];
const flowers: [number, number, number][] = [[525, 585, 3.5], [687, 645, 3], [611, 570, 3]];
const motes: [number, number, number, number][] = [
  [612, 118, 1.4, 0.7], [700, 72, 1, 0.5], [745, 190, 1.8, 0.8], [520, 230, 1.1, 0.4], [808, 150, 1.2, 0.6],
  [655, 262, 1.5, 0.7], [580, 330, 1, 0.4], [720, 318, 2, 0.9], [470, 150, 1, 0.3], [850, 260, 1.2, 0.5],
  [610, 410, 1.4, 0.6], [690, 440, 1, 0.5], [540, 470, 1.6, 0.7], [770, 400, 1.2, 0.6], [430, 360, 1, 0.3],
  [640, 520, 1.3, 0.6], [500, 560, 1, 0.45], [830, 500, 1.5, 0.55],
];
const gold: [number, number, number][] = [[668, 196, 2.2], [586, 392, 1.8], [790, 470, 1.6]];

function Scene({ id }: { id: string }) {
  const blade = ([x, cx, cy, tx, ty]: number[], base: number) => `M${x},${base} Q${cx},${cy} ${tx},${ty}`;
  return (
    <>
      <defs>
        <linearGradient id={`${id}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#E9F2E1" stopOpacity="0.16" />
          <stop offset="1" stopColor="#E9F2E1" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-ground`} cx="0.62" cy="1" r="0.55">
          <stop offset="0" stopColor="#8FB07A" stopOpacity="0.42" />
          <stop offset="1" stopColor="#0A100D" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-blur`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <polygon points="640,0 900,0 900,140 430,820 250,820" fill={`url(#${id}-beam)`} />
      <rect x="0" y="480" width="900" height="340" fill={`url(#${id}-ground)`} />
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
      <g fill="none" stroke="#B7CBA6" strokeWidth="1.2" strokeLinecap="round">
        {grass.map((g) => (
          <path key={g[0]} d={blade(g, 800)} opacity={g[5]} />
        ))}
      </g>
      <g fill="none" stroke="#DCE7D2" strokeWidth="1" opacity="0.65">
        {seeds.map(([x, y, r]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
        ))}
      </g>
      <g fill="#DCE7D2" opacity="0.8">
        {seeds.map(([x, y, r]) =>
          [0, 72, 144, 216, 288].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return <circle key={`${x}-${y}-${deg}`} cx={x + Math.sin(a) * r} cy={y - Math.cos(a) * r} r="1" />;
          }),
        )}
      </g>
      <g fill="#E6C27A">
        {flowers.map(([x, y, r]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r * 2.6} opacity="0.22" filter={`url(#${id}-blur)`} />
            <circle cx={x} cy={y} r={r} opacity="0.92" />
          </g>
        ))}
      </g>
      <g fill="none" stroke="#7F9A72" strokeWidth="1.6" strokeLinecap="round">
        {front.map((g) => (
          <path key={g[0]} d={blade(g, 820)} opacity={g[5]} />
        ))}
      </g>
    </>
  );
}

export function Fireflies() {
  return (
    <>
      <svg className="fireflies desk" viewBox="0 0 900 820" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <Scene id="ffd" />
      </svg>
      <svg className="fireflies mob" viewBox="240 200 660 620" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <Scene id="ffm" />
      </svg>
    </>
  );
}
