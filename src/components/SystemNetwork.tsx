import { useState } from 'react';
import { usePageActive } from '../hooks/usePageActive';

type NodeId = 'cloud' | 'api' | 'agents' | 'core' | 'queue' | 'worker';
type Shape = 'cube' | 'sphere' | 'poly' | 'orb' | 'blocks' | 'worker';

interface NetNode {
  id: NodeId;
  label: string;
  desc: string;
  x: number;
  y: number;
  shape: Shape;
  /** Radius für die Kanten-Anbindung (Abstand zum Knotenmittelpunkt). */
  r: number;
  labelX: number;
  labelY: number;
  labelAnchor: 'start' | 'middle' | 'end';
}

/** Knoten bewusst groß: Glaskugeln und Körper mit Lichtkanten. */
const NODES: NetNode[] = [
  {
    id: 'core',
    label: 'Core',
    desc: 'Orchestrierungs-Kern: verbindet API, Agents, Queue und Worker.',
    x: 332, y: 244, shape: 'orb', r: 86,
    labelX: 332, labelY: 372, labelAnchor: 'middle',
  },
  {
    id: 'cloud',
    label: 'Cloud',
    desc: 'Cloud-Plattform: serverlose Bausteine statt Serverbetrieb.',
    x: 336, y: 72, shape: 'cube', r: 52,
    labelX: 392, labelY: 78, labelAnchor: 'start',
  },
  {
    id: 'api',
    label: 'API',
    desc: 'Geschützte Schnittstellen (JWT) — der Eingang jedes Auftrags.',
    x: 120, y: 166, shape: 'sphere', r: 42,
    labelX: 66, labelY: 172, labelAnchor: 'end',
  },
  {
    id: 'agents',
    label: 'Agents',
    desc: 'Agentic Systems: spezialisierte Einheiten mit klarer Aufgabe.',
    x: 536, y: 212, shape: 'poly', r: 52,
    labelX: 588, labelY: 216, labelAnchor: 'start',
  },
  {
    id: 'queue',
    label: 'Queue',
    desc: 'Asynchrone Entkopplung: Aufträge warten verlässlich in der Queue.',
    x: 146, y: 386, shape: 'blocks', r: 52,
    labelX: 146, labelY: 452, labelAnchor: 'middle',
  },
  {
    id: 'worker',
    label: 'Worker',
    desc: 'Worker: nehmen Work Items entgegen und führen sie nachvollziehbar aus.',
    x: 430, y: 392, shape: 'worker', r: 42,
    labelX: 430, labelY: 458, labelAnchor: 'middle',
  },
];

interface Edge {
  a: NodeId;
  b: NodeId;
  dashed?: boolean;
}

const EDGES: Edge[] = [
  { a: 'cloud', b: 'core' },
  { a: 'cloud', b: 'agents', dashed: true },
  { a: 'api', b: 'core' },
  { a: 'api', b: 'queue', dashed: true },
  { a: 'agents', b: 'core' },
  { a: 'core', b: 'queue' },
  { a: 'core', b: 'worker' },
  { a: 'agents', b: 'worker', dashed: true },
  { a: 'queue', b: 'worker' },
];

/** Kanten mit laufendem Datenimpuls — ruhig, aber sichtbar. */
const FLOW_EDGES: ReadonlyArray<readonly [NodeId, NodeId]> = [
  ['api', 'core'],
  ['core', 'queue'],
  ['queue', 'worker'],
  ['core', 'agents'],
  ['cloud', 'core'],
];

function nodeById(id: NodeId): NetNode {
  const node = NODES.find((n) => n.id === id);
  if (!node) throw new Error(`Unbekannter Knoten: ${id}`);
  return node;
}

