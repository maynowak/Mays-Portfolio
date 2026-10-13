/**
 * Datenmodell des Career Universe.
 *
 * QUELLE: `May_Nowak_CV_Karrierehighlights_Portfolio_2026-10-13.pdf`
 * (Website-Content-Brief, Stand 13.10.2026), lokal gefunden unter
 * ~/Downloads/May_Nowak_CV_Karrierehighlights_Portfolio_2026-10-13.pdf
 * und per `pdftotext -layout` ausgelesen.
 *
 * Quellenbegrenzung / interne Vermerke (nicht öffentlich angezeigt):
 * - Der Brief weist selbst darauf hin, dass exakte Vertrags- und
 *   Arbeitgeberbezeichnungen sowie ältere Zeiträume vor einer Veröffentlichung
 *   gegen Originalunterlagen abzugleichen sind. Öffentlich werden daher nur
 *   „Ausgewählte Projektpraxis" und „Projektumfeld" verwendet.
 * - Angaben zur Weiterbildung (dauer, Zeitraum 03/2026–10/2026, Abschluss)
 *   sind laut Briefing noch nicht konsolidiert und daher nicht enthalten.
 * - AWS-/Terraform-Prüfungen sind laut Brief Ziele („in Vorbereitung") und
 *   werden nicht als bestanden dargestellt.
 * - Keine Kennzahlen zu Teamgröße, Budget, Verfügbarkeit, Verantwortung oder
 *   Geschäftsergebnissen; keine Kundenlogos, die Empfehlung suggerieren.
 */

export type FocusId = 'java' | 'daten' | 'devops' | 'cloudai' | 'kreativ';

export interface Focus {
  id: FocusId;
  label: string;
  short: string;
  /** Form des Knotens in der Landschaft. */
  shape: 'sphere' | 'cube' | 'hexa' | 'poly' | 'diamond';
}

export const focusAreas: Focus[] = [
  { id: 'java', label: 'Java & Integration', short: 'Java', shape: 'cube' },
  { id: 'daten', label: 'Daten & Migration', short: 'Daten', shape: 'sphere' },
  { id: 'devops', label: 'DevOps', short: 'DevOps', shape: 'hexa' },
  { id: 'cloudai', label: 'Cloud & AI', short: 'Cloud & AI', shape: 'poly' },
  { id: 'kreativ', label: 'Kreative Arbeit', short: 'Kreativ', shape: 'diamond' },
];

/** Filter der Ansicht — die kreative Station ist bewusst nicht Teil davon. */
export const focusFilters: { id: FocusId | 'alle'; label: string }[] = [
  { id: 'alle', label: 'Alle' },
  { id: 'java', label: 'Java & Integration' },
  { id: 'daten', label: 'Daten & Migration' },
  { id: 'devops', label: 'DevOps' },
  { id: 'cloudai', label: 'Cloud & AI' },
];

export interface CareerStation {
  id: string;
  /** Zeitraum-Angabe, wie im Brief formuliert. */
  period: string;
  /** Sortierung auf der Zeitachse. */
  order: number;
  title: string;
  /** Einordnung, bewusst zurückhaltend (keine Arbeitgeberbeziehung behauptet). */
  setting: string;
  /** Belegte Tätigkeiten aus dem Brief. */
  activities: string[];
  technologies: string[];
  /** Redaktionelle Einordnung: Bezug zum heutigen Schwerpunkt. */
  today: string;
  focuses: FocusId[];
  /** Position auf der Zeitachse (Prozent, Desktop-Landschaft). */
  x: number;
  /** Position relativ zur Achse: above | below. */
  side: 'above' | 'below';
  /** Kreative Station: nicht als IT-Tätigkeit darstellen. */
  creative?: boolean;
  /** Verknüpfung zu einem aktuellen Projekt (optional). */
  relatedProjectId?: 'mays-ris' | 'mays-orders' | 'job-matcher';
  /** Interne Quellenlage — nicht öffentlich angezeigt. */
  sourceNote?: string;
}

