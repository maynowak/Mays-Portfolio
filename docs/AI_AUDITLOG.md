=================================================
EXECUTION LOG / CRASH RECOVERY — MANDATORY
=================================================

Maintain a current execution log throughout the audit:

docs/reports/[NO. OF TASK ++]-[SUBWORKING NO.]-[TASK]-EXECUTION_LOG.md

This is mandatory even though the audit is READ-ONLY.

The execution log must be created or updated continuously after
meaningful audit milestones, NOT only at the end.

The log must preserve the latest verified state so that work can be
resumed safely after an agent crash, terminal failure, streaming
failure, IDE restart, or interrupted session.

Record only verified facts. Never invent findings or validation results.

The execution log must contain:

- current status
- audit date/time
- current Git branch and HEAD
- audit scope
- completed audit sections
- actual findings
- evidence / file references
- GREEN / YELLOW / ORANGE / RED / GRAY classification
- Terraform checks actually executed and their results
- Git status
- files changed, if any
- explicit confirmation when no files were changed
- open questions
- risks
- recommended next actions
- current resume point

After each major section, update the execution log before continuing.

At the end, finalize the log with the complete audit summary.

IMPORTANT:
The execution log itself is part of the audit workflow and must be
kept accurate even if the audit remains completely read-only.

================================================================================
PROJECT EXECUTION LOG — Mays-Portfolio
================================================================================

This file follows the rules above. Entries are appended here, and each task
also gets its own detailed log under docs/reports/. This file is the running
summary and is written continuously, not only at the end.

Current status ................. GREEN (Portfolio 0.1 live on origin/main)
Last verified .................. 2026-10-13
Classification ................. GREEN
Terraform checks ............... GRAY (not applicable — static web frontend,
                                 no infrastructure in this repository)

--------------------------------------------------------------------------------
[2026-10-12] MAY-PORTFOLIO-FOUNDATION-01 — Portfolio 0.1
--------------------------------------------------------------------------------
- Empty directory initialised (no git repo, no AGENTS.md). Vite + React 19 +
  TypeScript scaffold; remote git@github.com:maynowak/Mays-Portfolio.git
  (SSH auth verified).
- Project maturity levels verified against the README of each remote main
  (12.10.2026). Mays Orders AWS: historical E2E marked as such, currently NOT
  deployed. No invented metrics, certificates or leadership claims.
- Delivered: nav with mobile menu + theme switch, hero with interactive SVG
  system network, three expandable project cards (problem / architecture /
  contribution / stack / maturity / evidence), Mays-RIS architecture simulation
  with start/pause/reset, expertise, about, contact.
- Checks: tsc PASS, build PASS, lint PASS, 48/48 E2E PASS, 0 pageerrors.
- Open: years of professional experience not yet clarified.

--------------------------------------------------------------------------------
[2026-10-12] MAY-PORTFOLIO-VERCEL-OUTPUT-FIX-01 — Vercel output directory
--------------------------------------------------------------------------------
- Root cause (documented): build succeeded into dist/, Vercel then looked for
  build/ — "No Output Directory named build found after the Build completed."
  No vercel.json existed.
- Fix: added vercel.json with framework=vite, buildCommand="npm run build",
  outputDirectory="dist". UI, framework and npm versions untouched; the Vite
  output directory was NOT renamed to build.
- Checks: build PASS, dist/index.html present. Pushed to origin/main.
- Deployment: the push triggered a Vercel build; outcome NOT verified (no
  credentials available) — reported explicitly as such.

--------------------------------------------------------------------------------
[2026-10-12] MAY-PORTFOLIO-VISUAL-POLISH-01 — Visual overhaul
--------------------------------------------------------------------------------
- Content: B.Sc. Informatik confirmed by client, confirmation note removed
  from the UI. Years of experience deliberately not stated in the UI; internal
  note only.
- Hero/system network rebuilt with glass bodies (SVG gradients), light edges,
  much larger nodes, turquoise connections with data pulses, perspective plane.
- Project cards: larger image area, own visual worlds, 44px touch targets.
- Motion: decorative animations and the simulation pause when the tab is
  hidden (usePageActive); keyboard fix — Enter on a focused node now activates
  it instead of deactivating it.
- IMPORTANT: three of four reported issues turned out NOT to be defects,
  confirmed with real viewport captures instead of full-page screenshots:
  the sticky nav never overlaps content (0px), the contact area is visible,
  there is no excessive gap before the footer. The genuine defect was weak
  secondary-text contrast in light mode (below WCAG AA) — fixed.
- Checks: tsc / lint / build PASS, 46/46 E2E PASS, 0 pageerrors, all sampled
  text at least AA in both themes.

--------------------------------------------------------------------------------
[2026-10-13] MAY-PORTFOLIO-LIGHT-MODE-PRESENCE-01 — Light mode presence
--------------------------------------------------------------------------------
- Problem (confirmed by before-captures at normal display size): architecture
  graphics too pale on porcelain white. Cause: ProjectDiagram painted with
  currentColor at very low opacities plus hard-coded #fff highlights
  (invisible on white); light-mode glass values were nearly transparent
  (--glass-2 0.1, --glass-3 0.02).
- Fix: all card colours AND opacities moved into theme variables (--cd-*);
  light mode gets strong petrol contours, saturated glass gradients, stronger
  light edges and a subtle depth shadow; hero edges, wireframes and rims
  thickened in light mode only. No blanket darkening of the SVG, no new
  dependencies.
