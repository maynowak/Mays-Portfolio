import type { DiagramKind } from '../data/portfolio';

/**
 * Bildwelten der Projektkarten — rein dekorativ (aria-hidden).
 * Glasflächen, türkise Kanten und räumliche Tiefe statt flacher Strichgrafik.
 */

/** Mays-RIS: vernetztes Agentensystem mit Kugeln, Kern und Datenfluss. */
function NetworkDiagram() {
  const satellites = [
    { x: 84, y: 52, r: 17 },
    { x: 336, y: 44, r: 14 },
    { x: 46, y: 138, r: 13 },
    { x: 210, y: 172, r: 19 },
    { x: 372, y: 146, r: 16 },
    { x: 138, y: 104, r: 12 },
    { x: 300, y: 106, r: 13 },
  ];
  return (
    <svg viewBox="0 0 420 200" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="card-glass-a" cx="36%" cy="30%" r="70%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.34" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </radialGradient>
        <radialGradient id="card-core-a" cx="36%" cy="30%" r="72%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.55" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      {/* räumliche Ebene */}
      <ellipse cx="210" cy="186" rx="196" ry="16" fill="currentColor" opacity="0.07" />
      <path d="M14 186 L120 122 M70 186 L176 122 M126 186 L232 122 M182 186 L288 122 M238 186 L344 122 M294 186 L400 122"
        stroke="currentColor" strokeWidth="0.8" opacity="0.28" />

      {/* Bahnen */}
      <ellipse cx="210" cy="104" rx="176" ry="70" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" opacity="0.45" />
      <ellipse cx="210" cy="104" rx="120" ry="104" stroke="currentColor" strokeWidth="1" strokeDasharray="2 8" opacity="0.28" transform="rotate(22 210 104)" />

      {/* Verbindungen zum Kern */}
      {satellites.map((s) => (
        <line key={`l-${s.x}-${s.y}`} x1="210" y1="104" x2={s.x} y2={s.y} stroke="currentColor" strokeWidth="1.2" opacity="0.62" />
      ))}

      {/* Satelliten als Glaskugeln */}
      {satellites.map((s) => (
        <g key={`s-${s.x}-${s.y}`}>
          <circle cx={s.x} cy={s.y} r={s.r} fill="url(#card-glass-a)" />
          <circle cx={s.x} cy={s.y} r={s.r} stroke="currentColor" strokeWidth="1.3" />
          <ellipse cx={s.x} cy={s.y} rx={s.r} ry={s.r * 0.34} stroke="currentColor" strokeWidth="0.8" opacity="0.7" />
          <circle cx={s.x - s.r * 0.34} cy={s.y - s.r * 0.36} r={s.r * 0.24} fill="#fff" opacity="0.5" />
        </g>
      ))}

      {/* Kern */}
      <circle cx="210" cy="104" r="34" fill="url(#card-core-a)" />
      <circle cx="210" cy="104" r="34" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="210" cy="104" rx="34" ry="11" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <ellipse cx="210" cy="104" rx="11" ry="34" stroke="currentColor" strokeWidth="1" opacity="0.8" />
      <circle cx="210" cy="104" r="4.5" fill="currentColor" />
    </svg>
  );
}

