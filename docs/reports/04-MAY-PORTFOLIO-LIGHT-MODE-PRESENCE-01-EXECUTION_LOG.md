# EXECUTION LOG — 04 / MAY-PORTFOLIO-LIGHT-MODE-PRESENCE-01

Execution Log gemäß Template `docs/AI_AUDITLOG.md` (wird nach jedem
Meilenstein aktualisiert). Build-Task; Terraform-Checks GRAY.

---

- **Aktueller Status:** ABGESCHLOSSEN (vor Push)
- **Datum/Zeit:** 2026-10-13
- **Git-Branch / HEAD:** `light-mode-presence-01` (auf `main` aufgesetzt, `6d034e8`)
- **Scope:** Sichtbarkeit der Architekturgrafiken im Light Mode (Glaskörper,
  Verbindungen, Datenimpulse, drei Projektgrafiken). Dark Mode, Layout,
  Inhalte und Interaktionen unverändert.
- **Klassifikation:** GREEN

## Abgeschlossene Abschnitte

- [x] `docs/AI_AUDITLOG.md` vollständig gelesen; Regeln befolgt; dieses
      Log **und** AI_AUDITLOG.md fortgeschrieben
- [x] Arbeitsbaum geprüft (sauber, keine fremden Änderungen);
      `main` per Fast-Forward synchronisiert, Feature-Branch angelegt
- [x] Ausgangslage in normaler Anzeigegröße dokumentiert (Vorher-Aufnahmen)
- [x] Hero-Glaswerte im Light Mode verstärkt (weniger Transparenz)
- [x] Light-spezifische CSS-Regeln für Konturen, Lichtkanten, Verbindungen
      und Datengitter (kein pauschales Abdunkeln des SVG)
- [x] Projektgrafiken auf Theme-Variablen `--cd-*` umgestellt
      (vorher: fest kodiertes `#fff` + `currentColor`)
- [x] Dark-Mode-Erhalt per Pixel-Diff **belegt** (nicht behauptet)
- [x] Kontur-Kontraste gemessen (WCAG-Grafikschwelle 3:1)
- [x] E2E 46/46 PASS, Kontraste AA, Build/Lint/TypeScript PASS

## Befunde (gemessen, nicht behauptet)

**Ausgangsproblem bestätigt.** Die Vorher-Aufnahmen zeigten blasses Mint auf
Porzellanweiß: Würfel ohne Kontur, Panel-Umriss kaum sichtbar, Netz-Kugeln
fast farblos. Ursache im Code:
- `ProjectDiagram.tsx` malte alles mit `currentColor` und sehr niedrigen
  Opacity-Werten (0.06–0.55) sowie **fest kodierten `#fff`-Glanzpunkten** —
  auf weißem Grund unsichtbar.
- Light-Mode-Glaswerte waren zu transparent (`--glass-2` nur 0.1,
  `--glass-3` 0.02).

**Zwischenlösung verwarf den Dark Mode — nachgewiesen und korrigiert.**
Ein erster Ansatz steckte die Deckkraft in Komponenten-Attribute. Der
Pixel-Diff gegen den Vorher-Stand zeigte **8,95 % abweichende Pixel in den
Dark-Karten** — ein unbeabsichtigter Eingriff. Lösung: Farbe **und**
Deckkraft stecken jetzt vollständig in den Theme-Variablen (`--cd-a1`,
`--cd-glass-a1`, …), die Komponenten nutzen wieder dieselben relativen
Opacity-Werte wie zuvor. Erneuter Diff: **0,08 %** (Karten) bzw. 0,22 %
(Netz) — Anti-Aliasing bzw. laufender Datenimpuls, keine sichtbare Änderung.

## Prüfergebnisse

| Prüfung | Ergebnis |
|---|---|
| `npx tsc -b` | PASS |
| `npm run lint` | PASS (0 Warnungen) |
| `npm run build` | PASS → `dist/index.html` |
| E2E (Playwright/Chrome) | **46/46 PASS**, 0 pageerrors |
| Text-Kontraste | alle ≥ WCAG AA (Dark + Light) |
| Kontur-Kontrast Hero (Light) | Schale 5.96:1, Draht 4.31:1, Kante 5.07:1 (Schwelle 3:1) |
| Kontur-Kontrast Karten (Light) | Hauptkonturen 7.47:1, Nebenlinien 4.35:1 |
| Dark-Mode-Pixel-Diff | Karten 0.08 %, Netz 0.22 % → unverändert |

Geprüft wurden außerdem: Theme-Wechsel mit Persistenz, Tastaturbedienung
(Enter auf Knoten), reduzierte Bewegung, Mobil (390×844) und das
Ausblenden des Auto-Ablaufs bei verborgenem Tab.

## Screenshots (Vorher/Nachher, identische Viewports)

- Netz Light: `lp-before-hero-network.png` → `lp-after2-hero-network.png`
- Karten Light: `lp-before-cards.png` → `lp-after2-cards.png`
- Mobil Light: `lp-before-mobile-cards.png` → `lp-after2-mobile-cards.png`
- Dark-Kontrolle: `lp-before-dark-*.png` → `lp-after2-dark-*.png`
- Zusätzlich Viewport-Aufnahmen: `lp-after2-hero-viewport.png`,
  `lp-after2-cards-viewport.png`, `lp-after2-detail.png`
(Ablage `/tmp/opencode/shots`, nicht Teil des Repos.)

## Git-Status / geänderte Dateien

- `src/styles/global.css` — Theme-Variablen `--cd-*` (Dark + Light),
  verstärkte Light-Glaswerte, Light-spezifische Kontur-/Kantenregeln,
  abgesetzter Karten-Hintergrund in Light
- `src/components/ProjectDiagram.tsx` — alle Farben/Deckkräfte aus
  Theme-Variablen statt `currentColor`/`#fff`

**Bestätigung:** Keine fremden Änderungen vorhanden oder überschrieben.
Layout, Inhalte, Interaktionen, React/Vite-Versionen, Theme-Persistenz und
`vercel.json` (outputDirectory=dist) unverändert. Keine neuen Abhängigkeiten.

## Terraform-Checks

GRAY / nicht anwendbar (Web-Frontend ohne Infrastruktur).

## Offene Fragen

- Jahreszahl der Berufserfahrung weiterhin intern offen (unverändert).
- Vercel-Deployment-Status ohne Credentials nicht verifizierbar.

## Risiken

- Sättigungssteigerung betrifft nur den Light Mode; die Lesbarkeit von
  Projekt-Titeln und Labels über den Grafiken wurde nicht verschlechtert
  (Kontrastmessung weiterhin AA, Grafiken sind `aria-hidden`).
- Die Konturen sind kräftiger, damit sie auch auf kleinen Displays und bei
  System-Einstellungen mit reduzierter Farbwiedergabe erkennbar bleiben.

## Empfohlene nächste Aktionen

1. Vercel-Deployment nach dem Push im Dashboard prüfen.
2. Optional: dieselbe Variablen-Logik (Farbe + Deckkraft in Theme-Werten)
   auch für die Simulation übernehmen.

## Resume Point

Fertig. Branch `light-mode-presence-01` ist bereit für Push auf
`origin/main` (kein Force-Push).