function edgePath(a: NetNode, b: NetNode, bend: number): string {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const sx = a.x + (dx / len) * a.r;
  const sy = a.y + (dy / len) * a.r;
  const ex = b.x - (dx / len) * b.r;
  const ey = b.y - (dy / len) * b.r;
  const mx = (sx + ex) / 2 - (dy / len) * bend;
  const my = (sy + ey) / 2 + (dx / len) * bend;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

/** Glaskörper: Verlaufsfläche + Lichtkante + inneres Detailgeflecht. */
function NodeShape({ shape }: { shape: Shape }) {
  switch (shape) {
    case 'orb':
      return (
        <>
          <circle className="node__glass" r="80" />
          <circle className="node__shell" r="80" />
          <circle className="node__rim" r="80" />
          <circle className="node__wire" r="58" strokeDasharray="2 7" />
          <ellipse className="node__wire" rx="80" ry="26" />
          <ellipse className="node__wire" rx="26" ry="80" />
          <circle className="node__spec" cx="-26" cy="-32" r="13" />
        </>
      );
    case 'sphere':
      return (
        <>
          <circle className="node__glass" r="38" />
          <circle className="node__shell" r="38" />
          <circle className="node__rim" r="38" />
          <ellipse className="node__wire" rx="38" ry="13" />
          <circle className="node__spec" cx="-12" cy="-15" r="7" />
        </>
      );
    case 'worker':
      return (
        <>
          <circle className="node__glass" r="36" />
          <circle className="node__shell" r="36" />
          <circle className="node__rim" r="36" />
          <path className="node__wire" d="M-11 -15 L4 6 L11 -15 M-3 -1 L-11 15" />
          <circle className="node__spec" cx="-12" cy="-14" r="6" />
        </>
      );
    case 'poly':
      return (
        <>
          <path className="node__glass" d="M48 0 L24 41.6 L-24 41.6 L-48 0 L-24 -41.6 L24 -41.6 Z" />
          <path className="node__shell" d="M48 0 L24 41.6 L-24 41.6 L-48 0 L-24 -41.6 L24 -41.6 Z" />
          <path
            className="node__wire"
            d="M48 0 L-24 -41.6 L-24 41.6 Z M-48 0 L24 -41.6 L24 41.6 Z M-24 -41.6 L24 -41.6 M-24 41.6 L24 41.6"
          />
          <circle className="node__node" cx="0" cy="0" r="4" />
        </>
      );
    case 'cube':
      return (
        <>
          <path className="node__glass" d="M0 -38 L33 -19 L0 0 L-33 -19 Z" />
          <path className="node__glass" d="M-33 -19 L0 0 L0 38 L-33 19 Z" />
          <path className="node__glass" d="M0 0 L33 -19 L33 19 L0 38 Z" />
          <path className="node__shell" d="M0 -38 L33 -19 L0 0 L-33 -19 Z" />
          <path className="node__shell" d="M-33 -19 L0 0 L0 38 L-33 19 Z" />
          <path className="node__shell" d="M0 0 L33 -19 L33 19 L0 38 Z" />
          <path className="node__wire" d="M-33 -19 L-33 19 M0 0 L33 -19" />
        </>
      );
    case 'blocks':
      return (
        <>
          <rect className="node__glass" x="-52" y="-21" width="32" height="42" rx="7" />
          <rect className="node__glass" x="-16" y="-21" width="32" height="42" rx="7" />
          <rect className="node__glass" x="20" y="-21" width="32" height="42" rx="7" />
          <rect className="node__shell" x="-52" y="-21" width="32" height="42" rx="7" />
          <rect className="node__shell" x="-16" y="-21" width="32" height="42" rx="7" />
          <rect className="node__shell" x="20" y="-21" width="32" height="42" rx="7" />
          <path className="node__wire" d="M-36 -6 v12 M0 -6 v12 M36 -6 v12" />
        </>
      );
  }
}

/**
 * Interaktives Systemnetz im Hero: große Glaskörper, türkise Verbindungen
 * mit Datenimpulsen. Knoten reagieren auf Hover, Tastaturfokus und Touch.
 */
export default function SystemNetwork() {
  const [activeId, setActiveId] = useState<NodeId | null>(null);
  const pageActive = usePageActive();
  const active = activeId ? nodeById(activeId) : null;

  return (
    <figure className={`system-network${pageActive ? '' : ' system-network--idle'}`}>
      <figcaption className="network-title">Interaktives Systemnetz</figcaption>
      <svg
        viewBox="0 0 660 490"
        role="group"
        aria-label="Systemnetz: sechs Knoten — Cloud, API, Core, Agents, Queue und Worker"
      >
        <defs>
          <radialGradient id="mn-glass" cx="38%" cy="30%" r="72%">
            <stop className="glass-stop-1" offset="0%" />
            <stop className="glass-stop-2" offset="55%" />
            <stop className="glass-stop-3" offset="100%" />
          </radialGradient>
          <radialGradient id="mn-glass-deep" cx="35%" cy="26%" r="78%">
            <stop className="glass-stop-4" offset="0%" />
            <stop className="glass-stop-2" offset="60%" />
            <stop className="glass-stop-3" offset="100%" />
          </radialGradient>
          <radialGradient id="mn-spec" cx="50%" cy="50%" r="50%">
            <stop className="spec-stop-1" offset="0%" />
            <stop className="spec-stop-2" offset="100%" />
          </radialGradient>
        </defs>

        {/* Bodenebene: verleiht dem Bild räumliche Tiefe */}
        <ellipse className="network__floor" cx="330" cy="470" rx="300" ry="34" />
        <ellipse className="network__floor network__floor--mid" cx="330" cy="462" rx="215" ry="24" />
        <g className="network__grid" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <path key={`gl-${i}`} d={`M${30 + i * 60} 470 L${160 + i * 60} 402`} />
          ))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path key={`gr-${i}`} d={`M${120 + i * 42} 470 L${120 + i * 42} 434`} />
          ))}
        </g>

        <ellipse className="network__orbit" cx="330" cy="248" rx="286" ry="152" />
        <ellipse className="network__orbit" cx="330" cy="248" rx="286" ry="64" transform="rotate(-12 330 248)" />

        <g aria-hidden="true">
          {EDGES.map((edge, i) => {
            const d = edgePath(nodeById(edge.a), nodeById(edge.b), i % 2 === 0 ? 26 : -26);
            const isActive = activeId === edge.a || activeId === edge.b;
            return (
              <path
                key={`${edge.a}-${edge.b}`}
                className={`network__edge${edge.dashed ? ' network__edge--dashed' : ''}${isActive ? ' network__edge--active' : ''}`}
                d={d}
              />
            );
          })}
          {FLOW_EDGES.map(([a, b], i) => (
            <path
              key={`flow-${a}-${b}`}
              className="network__flow"
              d={edgePath(nodeById(a), nodeById(b), i % 2 === 0 ? 26 : -26)}
            />
          ))}
        </g>

        {NODES.map((node) => (
          <g
            key={node.id}
            role="button"
            tabIndex={0}
            aria-pressed={activeId === node.id}
            aria-label={`${node.label}: ${node.desc}`}
            className={`network__node${activeId === node.id ? ' network__node--active' : ''}`}
            transform={`translate(${node.x} ${node.y})`}
            onMouseEnter={() => setActiveId(node.id)}
            onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(node.id)}
            onBlur={() => setActiveId(null)}
            onClick={() => setActiveId((current) => (current === node.id ? null : node.id))}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                setActiveId((current) => (current === node.id ? null : node.id));
              }
            }}
          >
            <g>
              <NodeShape shape={node.shape} />
            </g>
            <text
              className="node__label"
              x={node.labelX - node.x}
              y={node.labelY - node.y}
              textAnchor={node.labelAnchor}
              aria-hidden="true"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="network-caption" aria-live="polite">
        {active ? (
          <>
            <strong>{active.label}</strong>
            {active.desc}
          </>
        ) : (
          'Knoten berühren oder mit der Tastatur fokussieren, um die Bausteine zu erkunden.'
        )}
      </p>
    </figure>
  );
}
