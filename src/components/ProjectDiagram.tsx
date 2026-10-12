import type { DiagramKind } from '../data/portfolio';

/** Abstrakte Linien-Visuals für die Projektkarten (dekorativ, aria-hidden). */

function NetworkDiagram() {
  const cx = 210;
  const cy = 104;
  const satellites = [
    { x: 92, y: 58 },
    { x: 330, y: 52 },
    { x: 62, y: 150 },
    { x: 210, y: 178 },
    { x: 358, y: 146 },
    { x: 150, y: 96 },
  ];
  return (
    <svg viewBox="0 0 420 210" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      <ellipse cx={cx} cy={cy} rx="168" ry="74" strokeDasharray="2 7" opacity="0.6" />
      <ellipse cx={cx} cy={cy} rx="110" ry="104" strokeDasharray="2 7" opacity="0.35" transform="rotate(24 210 104)" />
      {satellites.map((s) => (
        <line key={`l-${s.x}-${s.y}`} x1={cx} y1={cy} x2={s.x} y2={s.y} opacity="0.55" />
      ))}
      {satellites.map((s) => (
        <g key={`s-${s.x}-${s.y}`}>
          <circle cx={s.x} cy={s.y} r="14" />
          <circle cx={s.x} cy={s.y} r="4" />
        </g>
      ))}
      <circle cx={cx} cy={cy} r="30" />
      <circle cx={cx} cy={cy} r="20" strokeDasharray="2 5" />
      <ellipse cx={cx} cy={cy} rx="30" ry="10" />
    </svg>
  );
}

function BlocksDiagram() {
  const cube = (x: number, y: number, s: number) => {
    const w = s;
    const h = s * 0.5;
    return (
      <g key={`${x}-${y}`}>
        <path d={`M${x} ${y - h} L${x + w} ${y} L${x} ${y + h} L${x - w} ${y} Z`} />
        <path d={`M${x - w} ${y} L${x} ${y + h} L${x} ${y + h + s} L${x - w} ${y + s} Z`} opacity="0.65" />
        <path d={`M${x} ${y + h} L${x + w} ${y} L${x + w} ${y + s} L${x} ${y + h + s} Z`} opacity="0.65" />
      </g>
    );
  };
  return (
    <svg viewBox="0 0 420 210" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      {[-2, -1, 0, 1, 2].map((i) => (
        <line key={`g1-${i}`} x1={60 + i * 60} y1={182} x2={210 + i * 60} y2={104} strokeDasharray="2 7" opacity="0.4" />
      ))}
      {[-2, -1, 0, 1, 2].map((i) => (
        <line key={`g2-${i}`} x1={210 + i * 60} y1={104} x2={360 + i * 60} y2={182} strokeDasharray="2 7" opacity="0.4" />
      ))}
      <line x1="128" y1="122" x2="128" y2="76" opacity="0.55" />
      <line x1="292" y1="122" x2="292" y2="76" opacity="0.55" />
      <line x1="210" y1="96" x2="210" y2="40" opacity="0.55" />
      {cube(128, 68, 26)}
      {cube(292, 68, 26)}
      {cube(210, 32, 30)}
      {cube(210, 122, 26)}
      {cube(46, 148, 20)}
      {cube(374, 148, 20)}
    </svg>
  );
}

function PanelDiagram() {
  const rows = [96, 114, 132, 150];
  return (
    <svg viewBox="0 0 420 210" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true" focusable="false">
      {[52, 72, 92, 112, 132, 152].map((y, i) => (
        <path
          key={`w-${y}`}
          d={`M14 ${y} C 52 ${y - 14 - i * 2}, 72 ${y + 12}, 108 ${y - 6}`}
          opacity="0.45"
          strokeDasharray="1.5 5"
        />
      ))}
      <line x1="108" y1="40" x2="108" y2="172" opacity="0.6" />
      <rect x="128" y="42" width="256" height="128" rx="10" />
      <line x1="128" y1="64" x2="384" y2="64" opacity="0.7" />
      <circle cx="142" cy="53" r="3" />
      <circle cx="154" cy="53" r="3" opacity="0.6" />
      <circle cx="166" cy="53" r="3" opacity="0.35" />
      {rows.map((y, i) => (
        <g key={`r-${y}`}>
          <circle cx="146" cy={y + 5} r="3.4" opacity={i < 2 ? 1 : 0.5} />
          <line x1="158" y1={y} x2={158 + 66 - i * 9} y2={y} opacity="0.85" />
          <line x1="158" y1={y + 9} x2={158 + 44 - i * 6} y2={y + 9} opacity="0.45" />
        </g>
      ))}
      <rect x="252" y="80" width="112" height="90" rx="8" opacity="0.9" />
      <circle cx="268" cy="97" r="6" />
      <circle cx="268" cy="122" r="6" opacity="0.65" />
      <circle cx="268" cy="147" r="6" opacity="0.4" />
      <line x1="284" y1="94" x2="350" y2="94" opacity="0.85" />
      <line x1="284" y1="101" x2="334" y2="101" opacity="0.45" />
      <line x1="284" y1="119" x2="342" y2="119" opacity="0.65" />
      <line x1="284" y1="126" x2="328" y2="126" opacity="0.4" />
      <line x1="284" y1="144" x2="338" y2="144" opacity="0.45" />
      <line x1="284" y1="151" x2="322" y2="151" opacity="0.3" />
    </svg>
  );
}

export function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === 'network') return <NetworkDiagram />;
  if (kind === 'blocks') return <BlocksDiagram />;
  return <PanelDiagram />;
}
