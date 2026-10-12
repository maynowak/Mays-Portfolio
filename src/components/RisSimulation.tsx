import { useEffect, useState } from 'react';
import { simulationSteps } from '../data/portfolio';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const STEP_MS = 1900;

/**
 * Lokale, simulierte Architekturansicht des Mays-RIS-Laufzeitpfads.
 * Keine echte AWS-Ausführung — alle Zustände laufen ausschließlich im Browser.
 */
export default function RisSimulation() {
  const reducedMotion = usePrefersReducedMotion();
  const lastIndex = simulationSteps.length - 1;

  /** -1 = bereit/idle, 0..n-1 = aktiver Schritt */
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing || step >= lastIndex) return;
    const timer = window.setTimeout(() => {
      const next = Math.min(step + 1, lastIndex);
      setStep(next);
      if (next >= lastIndex) setPlaying(false);
    }, STEP_MS);
    return () => window.clearTimeout(timer);
  }, [playing, step, lastIndex]);

  const start = () => {
    if (step < 0 || step >= lastIndex) setStep(0);
    setPlaying(true);
  };
  const pause = () => setPlaying(false);
  const reset = () => {
    setPlaying(false);
    setStep(-1);
  };
  const goBack = () => {
    setPlaying(false);
    setStep((current) => Math.max(current - 1, 0));
  };
  const goNext = () => {
    setPlaying(false);
    setStep((current) => Math.min(current + 1, lastIndex));
  };
  const jumpTo = (index: number) => {
    setPlaying(false);
    setStep(index);
  };

  const progress = step < 0 ? 0 : (step / lastIndex) * 100;
  const current = step >= 0 ? simulationSteps[step] : null;
  const finished = step >= lastIndex && !playing;

  return (
    <section className="sim" aria-label="Architektur-Simulation des Mays-RIS-Laufzeitpfads">
      <div className="sim__header">
        <span className="sim__badge">Architektur-Simulation</span>
        <p className="sim__note">Lokale, vereinfachte Darstellung — keine echte AWS-Ausführung.</p>
      </div>

      <div className="sim__scroll">
        <div className="sim__track">
          <div className="sim__rail" aria-hidden="true">
            <div className="sim__rail-fill" style={{ width: `${progress}%` }} />
            <div className="sim__packet" style={{ left: `${progress}%` }} />
          </div>
          {simulationSteps.map((simStep, index) => {
            const isActive = index === step;
            const isDone = step >= 0 && index < step;
            const classes = [
              'sim__node',
              isActive ? 'sim__node--active' : '',
              isDone ? 'sim__node--done' : '',
            ]
              .filter(Boolean)
              .join(' ');
            return (
              <button
                key={simStep.id}
                type="button"
                className={classes}
                aria-current={isActive ? 'step' : undefined}
                aria-label={`Schritt ${index + 1}: ${simStep.title}`}
                onClick={() => jumpTo(index)}
              >
                <span className="sim__node-circle" aria-hidden="true">
                  {index + 1}
                </span>
                <span className="sim__node-label">{simStep.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="sim__panel" role="status">
        {current ? (
          <>
            <p className="sim__panel-step">
              Schritt {step + 1} von {simulationSteps.length}
            </p>
            <p className="sim__panel-title">{current.title}</p>
            <p className="sim__panel-text">{current.explanation}</p>
          </>
        ) : (
          <>
            <p className="sim__panel-step">Bereit</p>
            <p className="sim__panel-text">
              Starte die Simulation oder wähle einen Schritt, um den Weg einer Anfrage durch
              Mays-RIS nachzuvollziehen.
            </p>
          </>
        )}
        {finished && (
          <p className="sim__hint">Durchlauf abgeschlossen — „Zurücksetzen“ startet von vorn.</p>
        )}
      </div>

      <div className="sim__controls">
        {!reducedMotion && !playing && (
          <button type="button" className="sim__button sim__button--primary" onClick={start}>
            ▶ Start
          </button>
        )}
        {!reducedMotion && playing && (
          <button type="button" className="sim__button sim__button--primary" onClick={pause}>
            ⏸ Pause
          </button>
        )}
        <button type="button" className="sim__button" onClick={goBack} disabled={step <= 0}>
          ← Zurück
        </button>
        <button type="button" className="sim__button" onClick={goNext} disabled={step >= lastIndex}>
          Weiter →
        </button>
        <button
          type="button"
          className="sim__button"
          onClick={reset}
          disabled={step < 0 && !playing}
        >
          ⟲ Zurücksetzen
        </button>
      </div>

      {reducedMotion && (
        <p className="sim__hint">
          Reduzierte Bewegung ist aktiv: Der automatische Ablauf pausiert — alle Schritte bleiben
          einzeln wählbar.
        </p>
      )}
    </section>
  );
}
