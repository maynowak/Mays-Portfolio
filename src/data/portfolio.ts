/**
 * Zentrale, typisierte Inhaltsbasis für das Portfolio.
 *
 * Quellenlage:
 * - Projektinhalte und Reifegrade wurden am 12.10.2026 direkt aus den
 *   README-Dateien der Remote-Branches `main` der jeweiligen GitHub-Repos
 *   verifiziert (siehe `source` je Projekt).
 * - B.Sc. Informatik: vom Auftraggeber bestätigt.
 * - Berufserfahrung: Jahreszahl intern noch offen. Nach außen wird bewusst
 *   ohne Zahl formuliert („Langjährige Erfahrung in Enterprise-Softwareent-
 *   wicklung und Systemintegration"). Interne Notiz: Länge der Erfahrung
 *   wurde nicht abschließend geklärt — siehe docs/reports/.
 */

export type MaturityStatus =
  | 'IMPLEMENTED'
  | 'VERIFIED'
  | 'PREPARED'
  | 'NOT_DEPLOYED'
  | 'HISTORICAL';

export interface MaturityEntry {
  status: MaturityStatus;
  label: string;
  note: string;
}

export interface ProjectLinks {
  github: string;
  live?: string;
}

export type DiagramKind = 'network' | 'blocks' | 'panel';

export interface ProjectDetails {
  problem: string;
  architecture: string;
  contribution: string;
  stack: string[];
  maturity: MaturityEntry[];
  evidence: string[];
  /** Herkunft und Zeitpunkt der Reifegrad-Verifikation. */
  source: string;
}

export interface Project {
  id: 'mays-ris' | 'mays-orders' | 'job-matcher';
  name: string;
  category: string;
  tagline: string;
  diagram: DiagramKind;
  links: ProjectLinks;
  details: ProjectDetails;
  /** Nur Mays-RIS: steuerbare Architektur-Simulation im aufgeklappten Bereich. */
  hasSimulation: boolean;
}

export interface Profile {
  name: string;
  role: string;
  field: string;
  eyebrow: string;
  heroLines: [string, string];
  intro: string;
  focusAreas: string[];
  competence: string[];
  /** B.Sc. Informatik bestätigt durch Auftraggeber. */
  degree: string;
  experience: string;
  about: string[];
  github: string;
}

export interface ExpertisePillar {
  title: string;
  summary: string;
  /** Konkrete Verknüpfung mit den vorgestellten Projekten. */
  projectRefs: { projectId: Project['id']; text: string }[];
}

export const profile: Profile = {
  name: 'May Nowak',
  role: 'Senior Software Architect',
  field: 'Cloud & AI Engineering',
  eyebrow: 'Software · Cloud · AI',
  heroLines: ['Komplexität verstehen.', 'Systeme gestalten.'],
  intro:
    'Ich entwerfe und baue Systeme, die man verstehen, prüfen und betreiben kann: von serverlosen AWS-Backends über Infrastructure as Code bis zu Agenten-Laufzeiten und KI-Produkten.',
  focusAreas: ['AWS', 'Terraform', 'Agentic Systems', 'Enterprise-Software', 'Systemintegration'],
  competence: [
    'Serverless-Architekturen mit Lambda, API Gateway, SQS und DynamoDB',
    'Infrastructure as Code und kontrollierte Installer mit Policy Gate',
    'Agenten-Orchestrierung: Registry, Discovery, Eligibility, Routing',
    'KI-Integration mit Provider-Fallback und Kostenkontrolle',
  ],
  degree: 'B.Sc. Informatik',
  experience: 'Langjährige Erfahrung in Enterprise-Softwareentwicklung und Systemintegration',
  about: [
    'Ich entwerfe und baue Systeme, die man verstehen, prüfen und betreiben kann: von serverlosen AWS-Backends über Infrastructure as Code bis zu Agenten-Laufzeiten und KI-Produkten.',
    'Meine Projekte sprechen dabei für sich – inklusive ehrlicher Reifegrade: Was implementiert, verifiziert oder nur vorbereitet ist, steht im Repository. Historische Tests werden nicht als aktueller Betrieb dargestellt.',
  ],
  github: 'https://github.com/maynowak',
};

