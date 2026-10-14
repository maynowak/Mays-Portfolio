import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CareerStation, FocusId } from '../data/career';
import {
  careerIntro,
  careerStations,
  careerTitle,
  focusAreas,
  focusFilters,
} from '../data/career';
import { useInView } from '../hooks/useInView';
import { usePageActive } from '../hooks/usePageActive';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type ViewMode = 'weg' | 'schwerpunkte';

const shapeOf = (station: CareerStation) =>
  focusAreas.find((f) => f.id === station.focuses[0])?.shape ?? 'sphere';

/** Glasknoten — Formen unterscheiden die Kompetenzbereiche visuell. */
function NodeGlyph({ station }: { station: CareerStation }) {
  const shape = shapeOf(station);
  // Der Glasverlauf liegt auf der Gruppe: alle Flächen erben ihn,
  // sonst würden Flächen ohne fill-Attribut schwarz bleiben.
  const glass = `url(#cu-glass-${station.id})`;

  return (
    <svg viewBox="0 0 96 96" className="cu-glyph" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id={`cu-glass-${station.id}`} cx="36%" cy="30%" r="70%">
          <stop className="cu-stop-1" offset="0%" />
          <stop className="cu-stop-2" offset="62%" />
          <stop className="cu-stop-3" offset="100%" />
        </radialGradient>
      </defs>

      {shape === 'sphere' && (
        <>
          <circle className="cu-glass" cx="48" cy="48" r="38" fill={glass} />
          <circle className="cu-shell" cx="48" cy="48" r="38" />
          <ellipse className="cu-wire" cx="48" cy="48" rx="38" ry="13" />
          <ellipse className="cu-wire" cx="48" cy="48" rx="13" ry="38" />
          <path className="cu-rim" d="M48 10 a38 38 0 0 1 0 76" />
          <circle className="cu-spec" cx="33" cy="32" r="9" />
        </>
      )}

      {shape === 'cube' && (
        <>
          <g fill={glass}>
            <path d="M48 12 L82 32 L48 52 L14 32 Z" />
            <path d="M14 32 L48 52 L48 88 L14 68 Z" />
            <path d="M48 52 L82 32 L82 68 L48 88 Z" />
          </g>
          <path className="cu-shell" d="M48 12 L82 32 L48 52 L14 32 Z" />
          <path className="cu-shell" d="M14 32 L48 52 L48 88 L14 68 Z" />
          <path className="cu-shell" d="M48 52 L82 32 L82 68 L48 88 Z" />
          <path className="cu-wire" d="M14 32 L14 68 M48 52 L82 32" />
          <path className="cu-rim" d="M48 12 L82 32" />
        </>
      )}

      {shape === 'hexa' && (
        <>
          <path className="cu-glass" d="M48 10 L81 29 L81 67 L48 86 L15 67 L15 29 Z" fill={glass} />
          <path className="cu-shell" d="M48 10 L81 29 L81 67 L48 86 L15 67 L15 29 Z" />
          <path className="cu-wire" d="M48 10 L81 67 L15 67 Z M15 29 L81 29 L48 86 Z" />
          <path className="cu-rim" d="M48 10 L81 29" />
          <circle className="cu-dot" cx="48" cy="48" r="4" />
        </>
      )}

      {shape === 'poly' && (
        <>
          <path className="cu-glass" d="M48 8 L84 30 L72 74 L24 74 L12 30 Z" fill={glass} />
          <path className="cu-shell" d="M48 8 L84 30 L72 74 L24 74 L12 30 Z" />
          <path className="cu-wire" d="M48 8 L72 74 M84 30 L24 74 M12 30 L72 74 L48 8 L24 74" />
          <path className="cu-rim" d="M48 8 L84 30" />
          <circle className="cu-dot" cx="48" cy="44" r="4.5" />
        </>
      )}

      {shape === 'diamond' && (
        <>
          <path className="cu-glass" d="M48 8 L86 48 L48 88 L10 48 Z" fill={glass} />
          <path className="cu-shell" d="M48 8 L86 48 L48 88 L10 48 Z" />
          <path className="cu-wire" d="M48 8 L48 88 M10 48 L86 48" />
          <path className="cu-rim" d="M48 8 L86 48" />
          <circle className="cu-spec" cx="38" cy="34" r="7" />
        </>
      )}
    </svg>
  );
}

