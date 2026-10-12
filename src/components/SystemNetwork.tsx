import { useState } from 'react';

type NodeId = 'cloud' | 'api' | 'agents' | 'core' | 'queue' | 'worker';
type Shape = 'cube' | 'circle' | 'hexa' | 'orb' | 'sqs' | 'lambda';

interface NetNode {
  id: NodeId;
  label: string;
  desc: string;
  x: number;
  y: number;
  shape: Shape;
  radius: number;
  labelX: number;
  labelY: number;
  labelAnchor: 'start' | 'middle' | 'end';
}

const NODES: NetNode[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    desc: 'Cloud-Plattform: serverlose Bausteine statt Serverbetrieb.',
    x: 322, y: 78, shape: 'cube', radius: 40,
    labelX: 378, labelY: 82, labelAnchor: 'start',
  },
  {
    id: 'api',
    label: 'API',
    desc: 'Geschützte Schnittstellen (JWT) — der Eingang jedes Auftrags.',
    x: 128, y: 158, shape: 'circle', radius: 34,
    labelX: 84, labelY: 162, labelAnchor: 'end',
  },
  {
    id: 'core',
    label: 'Core',
    desc: 'Orchestrierungs-Kern: verbindet API, Agents, Queue und Worker.',
    x: 312, y: 236, shape: 'orb', radius: 62,
    labelX: 312, labelY: 330, labelAnchor: 'middle',
  },
  {
    id: 'agents',
    label: 'Agents',
    desc: 'Agentic Systems: spezialisierte Einheiten mit klarer Aufgabe.',
    x: 508, y: 208, shape: 'hexa', radius: 38,
    labelX: 556, labelY: 212, labelAnchor: 'start',
  },
  {
    id: 'queue',
    label: 'Queue',
    desc: 'Asynchrone Entkopplung: Aufträge warten verlässlich in der Queue.',
    x: 158, y: 372, shape: 'sqs', radius: 42,
    labelX: 158, labelY: 432, labelAnchor: 'middle',
  },
  {
    id: 'worker',
    label: 'Worker',
    desc: 'Worker: nehmen Work Items entgegen und führen sie nachvollziehbar aus.',
    x: 406, y: 384, shape: 'lambda', radius: 36,
    labelX: 406, labelY: 440, labelAnchor: 'middle',
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

/** Kanten, auf denen ein sichtbarer Datenfluss läuft. */
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
  const sx = a.x + (dx / len) * a.radius;
  const sy = a.y + (dy / len) * a.radius;
  const ex = b.x - (dx / len) * b.radius;
  const ey = b.y - (dy / len) * b.radius;
  const mx = (sx + ex) / 2 - (dy / len) * bend;
  const my = (sy + ey) / 2 + (dx / len) * bend;
  return `M ${sx.toFixed(1)} ${sy.toFixed(1)} Q ${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
}

function NodeShape({ shape }: { shape: Shape }) {
  switch (shape) {
    case 'cube':
      return (
        <>
          <path className="node__shape" d="M0 -26 L22.5 -13 L0 0 L-22.5 -13 Z" />
          <path className="node__detail" d="M-22.5 -13 L0 0 L0 26 L-22.5 13 Z" />
          <path className="node__detail" d="M0 0 L22.5 -13 L22.5 13 L0 26 Z" />
        </>
      );
    case 'circle':
      return (
        <>
          <circle className="node__shape" r="30" />
          <circle className="node__detail" r="14" />
          <path className="node__detail" d="M0 -30 V-38 M0 30 V38 M-30 0 H-38 M30 0 H38" />
        </>
      );
    case 'hexa':
      return (
        <>
          <path className="node__shape" d="M34 0 L17 29.4 L-17 29.4 L-34 0 L-17 -29.4 L17 -29.4 Z" />
          <path className="node__detail" d="M34 0 L-17 -29.4 L-17 29.4 Z M-34 0 L17 -29.4 L17 29.4 Z" />
        </>
      );
    case 'orb':
      return (
        <>
          <circle className="node__shape" r="56" />
          <circle className="node__detail" r="40" strokeDasharray="2 6" />
          <ellipse className="node__detail" rx="56" ry="18" />
          <ellipse className="node__detail" rx="18" ry="56" />
        </>
      );
    case 'sqs':
      return (
        <>
          <rect className="node__shape" x="-38" y="-15" width="24" height="30" rx="5" />
          <rect className="node__shape" x="-12" y="-15" width="24" height="30" rx="5" />
          <rect className="node__shape" x="14" y="-15" width="24" height="30" rx="5" />
          <path className="node__detail" d="M-26 -3 v6 M0 -3 v6 M26 -3 v6" />
        </>
      );
    case 'lambda':
      return (
        <>
          <circle className="node__shape" r="30" />
          <path className="node__detail" d="M-9 -13 L3 6 L9 -13 M-3 -1 L-9 13" />
        </>
      );
  }
}

/**
 * Interaktives Systemnetz im Hero. Knoten reagieren auf Hover, Fokus
 * (Tastatur) und Tap (Touch) — die Beschreibung steht im Caption darunter.
 */
export default function SystemNetwork() {
  const [activeId, setActiveId] = useState<NodeId | null>(null);
  const active = activeId ? nodeById(activeId) : null;

  return (
    <figure className="system-network">
      <figcaption className="network-title">Interaktives Systemnetz</figcaption>
      <svg
        viewBox="0 0 640 470"
        role="group"
        aria-label="Systemnetz: sechs Knoten — Cloud, API, Core, Agents, Queue und Worker"
      >
        <ellipse className="network__orbit" cx="318" cy="244" rx="272" ry="148" />
        <ellipse className="network__orbit" cx="318" cy="244" rx="272" ry="60" transform="rotate(-14 318 244)" />

        <g aria-hidden="true">
          {EDGES.map((edge, i) => {
            const d = edgePath(nodeById(edge.a), nodeById(edge.b), i % 2 === 0 ? 22 : -22);
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
              d={edgePath(nodeById(a), nodeById(b), i % 2 === 0 ? 22 : -22)}
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