export const projects: Project[] = [
  {
    id: 'mays-ris',
    name: 'Mays Recruiting Intelligence System',
    category: 'Agent Platform',
    tagline: 'Modulare AWS-Agentenplattform mit Registry, Discovery, Eligibility und Routing.',
    diagram: 'network',
    links: {
      github: 'https://github.com/maynowak/Mays-Recruiting-Intelligence-System',
    },
    hasSimulation: true,
    details: {
      problem:
        'Recruiting-Prozesse bestehen aus vielen spezialisierten Schritten – Profilanalyse, Jobsuche, ATS-Anbindung, Order-Abwicklung. Statt eines Monolithen kapselt Mays-RIS diese Schritte als eigenständige Agenten hinter einer gemeinsamen Laufzeit-Plattform mit klaren Systemgrenzen.',
      architecture:
        'Cognito/JWT → API Gateway (9 Routen) → Lambda → Shared Work Queue (SQS + DLQ) → Worker-Lambda → Ecosystem (Registry → Discovery → Eligibility → Selection) → Agent Body → Domain Agents → DynamoDB. Mays-Orders ist eine externe Systemgrenze und wird über einen Port/Adapter (OrdersPort → RealMaysOrdersAdapter → HTTP) angebunden.',
      contribution:
        'Konzeption, Architektur und Implementierung: Laufzeit-Pfad, Idempotency/Retry/DLQ, Orders-Integration über eine definierte Port/Adapter-Grenze, Tenant-Isolation im Code sowie ein eigener Installer mit S3-Backend, Locking und Pinning der externen Abhängigkeiten.',
      stack: [
        'AWS Lambda',
        'API Gateway',
        'Amazon SQS + DLQ',
        'DynamoDB',
        'Cognito (JWT)',
        'Python',
        'Eigener Installer (S3-Backend, Lock, Pinning)',
      ],
      maturity: [
        {
          status: 'VERIFIED',
          label: 'Laufzeit-Pfad & Integrationen',
          note: 'Runtime-Pfad, Idempotency/Retry/DLQ und Orders-Integration verifiziert; Testsuite: 321 bestanden (4 deselected, 1 Collection – klassifiziert).',
        },
        {
          status: 'IMPLEMENTED',
          label: 'Ecosystem & Auth',
          note: 'Registry, Discovery, Eligibility, Selection; Cognito als zentraler Identity Provider; Least-Privilege-Rollen, keine Secrets im Repo.',
        },
        {
          status: 'PREPARED',
          label: 'Erweiterungen',
          note: 'JobSearch update/delete, ATS-Vertiefung, ats/cv/match-Queues; Google-Federation vorbereitet, standardmäßig aus.',
        },
        {
          status: 'NOT_DEPLOYED',
          label: 'Offene Punkte',
          note: 'Laut Repo-Doku offen: POST-Reconciliation, MO-Idempotency-Key, Plattform-OpenAPI und 5 vorhandene Test-Defekte.',
        },
      ],
      evidence: [
        'Gate-Nachweise G0–G9 und Execution-Logs unter docs/reports/',
        'Installer-Pinning: mays-orders@9c61237, mays_jobsearch@3cd58b81',
        'Kanonische Architektur-Doku: docs/architecture/SYSTEM-ARCHITECTURE.md',
      ],
      source: 'Verifiziert an Remote main (README.md), 12.10.2026.',
    },
  },
  {
    id: 'mays-orders',
    name: 'Mays Orders AWS',
    category: 'Serverless Workflows',
    tagline: 'Eigenständiges serverless Order-/Work-Processing-Backend.',
    diagram: 'blocks',
    links: {
      github: 'https://github.com/maynowak/mays-order-aws',
    },
    hasSimulation: false,
    details: {
      problem:
        'Bestellungen und Work Items brauchen einen nachvollziehbaren, regelbasierten Lebenszyklus – ohne Serverbetrieb und mit klarer Trennung von API, Zustandslogik und Hintergrundverarbeitung.',
      architecture:
        'Client → API Gateway (JWT/Cognito) → Order Lambda → DynamoDB, dazu SQS → Worker Lambda → DynamoDB. Infrastruktur als Terraform-Module mit Workspace-Isolation, Policy Gate und Installer (Plan/Deploy/Destroy); Betrieb über CloudWatch-Monitoring und CloudTrail-Auditierung. Order-Lifecycle: PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED mit definierten Cancellation-Pfaden.',
      contribution:
        'Architektur und Umsetzung: Statusmaschine des Order-Lifecycles, JWT-geschützte HTTP-API, Terraform-Module mit Policy Gate sowie der kontrollierte Installer-Workflow inklusive isoliertem Test-Destroy.',
      stack: [
        'AWS Lambda (Python 3.14)',
        'API Gateway HTTP API v2',
        'DynamoDB',
        'Amazon SQS',
        'Cognito (JWT)',
        'Terraform',
        'CloudWatch & CloudTrail',
      ],
      maturity: [
        {
          status: 'VERIFIED',
          label: 'Release Candidate v0.5.0-rc.1',
          note: 'Geprüft: 76 Lambda-Unit-Tests, 81 Installer-Unit-Tests, 5 Artifact-Integrity-Tests sowie terraform fmt/validate – alles PASS.',
        },
        {
          status: 'HISTORICAL',
          label: 'AWS-E2E (historisch)',
          note: 'Order-E2E 12/12 PASS und Privacy-E2E P-01/P-02/P-03 PASS – auf einer Testinstallation, die inzwischen vollständig abgebaut ist (Destroy-Nachweis: 37 Ressourcen entfernt, 0 projektspezifische Reste). Kein aktueller Betrieb.',
        },
        {
          status: 'NOT_DEPLOYED',
          label: 'Aktueller Betrieb',
          note: 'Derzeit nicht produktiv deployed. Die produktive Aktivierung der internen Privacy-Funktionen ist bis zur separaten Security-/AWS-E2E-Abnahme BLOCKED.',
        },
      ],
      evidence: [
        'Release-Tag v0.5.0-rc.1 / Commit f6e737b',
        'Release-Candidate-Report und Destroy-Nachweis unter docs/reports/',
        'Terraform Policy Gate dokumentiert in docs/TERRAFORM_POLICY_GATE.md',
      ],
      source: 'Verifiziert an Remote main (README.md), 12.10.2026.',
    },
  },
  {
    id: 'job-matcher',
    name: "May's Job Matcher",
    category: 'AI Job Matching',
    tagline: 'KI-gestützte Jobsearch-Webanwendung.',
    diagram: 'panel',
    links: {
      github: 'https://github.com/maynowak/mays-jobsearch',
      live: 'https://mays-job-matcher.vercel.app/top',
    },
    hasSimulation: false,
    details: {
      problem:
        'Stellensuchen liefern lange Listen ohne Einordnung. Der Job Matcher bewertet Live-Stellen gegen das eigene Profil und macht aus Trefferzahlen eine priorisierte, begründete Auswahl – inklusive KI-Anschreiben und täglichem Digest.',
      architecture:
        'React-Frontend (TypeScript, Vite) → Vercel Functions: /api/profile (CV-Text wird ausschließlich im Browser per PDF.js extrahiert), /api/jobs (parallelisierte Jobquellen: Arbeitnow, Arbeitsagentur via Apify, öffentliche ATS-Boards, schlüsselbasierte APIs), /api/match (KI-Scoring 0–100, Top-5 mit Begründung), /api/cover-letter sowie /api/alerts + Cron-Digest. Ein Provider-Router nutzt OpenRouter primär und EdenAI optional, mit automatischem Fallback und monatlichen Kosten-Backstops; Upstash Redis dient als Cache.',
      contribution:
        'Produktkonzept, Frontend, Serverless-API, KI-Provider-Routing mit Fallback, Cost Guards und Caching-Strategie – dokumentiert in einem strikten, nachprüfbaren Feature-Workflow (docs/DEVELOPMENT_WORKFLOW.md).',
      stack: [
        'React + TypeScript + Vite',
        'Vercel Functions (Node.js, ESM) + Cron',
        'OpenRouter / EdenAI (freie Modelle)',
        'Upstash Redis',
        'PDF.js (browserseitig)',
        'Resend (Digest-E-Mails)',
        'Arbeitnow, Arbeitsagentur (Apify), ATS-Boards',
      ],
      maturity: [
        {
          status: 'VERIFIED',
          label: 'Live in Production',
          note: 'Core Matching, KI-Anschreiben, Daily-Digest-Alerts, Suchparameter und Provider-Fallback live und in Produktion verifiziert; 657 Tests bestanden / 5 skipped (Stand 02.10.2026); strikter TypeScript-Build PASS.',
        },
        {
          status: 'IMPLEMENTED',
          label: 'Kostenkontrolle & Datenschutz',
          note: 'Serverseitige Usage-Counter mit monatlichen Backstops pro Anbieter; API-Schlüssel ausschließlich serverseitig; CV-PDF verlässt den Browser nicht.',
        },
        {
          status: 'PREPARED',
          label: 'Geplant',
          note: 'Model-Availability/Health-Check, Geocoding für den Umkreis-Filter und Hybrid-/Vor-Ort-Erkennung (Roadmap).',
        },
      ],
      evidence: [
        'Live-Demo: mays-job-matcher.vercel.app/top',
        '657 Tests (vitest) + npx tsc -b + Vite-Build – dokumentiert im README',
        'Feature-Reports mit Produktionsnachweisen unter docs/reports/',
      ],
      source: 'Verifiziert an Remote main (README.md), 12.10.2026.',
    },
  },
];