export default function CareerUniverse() {
  const { ref: viewRef, inView } = useInView<HTMLDivElement>();
  const pageActive = usePageActive();
  const reducedMotion = usePrefersReducedMotion();
  const [mode, setMode] = useState<ViewMode>('weg');
  const [filter, setFilter] = useState<FocusId | 'alle'>('alle');
  const [openId, setOpenId] = useState<string | null>(null);

  // ---- Navigation zwischen Knoten und Detailpanel ----
  /** 'open' | 'close' — wird nach dem Rendern genau einmal abgearbeitet. */
  const pendingActionRef = useRef<'open' | 'close' | null>(null);
  /** Das tatsächlich auslösende Element (Knoten oder Chip). */
  const triggerElRef = useRef<HTMLElement | null>(null);
  const detailTitleRef = useRef<HTMLHeadingElement | null>(null);
  const universeTitleRef = useRef<HTMLHeadingElement | null>(null);

  /**
   * Scrollt mit Sticky-Abstand zur Navigation. Die Nav-Höhe wird live
   * gemessen, nicht hardkodiert. Bei reduzierter Bewegung wird sofort
   * gescrollt, sonst sanft.
   */
  const scrollToWithNavOffset = useCallback(
    (target: HTMLElement) => {
      const nav = document.querySelector<HTMLElement>('.nav');
      const navHeight = nav ? nav.offsetHeight : 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({
        top: Math.max(top, 0),
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [reducedMotion],
  );

  const openStationById = (id: string, trigger: HTMLElement) => {
    // Referenz auf das tatsächlich auslösende Element — nicht auf eine ID,
    // denn in der Kompetenzansicht kann dieselbe Station in mehreren
    // Gruppen erscheinen und der Rücksprung muss zum echten Auslöser führen.
    triggerElRef.current = trigger;
    pendingActionRef.current = 'open';
    setOpenId(id);
  };

  const closeStation = () => {
    pendingActionRef.current = 'close';
    setOpenId(null);
  };

  // Erst ausführen, wenn das Panel gerendert (bzw. entfernt) ist —
  // ein rAF pro Aktion statt einer Timeout-Kette.
  useEffect(() => {
    const action = pendingActionRef.current;
    if (!action) return;
    pendingActionRef.current = null;

    const frame = requestAnimationFrame(() => {
      if (action === 'open') {
        const title = detailTitleRef.current;
        if (title) {
          scrollToWithNavOffset(title);
          // preventScroll: kein zweiter Sprung durch die Fokussetzung.
          title.focus({ preventScroll: true });
        }
        return;
      }

      if (action === 'close') {
        // Auslösendes Element noch im DOM? Sonst (z. B. nach einem
        // Ansichtswechsel) zurück zur Überschrift der Karriereansicht.
        const trigger = triggerElRef.current;
        const target = trigger && trigger.isConnected ? trigger : universeTitleRef.current;
        if (target) {
          scrollToWithNavOffset(target);
          target.focus({ preventScroll: true });
        }
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [openId, reducedMotion, scrollToWithNavOffset]);

  // Dekorative Bewegung nur, wenn die Ansicht sichtbar, der Tab aktiv und
  // keine reduzierte Bewegung gewünscht ist.
  const running = inView && pageActive && !reducedMotion;

  const visibleStations = useMemo<CareerStation[]>(() => {
    if (filter === 'alle') return careerStations;
    const active: FocusId = filter;
    return careerStations.filter((s) => s.focuses.includes(active));
  }, [filter]);

  const matches = (station: CareerStation): boolean =>
    filter === 'alle' || station.focuses.includes(filter);

  const openStation = careerStations.find((s) => s.id === openId) ?? null;

  const grouped = useMemo(
    () =>
      focusAreas
        .filter((f) => f.id !== 'kreativ')
        .map((f) => ({
          focus: f,
          stations: careerStations.filter((s) => s.focuses.includes(f.id)),
        })),
    [],
  );

  const creative = careerStations.find((s) => s.creative) ?? null;

  return (
    <div className="career-universe" ref={viewRef}>
      <header className="career-universe__head">
        <div>
          <p className="eyebrow">Career Universe</p>
          <h3 className="career-universe__title" ref={universeTitleRef} tabIndex={-1}>
            {careerTitle}
          </h3>
          <p className="career-universe__intro">{careerIntro}</p>
        </div>

        <div className="career-switch" role="group" aria-label="Ansicht wählen">
          <button
            type="button"
            className="career-switch__btn"
            aria-pressed={mode === 'weg'}
            onClick={() => setMode('weg')}
          >
            Beruflicher Weg
          </button>
          <button
            type="button"
            className="career-switch__btn"
            aria-pressed={mode === 'schwerpunkte'}
            onClick={() => setMode('schwerpunkte')}
          >
            Technische Schwerpunkte
          </button>
        </div>
      </header>

      <div className="career-filters" role="group" aria-label="Kompetenzfilter">
        {focusFilters.map((f) => {
          const count =
            f.id === 'alle'
              ? careerStations.length
              : careerStations.filter((s) => s.focuses.includes(f.id as FocusId)).length;
          return (
            <button
              key={f.id}
              type="button"
              className="career-filter"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setOpenId(null);
              }}
            >
              <span className="career-filter__label">{f.label}</span>
              <span className="career-filter__count">{count}</span>
            </button>
          );
        })}
      </div>

      <p className="career-status" role="status">
        {filter === 'alle'
          ? `${visibleStations.length} Stationen werden angezeigt.`
          : `${visibleStations.length} von ${careerStations.length} Stationen passen zu „${focusFilters.find((f) => f.id === filter)?.label}".`}
      </p>

      {mode === 'weg' ? (
        <div className={`cu-landscape${running ? '' : ' cu-landscape--idle'}`}>
          <svg className="cu-axis" viewBox="0 0 1000 420" aria-hidden="true">
            <defs>
              <linearGradient id="cu-axis-grad" x1="0" y1="0" x2="1" y2="0">
                <stop className="cu-stop-line-1" offset="0%" />
                <stop className="cu-stop-line-2" offset="100%" />
              </linearGradient>
            </defs>
            <line className="cu-axis__line" x1="0" y1="210" x2="1000" y2="210" />
            {careerStations.map((station) => {
              const x = station.x * 10;
              const up = station.side === 'above';
              const y1 = up ? 118 : 302;
              const y2 = up ? 186 : 234;
              return (
                <path
                  key={station.id}
                  className={`cu-axis__stem${matches(station) ? '' : ' cu-axis__stem--muted'}`}
                  d={`M${x} ${y1} L${x} ${y2}`}
                />
              );
            })}
            <line className="cu-axis__flow" x1="0" y1="210" x2="1000" y2="210" />
            {/* Datenimpulse nur rendern, wenn die Ansicht wirklich läuft:
                so pausieren sie bei verborgenem Tab und außerhalb des Viewports. */}
            {running &&
              careerStations.slice(0, -1).map((station, i) => {
                const next = careerStations[i + 1];
                return (
                  <circle key={`p-${station.id}`} className="cu-axis__pulse" cx="0" cy="0" r="4">
                    {/* animateMotion trägt den Kreis vom Ursprung entlang des
                        Pfads — daher cx/cy bewusst auf 0. */}
                    <animateMotion
                      dur="9s"
                      begin={`-${i * 1.6}s`}
                      repeatCount="indefinite"
                      path={`M${station.x * 10} 210 L${next.x * 10} 210`}
                    />
                  </circle>
                );
              })}
          </svg>

          <ul className="cu-track">
            {careerStations.map((station) => {
              const isOpen = openId === station.id;
              const isMatch = matches(station);
              return (
                <li
                  key={station.id}
                  className={`cu-item cu-item--${station.side}${isOpen ? ' cu-item--open' : ''}${
                    isMatch ? '' : ' cu-item--muted'
                  }`}
                  style={{ left: `${station.x}%` }}
                >
                  <button
                    type="button"
                    className="cu-node"
                    aria-expanded={isOpen}
                    aria-controls="cu-station-detail"
                    data-cu-trigger={station.id}
                    onClick={(event) =>
                      isOpen ? closeStation() : openStationById(station.id, event.currentTarget)
                    }
                  >
                    <span className="cu-node__glyph">
                      <NodeGlyph station={station} />
                    </span>
                    <span className="cu-node__meta">
                      <span className="cu-node__period">{station.period}</span>
                      <span className="cu-node__title">{station.title}</span>
                      <span className="cu-node__focus">
                        {station.focuses.map((f) => focusAreas.find((x) => x.id === f)?.short).join(' · ')}
                      </span>
                      {isMatch ? null : <span className="cu-node__hint">nicht im Filter</span>}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="cu-groups">
          {grouped.map(({ focus, stations }) => {
            const dimmed = filter !== 'alle' && filter !== focus.id;
            return (
              <section key={focus.id} className={`cu-group${dimmed ? ' cu-group--muted' : ''}`}>
                <h4 className="cu-group__title">{focus.label}</h4>
                <ul className="cu-group__list">
                  {stations.map((station) => {
                    const isOpen = openId === station.id;
                    return (
                      <li key={station.id}>
                        <button
                          type="button"
                          className={`cu-chip${isOpen ? ' cu-chip--open' : ''}`}
                          aria-expanded={isOpen}
                          aria-controls="cu-station-detail"
                          data-cu-trigger={station.id}
                          onClick={(event) =>
                            isOpen ? closeStation() : openStationById(station.id, event.currentTarget)
                          }
                        >
                          <span className="cu-chip__period">{station.period}</span>
                          <span className="cu-chip__title">{station.title}</span>
                          <span className="cu-chip__tech">{station.technologies.slice(0, 3).join(' · ')}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      )}

      {creative && mode === 'weg' && (
        <aside className="cu-creative">
          <span className="cu-creative__tag">Außerhalb der IT-Linie</span>
          <p className="cu-creative__text">
            <strong>{creative.period} · {creative.title}:</strong> {creative.activities.join(', ')}.
            Eine kreative Tätigkeit, bewusst getrennt von den technischen Stationen geführt.
          </p>
        </aside>
      )}

      {openStation && (
        <div
          id="cu-station-detail"
          className="cu-detail"
          role="region"
          aria-labelledby="cu-detail-title"
        >
          <div className="cu-detail__head">
            <div>
              <p className="cu-detail__period">{openStation.period}</p>
              <h4 className="cu-detail__title" id="cu-detail-title" ref={detailTitleRef} tabIndex={-1}>
                {openStation.title}
              </h4>
            </div>
            <button
              type="button"
              className="cu-detail__close"
              onClick={closeStation}
              aria-label="Station schließen"
            >
              Schließen
            </button>
          </div>

          <dl className="cu-detail__grid">
            <div className="cu-detail__block">
              <dt>Projektumfeld</dt>
              <dd>{openStation.setting}</dd>
            </div>
            <div className="cu-detail__block">
              <dt>Belegte Tätigkeiten</dt>
              <dd>
                <ul>
                  {openStation.activities.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="cu-detail__block">
              <dt>Technologien</dt>
              <dd>
                <ul className="cu-detail__tech">
                  {openStation.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="cu-detail__block cu-detail__block--today">
              <dt>Verbindung zu heutigen Schwerpunkten</dt>
              <dd>
                <span className="cu-detail__badge">Redaktionelle Einordnung</span>
                {openStation.today}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <p className="career-source-note">
        Angaben aus bereitgestelltem Berufsbriefing (Stand 13.10.2026). Frühere Projektumfelder
        ohne Aussage über Empfehlung, Partnerschaft oder Verantwortungsumfang.
      </p>
    </div>
  );
}
