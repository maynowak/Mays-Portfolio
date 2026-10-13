# May Nowak — Portfolio 0.1

Interaktive Portfolio-Webseite für May Nowak.
Positionierung: **Senior Software Architect | Cloud & AI Engineering**.

> Version 0.1 — Proof of concept, statisches Portfolio.
> Für Deployment-Details und offene Inhaltsfragen siehe [docs/reports/01-MAY-PORTFOLIO-FOUNDATION-01-EXECUTION_LOG.md](./docs/reports/01-MAY-PORTFOLIO-FOUNDATION-01-EXECUTION_LOG.md).

## Inhaltsverzeichnis

- [Starten (Entwicklung)](#starten-entwicklung)
- [Build & Typ-Prüfung](#build--typ-prüfung)
- [Preview (lokal)](#preview-lokal)
- [Vercel-Build-Einstellungen](#vercel-build-einstellungen)
- [Technologie](#technologie)
- [Design](#design)
- [Barrierefreiheit](#barrierefreiheit)

---

## Starten (Entwicklung)

```bash
npm install
npm run dev          # Vite-Entwicklungsserver, meist http://localhost:5173
```

## Build & Typ-Prüfung

```bash
npm run lint         # oxlint
npx tsc -b           # strikte TypeScript-Prüfung
npm run build        # tsc -b && vite build  →  ./dist
```

## Preview (lokal)

```bash
npm run preview      # serviert ./dist auf http://localhost:4173
```

## Vercel-Build-Einstellungen

Repository enthält `vercel.json`:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

| Feld        | Wert                |
|-------------|---------------------|
| Framework   | Vite                |
| Build-Befehl| `npm run build`     |
| Ausgabe-Ordner | `dist`           |
| Node-Version | >= 20             |

> **Fix (VERCEL-OUTPUT-FIX-01):** Ohne `.vercel.json` schrieb Vercel
> `No Output Directory named "build" found after the Build completed.`
> — Vite liefert standardmäßig in `dist/`. Die Datei zwingt Vercel dazu,
> `dist` als Output zu nutzen.

## Technologie

- **React 19** · **TypeScript 6** · **Vite 8**
- **Reines CSS** für Layout, Animationen und das Network/SVG.
- **Keine externen Abhängigkeiten / Tracker**: keine fremden Schrift‑anfragen,
  keine API-Keys, kein Analytics. Alles läuft lokal/static.
- Kein Python nötig.

## Design

- Farbschema: **dunkles Dunkelblau** (Standard) mit **leuchtendem Türkis** als Akzent;
  optionales helles Schema über Schalter in der Navigation.
- Große Typografie (Georgia / system-ui), großzügige Abstände, feine
  technische Linien; ein dezentes Service-Raster liegt im Hintergrund.
- Hero zeigt ein interaktives Systemnetz (SVG + CSS): große Glaskörper mit
  Verläufen und Lichtkanten, türkise Verbindungen mit laufenden Datenimpulsen.
  Knoten reagieren auf Maus, Tastatur und Touch.
- Projektkarten zeigen eigene Bildwelten: vernetztes Agentensystem,
  gläserne Workflow-Blöcke, abstrahierte Analyseoberfläche.
- Dekorative Daueranimationen pausieren bei `prefers-reduced-motion`,
  bei verborgenem Browser-Tab und außerhalb des sichtbaren Bereichs.

## Career Universe

Im Bereich „Über mich" verbindet eine interaktive Karriereansicht die
Stationen des beruflichen Wegs mit heutigen Kompetenzen:

- **Zwei Ansichten:** „Beruflicher Weg" (chronologische Zeitachse) und
  „Technische Schwerpunkte" (Stationen nach Kompetenz gruppiert).
- **Kompetenzfilter:** Java & Integration, Daten & Migration, DevOps,
  Cloud & AI — passende Stationen werden hervorgehoben, andere bleiben
  erkennbar (Dimmung, gestrichelte Kontur, Texthinweis).
- **Detailpanel je Station** mit Projektumfeld, belegten Tätigkeiten,
  Technologien und einer als redaktionell gekennzeichneten Einordnung.
- **Drei Enterprise-Fallbeispiele** (Deutsche Bahn, BaFin, Deutscher Zoll)
  mit ausdrücklich abstrakten Illustrationen.
- **„Profil auf einen Blick":** kompakte Recruiter-Ansicht als Dialog mit
  Fokusführung, Escape und Fokusrückgabe.
- Mobilgeräte erhalten eine vertikale Timeline mit denselben Funktionen.

Inhaltliche Grundlage: `May_Nowak_CV_Karrierehighlights_Portfolio_2026-10-13.pdf`.
Offene Punkte (Abgleich von Vertragsbezeichnungen und Zeiträumen, Angaben zur
Weiterbildung) sind in `docs/reports/` dokumentiert.

## Inhalte und Quellen

- Projekt-Reifegrade sind gegen die READMEs der Remote-Branches `main`
  verifiziert (Stand 12.10.2026) und im UI entsprechend gekennzeichnet
  (Implemented / Verified / Prepared / Historisch / Not deployed).
- B.Sc. Informatik: vom Auftraggeber bestätigt.
- Berufserfahrung: ohne Jahreszahl formuliert, da die Zahl noch offen ist.

## Barrierefreiheit

- `prefers-reduced-motion` wird respektiert (Animationen deaktiviert, alle
  Inhalte bleiben nutzbar).
- Fokus-Pfade für Tastaturbedienung (`.focus-visible`).
- Sim-Knoten tastaturbedienbar (`aria-current`, `aria-pressed`).

---

© 2026 May Nowak
