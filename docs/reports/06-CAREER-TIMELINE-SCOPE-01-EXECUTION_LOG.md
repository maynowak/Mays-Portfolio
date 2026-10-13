# EXECUTION LOG — 06 / MAY-PORTFOLIO-CAREER-TIMELINE-SCOPE-01

Execution Log gemäß Template `docs/AI_AUDITLOG.md`. Laufender
Projektverlauf: `docs/AI_AUDITLOG.md`.

---

- **Aktueller Status:** ABGESCHLOSSEN (vor Push)
- **Datum/Zeit:** 2026-10-13
- **Git-Branch / HEAD:** `career-timeline-scope-01` (Basis `e9537bb`)
- **Scope:** Kürzung der öffentlichen Karriereansicht gemäß Auftraggeberwunsch.
- **Klassifikation:** GREEN

## Änderungen (alle öffentliche Ansichten konsistent)

| Punkt | Umsetzung |
|---|---|
| Erste sichtbare Station | „2012–10/2019 · Freelance Software Developer" (order 1, x 9%) |
| Frühere Projektpraxis 2008–2012 | Aus Datenmodell entfernt — erscheint in keiner Ansicht, keinem Filter, keiner Schnellansicht |
| BaFin als Timeline-Station | Entfernt; Fallbeispiel erhalten und der Freelance-Phase zugeordnet (sichtbare „Zugeordnet:"-Zeile) |
| Spätere Stationen | Alle erhalten (G+H/Inchorus, 4Brain, 1und1, Kreative Arbeit, Aktuelle Projekte) |
| Zeitachse | 6 Knoten, x = 9/27/45/63/81/95, 6 Stiele, 5 Impulsverbindungen — keine leeren Positionen |
| Kompetenzgruppen | 4 Gruppen, Zähler Java 3 / Daten 2 / DevOps 3 / Cloud & AI 2 |
| Detailauswahl | Erste Station öffnet Freelance-Detail inkl. DB/Zoll/FRAPORT; kein BaFin-Stationstitel |

## Besonderheiten / Befunde

1. **Lokales main war veraltet.** Es stand auf `4bfc3da`, weil die
   vorherigen Tasks direkt vom Feature-Branch nach `origin/main` gepusht
   wurden. Der erste Versuch, `src/data/career.ts` zu bearbeiten, schlug
   fehl (Datei nicht vorhanden) — dadurch rechtzeitig bemerkt. Vor der
   Umsetzung wurde `main` per Fast-Forward auf `e9537bb` nachgezogen; die
   Kürzung basiert nachweislich auf dem vollständigen Career-Universe-Stand.
2. **Ein Prüf-Skriptfehler (kein Produktfehler):** Der Simulationstest
   öffnete die Mays-Orders-Karte statt Mays-RIS — die Simulation gehört
   nur zum RIS-Detail. Test korrigiert.
3. Entfernte Inhalte tauchen im gebauten Bundle nicht mehr auf
   (E2E prüft u. a. „2008", „PHP", „E-Commerce", „BaFin-Projekt",
   „03/2012" gegen alle Ansichten inkl. Filter und Recruiter-Dialog).

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npx tsc -b` | PASS |
| `npm run lint` | PASS (0 Warnungen) |
| `npm run build` | PASS |
| Scope-E2E (Playwright/Chrome) | **55/55 PASS**, 0 pageerrors |
| Bestands-E2E | **46/46 PASS** |

Geprüft: beide Karriereansichten (Zeitachse + Kompetenzgruppen), alle
Filter samt Zählern, Statuszeilen und Dimmung, Detailpanels, Fallbeispiele
inkl. Zuordnungszeile, Recruiter-Schnellansicht, Achsen-Stiele/Impulse,
Projekt-Regressionen, kein horizontales Scrollen, Light Mode, Mobil
(390×844, Tap), Tastatur (Enter auf erster Station), Reduced Motion.

## Screenshots

`scope-cu-dark.png`, `scope-cu-light.png`, `scope-detail-dark.png`,
`scope-detail-light.png`, `scope-mobile.png`
(Ablage `/tmp/opencode/shots`, nicht Teil des Repos.)

## Geänderte Dateien

- `src/data/career.ts` — Stationen gekürzt, Positionen/Reihenfolge
  angepasst, BaFin-Zuordnung dokumentiert, Fallbeispiele mit
  `relatedStationId`
- `src/components/CareerCases.tsx` — Zuordnungszeile am Fallbeispiel
- `src/styles/global.css` — Stil der Zuordnungszeile
- `docs/AI_AUDITLOG.md` — Eintrag
- dieser Report

**Bestätigung:** Keine fremden Änderungen vorhanden oder überschrieben.
Inhalte außerhalb der Karriereansicht unverändert.

## Terraform-Checks

GRAY / nicht anwendbar.

## Offene Fragen

- Unverändert: Vertragsbezeichnungen, Weiterbildungsangaben,
  Jahreszahl der Gesamterfahrung.

## Resume Point

Fertig. Branch bereit für Push auf `origin/main` (kein Force-Push).
