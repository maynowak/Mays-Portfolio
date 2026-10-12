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

| Feld        | Wert                |
|-------------|---------------------|
| Framework   | Vite                |
| Build-Befehl| `npm run build`     |
| Ausgabe-Ordner | `dist`           |
| Node-Version | >= 20             |

Keine Framework-Presets zwingend nötig — Vite wird erkannt.
Produktiv kann zusätzlich `npm run lint && npx tsc -b` als **Build Command**
hinter `npm run build` gelegt werden (bei Bedarf).

## Technologie

- **React 19** · **TypeScript 6** · **Vite 8**
- **Reines CSS** für Layout, Animationen und das Network/SVG.
- **Keine externen Abhängigkeiten / Tracker**: keine fremden Schrift‑anfragen,
  keine API-Keys, kein Analytics. Alles läuft lokal/static.
- Kein Python nötig.

## Design

- Farbschema: **dunkles Dunkelblau** (Standard) mit **leuchtendem Türkis** als Akzent;
  optionales helles Schema über Schalter unten rechts einblendbar.
- Große Typografie (Georgia / system-ui), großzügige Abstände, feine
  technische Linien; ein dezentes Service-Raster liegt im Hintergrund.
- Hero zeigt ein interaktives Systemnetz (SVG + CSS): Knoten reagieren auf
  Maus, Tastatur und Touch.

## Barrierefreiheit

- `prefers-reduced-motion` wird respektiert (Animationen deaktiviert, alle
  Inhalte bleiben nutzbar).
- Fokus-Pfade für Tastaturbedienung (`.focus-visible`).
- Sim-Knoten tastaturbedienbar (`aria-current`, `aria-pressed`).

---

© 2026 May Nowak