/** Mays Orders AWS: verbundene, gläserne Workflow-Blöcke über Rasterfläche. */
function BlocksDiagram() {
  const cube = (x: number, y: number, s: number) => (
    <g key={`${x}-${y}`}>
      <path d={`M${x} ${y - s * 0.5} L${x + s} ${y} L${x} ${y + s * 0.5} L${x - s} ${y} Z`} fill="currentColor" opacity="0.34" />
      <path d={`M${x - s} ${y} L${x} ${y + s * 0.5} L${x} ${y + s * 0.5 + s} L${x - s} ${y + s} Z`} fill="currentColor" opacity="0.16" />
      <path d={`M${x} ${y + s * 0.5} L${x + s} ${y} L${x + s} ${y + s} L${x} ${y + s * 0.5 + s} Z`} fill="currentColor" opacity="0.22" />
      <path d={`M${x} ${y - s * 0.5} L${x + s} ${y} L${x} ${y + s * 0.5} L${x - s} ${y} Z`} stroke="currentColor" strokeWidth="1.3" />
      <path d={`M${x - s} ${y} L${x} ${y + s * 0.5} L${x} ${y + s * 0.5 + s} L${x - s} ${y + s} Z`} stroke="currentColor" strokeWidth="1.3" />
      <path d={`M${x} ${y + s * 0.5} L${x + s} ${y} L${x + s} ${y + s} L${x} ${y + s * 0.5 + s} Z`} stroke="currentColor" strokeWidth="1.3" />
    </g>
  );
  return (
    <svg viewBox="0 0 420 200" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="card-glass-b" cx="38%" cy="26%" r="70%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.06" />
        </radialGradient>
      </defs>

      {/* Bodenraster */}
      <ellipse cx="210" cy="186" rx="200" ry="14" fill="currentColor" opacity="0.06" />
      {[-3, -2, -1, 0, 1, 2, 3].map((i) => (
        <line key={`a-${i}`} x1={210 + i * 58} y1="186" x2={210 + i * 40} y2="126" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      ))}
      {[-2, -1, 0, 1, 2].map((i) => (
        <line key={`b-${i}`} x1={60 + i * 50} y1="186" x2={210 + i * 24} y2="126" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
      ))}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <line key={`c-${i}`} x1={70 + i * 56} y1="170" x2={150 + i * 30} y2="130" stroke="currentColor" strokeWidth="0.7" strokeDasharray="3 6" opacity="0.4" />
      ))}

      {/* Verbindungen zwischen den Blöcken */}
      <line x1="120" y1="104" x2="120" y2="62" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
      <line x1="300" y1="104" x2="300" y2="62" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
      <line x1="210" y1="66" x2="210" y2="34" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />
      <line x1="120" y1="62" x2="210" y2="34" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.55" />
      <line x1="300" y1="62" x2="210" y2="34" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" opacity="0.55" />
      <line x1="210" y1="142" x2="210" y2="164" stroke="currentColor" strokeWidth="1.3" opacity="0.7" />

      {/* Workflow-Blöcke */}
      {cube(210, 34, 30)}
      {cube(120, 62, 24)}
      {cube(300, 62, 24)}
      {cube(210, 118, 26)}
      {cube(58, 150, 18)}
      {cube(362, 150, 18)}
      <circle cx="210" cy="34" r="4" fill="#fff" opacity="0.55" />
    </svg>
  );
}

/** May's Job Matcher: abstrahierte, hochwertige Analyseoberfläche. */
function PanelDiagram() {
  const rows = [104, 124, 144];
  return (
    <svg viewBox="0 0 420 200" fill="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="card-panel-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.26" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="card-glass-c" cx="30%" cy="26%" r="72%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.42" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.06" />
        </radialGradient>
      </defs>

      {/* Datenströme von links */}
      {[40, 56, 72, 88, 104, 120].map((y, i) => (
        <path
          key={`w-${y}`}
          d={`M8 ${y} C 46 ${y - 16 - i * 2}, 66 ${y + 14}, 104 ${y - 8}`}
          stroke="currentColor"
          strokeWidth="1.1"
          strokeDasharray="2 6"
          opacity="0.5"
        />
      ))}
      <circle cx="104" cy="100" r="3" fill="currentColor" opacity="0.7" />

      {/* Glasfläche der Oberfläche */}
      <rect x="104" y="26" width="300" height="150" rx="14" fill="url(#card-panel-face)" />
      <rect x="104" y="26" width="300" height="150" rx="14" stroke="currentColor" strokeWidth="1.4" />
      <line x1="104" y1="50" x2="404" y2="50" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
      <circle cx="120" cy="38" r="3.4" fill="currentColor" opacity="0.85" />
      <circle cx="132" cy="38" r="3.4" fill="currentColor" opacity="0.5" />
      <circle cx="144" cy="38" r="3.4" fill="currentColor" opacity="0.28" />
      <line x1="330" y1="38" x2="388" y2="38" stroke="currentColor" strokeWidth="1.2" opacity="0.45" />

      {/* Trefferliste */}
      {rows.map((y, i) => (
        <g key={`r-${y}`}>
          <circle cx="124" cy={y - 4} r="4" fill="currentColor" opacity={i === 0 ? 0.95 : 0.5} />
          <line x1="138" y1={y - 8} x2={138 + 88 - i * 12} y2={y - 8} stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
          <line x1="138" y1={y} x2={138 + 56 - i * 8} y2={y} stroke="currentColor" strokeWidth="1.2" opacity="0.45" />
        </g>
      ))}

      {/* Bewertungs-Karte mit Score */}
      <rect x="256" y="62" width="132" height="102" rx="11" fill="url(#card-glass-c)" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="286" cy="92" r="17" fill="currentColor" opacity="0.22" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="286" cy="92" r="9" fill="currentColor" opacity="0.85" />
      <line x1="312" y1="84" x2="374" y2="84" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      <line x1="312" y1="92" x2="360" y2="92" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
      <line x1="312" y1="100" x2="368" y2="100" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      {[120, 134, 148].map((y, i) => (
        <g key={`b-${y}`}>
          <rect x="268" y={y} width={96 - i * 16} height="6" rx="3" fill="currentColor" opacity={0.5 - i * 0.14} />
        </g>
      ))}
    </svg>
  );
}

export function ProjectDiagram({ kind }: { kind: DiagramKind }) {
  if (kind === 'network') return <NetworkDiagram />;
  if (kind === 'blocks') return <BlocksDiagram />;
  return <PanelDiagram />;
}
