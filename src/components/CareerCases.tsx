import { useEffect, useRef } from 'react';
import type { CaseStudy } from '../data/career';
import { caseStudies, illustrationNote } from '../data/career';
import { projects, profile } from '../data/portfolio';
import { ArrowIcon, GithubIcon } from './icons';

/* ---------- Abstrakte Fallbeispiel-Illustrationen (keine echten Systeme) ---------- */

function CaseIllustration({ kind }: { kind: CaseStudy['illustration'] }) {
  if (kind === 'data') {
    return (
      <svg viewBox="0 0 240 104" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="case-a" x1="0" y1="0" x2="1" y2="1">
            <stop className="case-stop-1" offset="0%" />
            <stop className="case-stop-2" offset="100%" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="94" rx="104" ry="9" className="case-floor" />
        {[28, 62, 96, 130, 164, 198].map((x, i) => (
          <path key={x} className="case-grid" d={`M${x} 94 L${x + 18} 66`} strokeDasharray={i % 2 ? '3 5' : undefined} />
        ))}
        <rect x="34" y="22" width="172" height="46" rx="10" fill="url(#case-a)" className="case-shell" />
        <circle cx="60" cy="45" r="11" className="case-node" />
        <circle cx="120" cy="45" r="11" className="case-node" />
        <circle cx="180" cy="45" r="11" className="case-node" />
        <path className="case-wire" d="M71 45 L109 45 M131 45 L169 45" />
        <path className="case-flow" d="M34 45 L206 45" />
      </svg>
    );
  }

  if (kind === 'services') {
    return (
      <svg viewBox="0 0 240 104" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="case-b" x1="0" y1="0" x2="1" y2="1">
            <stop className="case-stop-1" offset="0%" />
            <stop className="case-stop-2" offset="100%" />
          </linearGradient>
        </defs>
        <ellipse cx="120" cy="94" rx="104" ry="9" className="case-floor" />
        <path className="case-shell" d="M46 14 L74 30 L74 62 L46 78 L18 62 L18 30 Z" fill="url(#case-b)" />
        <path className="case-shell" d="M120 20 L148 36 L148 68 L120 84 L92 68 L92 36 Z" fill="url(#case-b)" />
        <path className="case-shell" d="M194 14 L222 30 L222 62 L194 78 L166 62 L166 30 Z" fill="url(#case-b)" />
        <path className="case-wire" d="M74 46 L92 46 M148 46 L166 46" />
        <path className="case-flow" d="M18 46 L222 46" />
        <circle cx="46" cy="46" r="6" className="case-node" />
        <circle cx="120" cy="52" r="6" className="case-node" />
        <circle cx="194" cy="46" r="6" className="case-node" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 240 104" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="case-c" x1="0" y1="0" x2="1" y2="1">
          <stop className="case-stop-1" offset="0%" />
          <stop className="case-stop-2" offset="100%" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="94" rx="104" ry="9" className="case-floor" />
      <rect x="30" y="20" width="180" height="54" rx="9" fill="url(#case-c)" className="case-shell" />
      <path className="case-wire" d="M52 34 h30 M52 46 h44 M52 58 h24" />
      <rect x="120" y="28" width="74" height="38" rx="7" className="case-shell" />
      <circle cx="140" cy="47" r="8" className="case-node" />
      <path className="case-wire" d="M154 40 h28 M154 48 h20 M154 56 h24" />
      <path className="case-flow" d="M30 74 L210 74" />
    </svg>
  );
}

/* ---------- Fallbeispiele ---------- */

export function CaseStudies() {
  return (
    <section className="quick-section" aria-labelledby="case-title">
      <h4 id="case-title">Enterprise-Fallbeispiele</h4>
      <div className="case-grid">
        {caseStudies.map((item) => (
          <article key={item.id} className="case-card">
            <div className="case-card__media">
              <CaseIllustration kind={item.illustration} />
            </div>
            <h5 className="case-card__client">{item.client}</h5>
            <p className="case-card__scope">{item.scope}</p>
            <ul className="case-card__list">
              {item.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="case-card__note">
              {item.client === 'Deutsche Bahn'
                ? '„RIS im Projektumfeld Deutsche Bahn“ — getrennt vom Projekt Mays-RIS.'
                : illustrationNote}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- Rekrutier-Schnellansicht (Modal) ---------- */

interface RecruiterModalProps {
  open: boolean;
  onClose: () => void;
}

export function RecruiterModal({ open, onClose }: RecruiterModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Fokusführung: Fokus bleibt im Dialog.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      restoreRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-modal-title"
        ref={dialogRef}
      >
        <div className="modal__head">
          <div>
            <p className="eyebrow">Profil auf einen Blick</p>
            <h3 className="modal__title" id="recruiter-modal-title">
              {profile.role} · {profile.field}
            </h3>
          </div>
          <button
            type="button"
            className="modal__close"
            onClick={onClose}
            ref={closeRef}
            aria-label="Ansicht schließen"
          >
            ✕
          </button>
        </div>

        <p className="modal__lead">
          {profile.name} verbindet Enterprise-Softwareentwicklung und Systemintegration mit einem
          aktuellen Schwerpunkt auf Cloud-Architektur und AI Engineering.
        </p>

        <div className="quick-facts">
          <div className="quick-fact">
            <strong>{profile.degree}</strong>
            <span>Hochschule Darmstadt — bestätigt</span>
          </div>
          <div className="quick-fact">
            <strong>Langjährige Erfahrung</strong>
            <span>Enterprise-Software, Systemintegration, Architektur</span>
          </div>
          <div className="quick-fact">
            <strong>Enterprise & Daten</strong>
            <span>Java/J2EE, Webservices, Migration, GIS, Datenbanken</span>
          </div>
          <div className="quick-fact">
            <strong>Cloud & AI</strong>
            <span>AWS, Terraform, serverlos, Agentenplattformen, KI-Integration</span>
          </div>
        </div>

        <section className="quick-section">
          <h4>Aktuelle Projekte</h4>
          <div className="quick-projects">
            {projects.map((project) => (
              <div key={project.id} className="quick-project">
                <span className="quick-project__name">{project.name}</span>
                <span className="quick-project__desc">{project.tagline}</span>
                <span className="quick-project__links">
                  <a className="link-chip" href={project.links.github} target="_blank" rel="noreferrer">
                    <GithubIcon />
                    Repository
                    <ArrowIcon />
                  </a>
                  {project.links.live && (
                    <a className="link-chip" href={project.links.live} target="_blank" rel="noreferrer">
                      Live-Demo
                      <ArrowIcon />
                    </a>
                  )}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="quick-section">
          <h4>Dokumentierte Arbeitsweisen</h4>
          <ul className="quick-methods">
            <li>Automatisierte Tests und nachvollziehbare Testnachweise im Repository</li>
            <li>Architektur-, API- und Roadmap-Dokumentation als Teil des Projekts</li>
            <li>Getrennte Kennzeichnung von verifizierten, vorbereiteten und historischen Funktionen</li>
            <li>Versionierte Installer mit Plan, Validierung und Policy Gate</li>
          </ul>
        </section>

        <div className="modal__footer">
          <p className="modal__footer-note">
            Weitere Details, Reifegrade und Quellen sind im Portfolio dokumentiert. Zeitraum- und
            Vertragsangaben früherer Stationen sind vor Veröffentlichung abzugleichen.
          </p>
          <a className="btn btn--primary" href={profile.github} target="_blank" rel="noreferrer">
            <GithubIcon />
            github.com/maynowak
            <ArrowIcon />
          </a>
        </div>
      </div>
    </div>
  );
}
