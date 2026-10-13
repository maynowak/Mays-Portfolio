# EXECUTION LOG — 05 / MAY-PORTFOLIO-CAREER-UNIVERSE-01

Execution Log gemäß Template `docs/AI_AUDITLOG.md`. Der fortlaufende
Projektverlauf steht in `docs/AI_AUDITLOG.md`.

---

- **Aktueller Status:** ABGESCHLOSSEN (vor Push)
- **Datum/Zeit:** 2026-10-13
- **Git-Branch / HEAD:** `career-universe-01` (auf `main`, `4bfc3da`)
- **Scope:** Career Universe in „Über mich", Enterprise-Fallbeispiele,
  Recruiter-Schnellansicht.
- **Klassifikation:** GREEN

## Quelle (wichtig)

Die angegebene Datei `May_Nowak_CV_Karrierehighlights_Portfolio_2026-10-13(2).pdf`
existiert unter diesem Namen **nicht**. Gefunden und verwendet wurde:

`~/Downloads/May_Nowak_CV_Karrierehighlights_Portfolio_2026-10-13.pdf`
(56 KB, Website-Content-Brief, Stand 13.10.2026), ausgelesen mit
`pdftotext -layout`. Inhaltlich deckungsgleich mit der im Auftrag
zusammengefassten Stationsliste; Bestätigungssatz der Aufgabe:
B.Sc. Informatik, **Hochschule Darmstadt**.

Nicht vorhanden und deshalb nicht verwendet: die dort genannten früheren
CV-Dateien „Gregor_Nowak_CV_Portfolio_edel_tuerkis.pdf" und
„NOWAK_CV_ATS_DataCentre_Architecture.pdf" (nicht geprüft, nicht behauptet).

## Zurückgehaltene Angaben (bewusst nicht öffentlich)