- Dark mode preserved and PROVEN: an intermediate approach changed 8.95 % of
  dark-card pixels — detected by pixel diff and then replaced by the
  variable-based approach, resulting in 0.08 % (cards) / 0.22 % (network),
  i.e. unchanged.
- Checks: tsc PASS, lint PASS, build PASS, 46/46 E2E PASS, 0 pageerrors, all
  sampled text at least AA, graphic contours above 3:1 (hero 4.31-5.96,
  cards 4.35-7.47).
- Full detail:
  docs/reports/04-MAY-PORTFOLIO-LIGHT-MODE-PRESENCE-01-EXECUTION_LOG.md

--------------------------------------------------------------------------------
[2026-10-13] MAY-PORTFOLIO-CAREER-UNIVERSE-01 — Career Universe
--------------------------------------------------------------------------------
- Source: the file named in the brief (…_2026-10-13(2).pdf) does NOT exist.
  Used instead ~/Downloads/May_Nowak_CV_Karrierehighlights_Portfolio_2026-10-13.pdf
  (website content brief, 13.10.2026), read via `pdftotext -layout`. Confirms
  B.Sc. Informatik, Hochschule Darmstadt, and the station list.
- Delivered: "Über mich" now carries a Career Universe — glowing timeline with
  glass nodes (different geometry per focus area), view switch (Beruflicher
  Weg / Technische Schwerpunkte), competence filters (Alle, Java & Integration,
  Daten & Migration, DevOps, Cloud & AI), accessible station detail panels,
  three Enterprise case studies with abstract illustrations, and a
  "Profil auf einen Blick" modal for recruiters. Mobile gets a vertical
  timeline with identical functions.
- Withheld on purpose: further-education dates/duration/certificate (not yet
  consolidated per the brief), AWS/Terraform exams (goals, not passed), exact
  contract/employer designations (to be reconciled), team sizes, budgets,
  responsibility scope, availability, remote experience. Public wording stays
  "Ausgewählte Projektpraxis" / "Projektumfeld" and "Langjährige Erfahrung".
- Four real defects found and fixed while implementing: black node faces
  (gradient only applied to the top face), data pulses offset by one viewBox
  height (animateMotion adds to the element origin), missing "Zeus 2" (the
  case `context` field was never rendered), and SMIL pulses ignoring
  prefers-reduced-motion.
- Own measurement bug corrected (footer gap measured across two different
  scroll positions: 128 px at equal position, i.e. unchanged).
- Checks: tsc / lint / build PASS, 74/74 career E2E PASS, 46/46 regression
  E2E PASS, 0 pageerrors, all sampled text at least AA.
- Full detail: docs/reports/05-CAREER-UNIVERSE-01-EXECUTION_LOG.md

--------------------------------------------------------------------------------
[2026-10-13] MAY-PORTFOLIO-CAREER-TIMELINE-SCOPE-01 — Kürzung der Karriereansicht
--------------------------------------------------------------------------------
- Auftraggeberwunsch umgesetzt: Die öffentliche Karriereansicht beginnt
  jetzt mit „2012–10/2019 · Freelance Software Developer".
- Entfernt aus ALLEN öffentlichen Karriereansichten: die frühere
  Projektpraxis 2008–2012 (E-Commerce/PHP, Airconomy, J2EE/JSF/JPA/Hibernate)
  sowie das BaFin-Projekt als eigene Timeline-Station. Beide erscheinen
  nicht über Zeitachse, Kompetenzgruppen, Filter oder Recruiter-Ansicht.
- Das BaFin-Fallbeispiel bleibt erhalten und ist der Freelance-Phase
  zugeordnet (sichtbare Zeile „Zugeordnet: Freelance Software Developer
  (2012–10/2019)" am Fallbeispiel; interner Vermerk im Datenmodell).
- Konsistenz angepasst: 6 Stationen, order 1–6, x-Positionen 9/27/45/63/81/95
  (gleichmäßig, keine leeren Positionen), 6 Achs-Stiele, 5 Impulsverbindungen,
  Filterzähler Java 3 / Daten 2 / DevOps 3 / Cloud & AI 2, Statuszeile „6".
- Prozessbefund: lokales main stand noch auf 4bfc3da, weil die vorherigen
  Tasks direkt vom Feature-Branch nach origin/main gepusht wurden. Vor der
  Umsetzung per fast-forward auf e9537bb nachgezogen — die Kürzung wurde
  nachweislich auf dem vollständigen Career-Universe-Stand aufgebaut.
- Prüf-Skriptfehler einmalig korrigiert (Simulationstest öffnete die
  Orders-Karte statt Mays-RIS) — kein Produktfehler.
- Checks: tsc / lint / build PASS, 55/55 Scope-E2E PASS, 46/46
  Bestands-E2E PASS, 0 pageerrors. Desktop + Mobil, Dark + Light,
  Tastatur und Reduced Motion geprüft.
- Mit enthaltene, weiterhin zurückgehaltene Angaben: Weiterbildungsdetails,
  AWS-/Terraform-Prüfungen, Vertragsbezeichnungen — unverändert.

--------------------------------------------------------------------------------
OPEN ITEMS
--------------------------------------------------------------------------------
- Years of professional experience: wording without a number until clarified.
- Exact contract/employer designations and time ranges of earlier stations:
  reconcile against original documents before publishing.
- Further-education details (duration, period, certificate) not consolidated.
- Vercel deployment status: not verifiable from this environment (no
  credentials). Never reported as verified. Known address for a live check:
  https://mays-portfolio-six.vercel.app/

================================================================================