export const careerStations: CareerStation[] = [
  {
    id: 'frueher',
    period: '2008–2012',
    order: 1,
    title: 'Ausgewählte Projektpraxis',
    setting: 'Frühere Projektumgebungen',
    activities: [
      'E-Commerce mit PHP und MySQL',
      'Luftverkehrs-Weboberfläche mit PDF-Generierung',
      'GIS- und Routenplanung',
      'J2EE-Projekte mit JSF, JPA, Hibernate und Middleware',
    ],
    technologies: ['PHP', 'MySQL', 'J2EE', 'JSF', 'JPA', 'Hibernate', 'Middleware', 'GIS', 'PDF'],
    today:
      'Grundlage für die heutige Sicht auf Datenflüsse und Systemgrenzen: unterschiedliche Datenquellen sauber zusammenführen.',
    focuses: ['java', 'daten'],
    x: 7,
    side: 'above',
    sourceNote:
      'Brief: E-Commerce/Contenido, Airconomy, GIS sowie J2EE/JSF/JPA/Hibernate. Vertragsbezeichnungen laut Brief noch abzugleichen.',
  },
  {
    id: 'bafin',
    period: '03/2012–09/2012',
    order: 2,
    title: 'BaFin-Projekt',
    setting: 'Projektumfeld Finanzaufsicht',
    activities: [
      'PDS-Webservices mit J2EE, Oracle und JUnit',
      'Machbarkeitsbetrachtung zu AIX und DB2',
      'Linux-Netzwerkanalyse',
    ],
    technologies: ['J2EE', 'Oracle', 'JUnit', 'AIX', 'DB2', 'Linux'],
    today:
      'Verbindet Entwicklung, Schnittstellen und technische Systemanalyse — dieselbe Denkweise prägt heute Architektur- und Plattformentscheidungen.',
    focuses: ['java'],
    x: 20,
    side: 'below',
    sourceNote:
      'Brief: PDS-Webservices, AIX/DB2-Machbarkeit, Linux-Netzwerkanalyse. Vertragsbezeichnung laut Brief noch abzugleichen.',
  },
  {
    id: 'freelance',
    period: '2012–10/2019',
    order: 3,
    title: 'Freelance Software Development',
    setting:
      'Projektumfelder u. a. Deutsche Bahn, Deutscher Zoll, FRAPORT, Teambank, Quattec/VEMAGS',
    activities: [
      'Java- und Swing-Entwicklung',
      'Webservices und Schnittstellen',
      'Datenmigration und Datenbanken',
      'Automatisierte Tests',
      'GIS und Systemintegration',
    ],
    technologies: ['Java', 'Swing', 'Webservices', 'Oracle', 'PL/SQL', 'GIS', 'Tests'],
    today:
      'Langjährige Integrationspraxis über mehrere Branchen hinweg — heute umgesetzt als klar definierte Systemgrenzen statt als monolithische Lösung.',
    focuses: ['java', 'daten'],
    x: 33,
    side: 'above',
    sourceNote:
      'Brief nennt die Projektumfelder; detaillierte Aufgaben, Teamgrößen und Ergebnisse laut Brief erst nach zusätzlicher Bestätigung.',
  },
  {
    id: 'gh-inchorus',
    period: '10/2019–07/2020',
    order: 4,
    title: 'G+H Systems / Inchorus Daccord',
    setting: 'Projektumfeld Softwareentwicklung',
    activities: [
      'Analyse von Dateisystem-Berechtigungen',
      'Backend-Automatisierung',
      'Oberflächen für Untersuchungsergebnisse',
    ],
    technologies: ['Java', 'Java EE', 'JUnit', 'Neo4j', 'XSL'],
    today:
      'Graphbasierte Analyse und automatisierte Backends fließen heute in Datenmodellierung und Betrieb der eigenen Projekte ein.',
    focuses: ['java', 'daten'],
    x: 46,
    side: 'below',
    sourceNote:
      'Brief: Anwendung zur Verwaltung und Analyse von Dateisystem-Berechtigungen, Backend-Automatisierung, Ergebnisoberflächen.',
  },
  {
    id: '4brain',
    period: '2021',
    order: 5,
    title: 'Fullstack-Java-Projektumfeld',
    setting: 'Projektumfeld 4Brain',
    activities: [
      'Entwicklung von Webservices in Docker-Umgebungen',
      'Java- und Backend-Schwerpunkt',
    ],
    technologies: ['Java', 'Webservices', 'Docker'],
    today:
      'Containerisierung als Grundlage der heutigen serverlosen Deployments auf AWS.',
    focuses: ['java', 'devops'],
    x: 59,
    side: 'above',
  },
  {
    id: '1und1',
    period: '2022',
    order: 6,
    title: 'DevOps-Projektumfeld',
    setting: 'Projektumfeld 1und1',
    activities: [
      'Java- und Java-EE-Entwicklung',
      'Entwicklungs- und Automatisierungsarbeit mit Jenkins',
      'Docker-Umgebungen',
    ],
    technologies: ['Java', 'Java EE', 'Jenkins', 'Docker'],
    today:
      'Automatisierung und reproduzierbare Umgebungen sind heute in Terraform, Installer-Flows und Policy Gates wiederzuerkennen.',
    focuses: ['devops', 'cloudai'],
    x: 72,
    side: 'below',
  },
  {
    id: 'kreativ',
    period: '2023–2025',
    order: 7,
    title: 'Kreative Arbeit',
    setting: 'Selbstständiges Schreiben unter Maymilly Nowak',
    creative: true,
    activities: [
      'Konzeption und Recherche eigener literarischer Projekte',
      'Umsetzung und Veröffentlichung',
    ],
    technologies: ['Recherche', 'Konzeption', 'Publikation'],
    today:
      'Ergänzende kreative Tätigkeit — bewusst getrennt von den IT-Stationen geführt.',
    focuses: ['kreativ'],
    x: 85,
    side: 'above',
    sourceNote:
      'Laut Brief als kreative Tätigkeit darstellen, nicht als IT-Anstellung. Name im öffentlichen Auftritt: Maymilly Nowak.',
  },
  {
    id: 'aktuell',
    period: 'heute',
    order: 8,
    title: 'Aktuelle Weiterentwicklung und eigene Projekte',
    setting: 'Eigene Projekte auf AWS',
    activities: [
      'AWS Cloud Engineering und Infrastructure as Code',
      'Java/Spring Boot, Docker und Automatisierung',
      'Agentenbasierte Plattformen und AI Engineering',
      'Architektur, Implementierung, Tests und Dokumentation',
    ],
    technologies: ['AWS', 'Terraform', 'Java', 'Spring Boot', 'Docker', 'AI Engineering'],
    today:
      'Hier laufen Mays-RIS, Mays Orders AWS und May’s Job Matcher zusammen — mit klarer Trennung zwischen verifizierten und vorbereiteten Funktionen.',
    focuses: ['cloudai', 'devops'],
    x: 94,
    side: 'below',
    relatedProjectId: 'mays-ris',
    sourceNote:
      'Weiterbildung (dauer, Zeitraum, Abschluss) laut Briefing noch nicht konsolidiert — daher ohne Angaben.',
  },
];