| Angabe | Grund |
|---|---|
| Weiterbildung: Dauer, Zeitraum 03/2026–10/2026, Abschluss | laut Briefing „noch nicht konsolidiert" |
| AWS-/Terraform-Prüfungen | laut Brief Ziele („in Vorbereitung"), nicht bestanden |
| Exakte Vertrags-/Arbeitgeberbezeichnungen | laut Brief vor Veröffentlichung abzugleichen |
| Teamgrößen, Budget, Verantwortungsumfang, Verfügbarkeit | nicht belegt |
| Remote-Erfahrung | nicht belegt |
| Interne Architekturen der genannten Systeme | nicht rekonstruiert |

Öffentlich formuliert wird ausschließlich „Ausgewählte Projektpraxis" und
„Projektumfeld" sowie weiterhin „Langjährige Erfahrung" ohne Jahreszahl.
Interne Quellvermerke stehen in `src/data/career.ts` (Feld `sourceNote`).

## Abgeschlossene Abschnitte

- [x] `docs/AI_AUDITLOG.md` vollständig gelesen; Regeln befolgt; fortlaufend fortgeschrieben
- [x] Arbeitsbaum geprüft (sauber), `main` synchronisiert, Feature-Branch angelegt
- [x] PDF-Quelle gesucht und extrahiert (`pdftotext -layout`)
- [x] Typisiertes Datenmodell `src/data/career.ts` (8 Stationen, 5 Kompetenzbereiche, 3 Fallbeispiele)
- [x] Career Universe: Zeitachse, Glasknoten, Umschalter, Filter, Detailpanel
- [x] Fallbeispiele (Deutsche Bahn, BaFin, Deutscher Zoll) mit abstrakten Illustrationen
- [x] Recruiter-Schnellansicht als Modal (Fokusführung, Escape, Fokusrückgabe)
- [x] Mobil: vertikale Timeline mit allen Funktionen
- [x] Bewegung: Pause bei verborgenem Tab, außerhalb des Viewports und bei `prefers-reduced-motion`
- [x] Build, Lint, TypeScript, 74 Career-Prüfungen und 46 Bestandsprüfungen

## Befunde (gemessen)

**Zwei echte Fehler während der Umsetzung gefunden und behoben:**

1. **Schwarze Glasflächen.** Nur die Deckfläche der Würfel erhielt den
   Verlauf; die Seitenflächen erbten die SVG-Standardfüllung Schwarz. Im
   Browser-Debug verifiziert (Stops und `fill=url(#…)` lösten korrekt auf,
   das Ergebnis war dennoch schwarz). Fix: Verlauf auf der Gruppe, damit
   alle Flächen ihn erben.
2. **Datenimpulse neben der Achse.** `animateMotion` trägt ein Element vom
   Ursprung entlang des Pfads; der Kreis lag zusätzlich bereits auf
   `(x, 210)` und landete dadurch eine viewBox-Höhe zu tief. Fix: `cx/cy = 0`.
   Zusätzlich verhindert ein festes Seitenverhältnis der Landschaft das
   Letterboxing des Achsen-SVG.
3. **„Zeus 2" nicht sichtbar:** Das Feld `context` der Fallbeispiele wurde
   im UI nie ausgegeben — dadurch fehlte der Projektbezug des Zoll-Falls.
4. **Reduced Motion:** Die SMIL-Impulse liefen trotz `prefers-reduced-motion`.
   Sie werden jetzt nur gerendert, wenn Ansicht sichtbar, Tab aktiv und keine
   reduzierte Bewegung gewünscht ist.

**Messfehler eigener Prüfskripte (korrigiert, nicht als Produktfehler gemeldet):**
- Der Footer-Abstand wurde an zwei verschiedenen Scroll-Positionen gemessen
  (Viewport-Koordinaten) und ergab 217 px. An derselben Position gemessen:
  128 px — unverändert zum Ausgangsstand, kein Layoutfehler.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npx tsc -b` | PASS |
| `npm run lint` | PASS (0 Warnungen) |
| `npm run build` | PASS → `dist/index.html` |
| Career-E2E (Playwright/Chrome) | **74/74 PASS**, 0 pageerrors |
| Bestands-E2E (Navigation, Projekte, Simulation, Themes) | **46/46 PASS** |
| Text-Kontraste | alle ≥ WCAG AA |

Geprüft: Ansichtswechsel, alle vier Kompetenzfilter inkl. Statuszeile und
Zähler, Öffnen/Schließen der Stationen (auch aus der Gruppenansicht),
Detailinhalte, Fallbeispiele inkl. „RIS im Projektumfeld Deutsche Bahn",
Recruiter-Ansicht inkl. Fokusfalle/Escape/Fokusrückgabe, Tastaturbedienung
(Enter, Fokusmarkierung, Filter), Touch (44 px+, Tap), Light Mode,
Mobile 390×844, reduzierte Bewegung, Impuls-Pause außerhalb des Viewports,
kein horizontales Scrollen, keine Überlagerungen, Regressionen an Projekten
und Mays-RIS-Simulation.

## Screenshots (Viewport, normale Größe)

- Desktop Dark/Light: `final-cu-dark.png`, `final-cu-light.png`
- Geöffnete Station: `final-cu-dark-station.png`, `final-cu-light-station.png`
- Schnellansicht: `final-cu-modal.png`
- Fallbeispiele: `final-cases-dark.png`, `final-cases-light.png`
- Mobil 390×844: `final-cu-mobile-dark.png`, `final-cu-mobile-light.png`,
  `final-cu-mobile-station.png`, `final-track-mobile-dark.png`,
  `final-track-mobile-light.png`
(Ablage `/tmp/opencode/shots`, nicht Teil des Repos.)

## Git-Status / geänderte Dateien

- `src/data/career.ts` (neu) · `src/hooks/useInView.ts` (neu)
- `src/components/CareerUniverse.tsx` (neu) · `src/components/CareerCases.tsx` (neu)
- `src/components/About.tsx` (erweitert) · `src/styles/global.css` (erweitert)

**Bestätigung:** Keine fremden Änderungen vorhanden oder überschrieben.
Projekt-Detailansichten, Simulation, Navigation, Theme-Persistenz und
`vercel.json` unverändert. Keine neuen Abhängigkeiten, kein 3D-Framework,
keine externen Schriften, keine Tracker, keine Audiodateien.

## Terraform-Checks

GRAY / nicht anwendbar (Web-Frontend ohne Infrastruktur).

## Offene Fragen

- Exakte Vertrags- und Arbeitgeberbezeichnungen sowie Zeiträume der früheren
  Stationen: laut Briefing gegen Originalunterlagen abzugleichen
  (im Datenmodell als `sourceNote` markiert).
- Angaben zur Weiterbildung (Dauer, Zeitraum, Abschluss).
- Jahreszahl der Gesamterfahrung weiterhin offen.
- Vercel-Deployment: Status nicht verifiziert (keine Credentials).

## Risiken

- Die Zeitachse nutzt SMIL (`animateMotion`). Sie wird nur gerendert, wenn
  Bewegung erlaubt und die Ansicht aktiv ist; ohne JavaScript-Ausführung
  bleiben alle Stationen als Buttons bedienbar.
- Illustrationsformen sind abstrakt und als solche gekennzeichnet; ein
  Verwechslungsrisiko mit echten Systemarchitekturen ist damit ausgeschlossen.

## Empfohlene nächste Aktionen

1. Vertrags-/Zeiträume und Weiterbildungsangaben mit Originalunterlagen klären.
2. Vercel-Deployment unter `https://mays-portfolio-six.vercel.app/` prüfen.

## Resume Point

Fertig. Branch `career-universe-01` ist bereit für Push auf `origin/main`
(kein Force-Push).