export const expertise: ExpertisePillar[] = [
  {
    title: 'Architektur & Enterprise-Systeme',
    summary:
      'Systemgrenzen, Zustandsmaschinen, Idempotency und Queue-basierte Entkopplung – entworfen für Nachvollziehbarkeit statt für Demo-Effekte.',
    projectRefs: [
      {
        projectId: 'mays-ris',
        text: 'Mays-RIS: Ecosystem mit Registry, Discovery, Eligibility und Selection als explizite Orchestrierungsschicht.',
      },
      {
        projectId: 'mays-orders',
        text: 'Mays Orders AWS: regelbasierte Statusmaschine für den Order-Lifecycle mit definierten Cancellation-Pfaden.',
      },
    ],
  },
  {
    title: 'Cloud & Infrastructure as Code',
    summary:
      'AWS-Serverless mit Lambda, SQS, DynamoDB, API Gateway und Cognito – provisioniert über Terraform-Module mit Policy Gate oder einen eigenen Installer mit S3-Backend, Locking und Pinning.',
    projectRefs: [
      {
        projectId: 'mays-orders',
        text: 'Mays Orders AWS: Terraform + Installer (Plan/Deploy/Destroy), CloudWatch-Monitoring, CloudTrail-Auditierung.',
      },
      {
        projectId: 'mays-ris',
        text: 'Mays-RIS: eigener Python-Installer mit Validierung, Plan/Apply/Preflight und gepinnten Abhängigkeiten.',
      },
    ],
  },
  {
    title: 'AI & Agentic Systems',
    summary:
      'Agenten-Laufzeiten mit Eligibility- und Routing-Logik sowie KI-Integrationen, die Provider-Fallback, freie Modellkataloge und Kosten-Backstops von Anfang an mitdenken.',
    projectRefs: [
      {
        projectId: 'mays-ris',
        text: 'Mays-RIS: Domain-Agenten hinter einer gemeinsamen Laufzeit mit Work Queue und DLQ.',
      },
      {
        projectId: 'job-matcher',
        text: "May's Job Matcher: Provider-Router (OpenRouter ↔ EdenAI) mit Fallback und monatlichen Usage-Limits.",
      },
    ],
  },
];