/** Drei kompakte Enterprise-Fallbeispiele aus dem Brief. */
export interface CaseStudy {
  id: string;
  client: string;
  context: string;
  scope: string;
  details: string[];
  illustration: 'data' | 'services' | 'office';
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'db',
    client: 'Deutsche Bahn',
    context: 'Projektumfelder EDITH, RIS und OSSGeoviewer',
    scope: 'Integration, Migration und GIS-/Geodatenbezug',
    details: [
      'Erfahrung mit längerfristigen Unternehmensanwendungen',
      'Technische Integrationsaufgaben sowie Daten- und Systemmigration',
      'GIS- und Geodatenbezug',
    ],
    illustration: 'data',
  },
  {
    id: 'bafin-case',
    client: 'BaFin',
    context: 'Webservices und technische Systemanalyse',
    scope: 'Schnittstellen zwischen Entwicklung und Analyse',
    details: [
      'PDS-Webservices mit J2EE, Oracle und JUnit',
      'Untersuchung von AIX und DB2',
      'Linux-Netzwerkanalyse',
    ],
    illustration: 'services',
  },
  {
    id: 'zoll',
    client: 'Deutscher Zoll',
    context: 'Zeus 2 — behördliches Fachverfahren',
    scope: 'Softwareentwicklung und Integration',
    details: [
      'Entwicklung und Integration im behördlichen Umfeld',
      'Fachverfahren mit Anforderungen an Nachvollziehbarkeit',
    ],
    illustration: 'office',
  },
];

export const careerIntro =
  'Mein Weg verbindet Enterprise-Software, Daten und Systemintegration mit heutigen Cloud- und KI-Projekten. Entdecke die Stationen und ihre technischen Schwerpunkte.';

export const careerTitle = 'Erfahrung vernetzen. Zukunft gestalten.';

/** Illustrationen sind bewusst abstrakt — keine rekonstruierten Systeme. */
export const illustrationNote =
  'Abstrahierte Darstellung — skizziert den Charakter des Projektumfelds, nicht konkrete interne Architekturen.';