/** Simulations-Schritte für die Mays-RIS-Architekturansicht (lokal simuliert). */
export interface SimStep {
  id: string;
  title: string;
  explanation: string;
}

export const simulationSteps: SimStep[] = [
  {
    id: 'request',
    title: 'Anfrage',
    explanation:
      'Ein Client sendet eine Anfrage an die HTTP-API – zum Beispiel „Order anlegen" oder „Jobsearch starten".',
  },
  {
    id: 'auth',
    title: 'Authentifizierung',
    explanation:
      'API Gateway prüft das Cognito-JWT. Cognito ist der zentrale Identity Provider; ohne gültiges Token wird die Anfrage abgelehnt.',
  },
  {
    id: 'routing',
    title: 'Routing',
    explanation:
      'Die Lambda hinter der Route validiert die Eingabe und erzeugt ein Work Item. Idempotency sorgt dafür, dass Wiederholungen keine Dopplungen erzeugen.',
  },
  {
    id: 'queue',
    title: 'Queue',
    explanation:
      'Das Work Item landet in der Shared Work Queue (SQS). Nachrichten, die dreimal fehlschlagen, wandern in die Dead Letter Queue – nichts geht still verloren.',
  },
  {
    id: 'worker',
    title: 'Worker',
    explanation:
      'Die Worker-Lambda nimmt das Item entgegen. Das Ecosystem wählt über Registry → Discovery → Eligibility → Selection den passenden Domain-Agenten aus.',
  },
  {
    id: 'result',
    title: 'Ergebnis',
    explanation:
      'Der Domain-Agent führt die Fachlogik aus. Ergebnis und Zustand werden in DynamoDB persistiert und stehen der API zur Verfügung.',
  },
];
