/**
 * CV content. Drives both the on-page CV (/{lang}/cv) and the highlights on
 * the home page. The PDF in /public/cv/ should mirror this content.
 *
 * Experience entries are derived from src/experience.md (the structured
 * version of the LinkedIn Experience section).
 *
 * Hoshin Casts is the casting activity — it lives in the dedicated `casting`
 * section below rather than mixed into employment.
 */

export type Lang = 'fr' | 'en';

/**
 * Free-text fields (`bullets`, `summary`, and casting `detail`) accept inline
 * markdown links:
 *   "Co-rebooted the [Engineering I/O](https://engineering.payfit.io) conference."
 *
 * - External URLs (http/https or protocol-relative `//`) open in a new tab
 *   with rel="noopener noreferrer".
 * - Internal paths (e.g. "/fr/cv", "#anchor", "mailto:...") open in the
 *   same tab.
 * - URLs containing `)` must be URL-encoded as `%29`.
 *
 * Plain strings without `[text](url)` markers render identically to before.
 */
export interface CVExperience {
  role: string;
  company: string;
  location?: string;
  start: string; // free-form, e.g. "Feb 2022" or "2017"
  end: string;   // "Présent" / "Present" / "Jan 2022"
  /** Optional short description shown above the bullets. Supports inline markdown links. */
  summary?: string;
  /** Each bullet. Supports inline markdown links — see the interface JSDoc above. */
  bullets: string[];
  /**
   * Optional company logo. Accepts either an absolute URL
   * (e.g. "https://example.com/logo.svg") or a path relative to
   * the public/ directory (e.g. "/images/logos/payfit.svg").
   */
  logoUrl?: string;
  /**
   * Optional background color for the logo container. Defaults to white,
   * which works well for most logos but can drown out light-colored or
   * neon glyphs. Accepts any valid CSS color value:
   *   "#0b0b0b", "rgb(20,20,20)", "black", "slate-900" (no), etc.
   * Use this to give a logo enough contrast against its container.
   */
  logoBG?: string;
}

export interface CVEducation {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface CVCastingItem {
  title: string;
  /** Free-text description. Supports inline markdown links — see CVExperience JSDoc. */
  detail?: string;
  year?: string;
}

/**
 * A tournament covered as part of the casting activity. Rendered as a
 * logo card with optional name + year + role labels underneath.
 */
export interface CVTournament {
  /** Tournament name, displayed under the logo. */
  name: string;
  /** Year(s) of coverage, e.g. "2024" or "2022–2024". */
  year?: string;
  /** Role tag, e.g. "Caster", "Observer", "Producer". */
  role?: string;
  /**
   * Logo URL. Absolute URL or path relative to public/
   * (e.g. "/images/tournaments/all-for-one.svg").
   */
  logoUrl: string;
  /**
   * Optional background color for the logo container (CSS color value).
   * Useful for neon / light-coloured logos that drown on white.
   * Same semantics as CVExperience.logoBG.
   */
  logoBG?: string;
}

export interface CVData {
  /** Short headline shown under the name */
  headline: string;
  experience: CVExperience[];
  education: CVEducation[];
  skills: string[];
  languages: { name: string; level: string }[];
  casting: CVCastingItem[];
  /** Notable tournaments covered. Optional logo-led showcase under casting. */
  tournaments?: CVTournament[];
}

const jargon = [
  'TypeScript', 'JavaScript', 'Node.js', 'React',
  'AWS', 'Kubernetes', 'Containers',
    'WebSockets', 'CI/CD', 'LaunchDarkly', 'Datadog', 'Clean Code'
]

export const cv: Record<Lang, CVData> = {
  // ─────────────────────────────────────────────────────────────────────
  // FRANÇAIS
  // ─────────────────────────────────────────────────────────────────────
  fr: {
    headline: 'Senior Software Engineer — Paris',
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'PayFit',
        logoUrl: 'https://payfit-prod-auth0-public-assets-rfso.s3.eu-west-3.amazonaws.com/logo/payfit_logo.svg',
        location: 'Paris, Île-de-France, France',
        start: 'Févr. 2022',
        end: 'Présent',
        bullets: [
          "Conception et implémentation d'un framework de tests unitaires pour notre DSL LowCode.",
          "Mise en place d'une API de test pour rassembler tous les outils de test du DSL et permettre l'automatisation CI/CD en aval.",
          "Contribution à l'évolution des outils de déploiement du LowCode.",
          "« Keeping the lights on » : support aux builders, migration de tâches de calcul des conteneurs vers AWS Lambdas / Step Functions, améliorations incrémentales de l'app qui sert d'IDE aux builders.",
          "Co-relance de la conférence interne [« Engineering I/O »](https://engineering.payfit.io) — après-midi tech trimestrielle ouverte à tous les ingénieurs et aux curieux.",
          "Rituels d'équipe : animation régulière des rétrospectives, organisation ponctuelle de team buildings.",
        ],
      },
      {
        role: 'Senior Fullstack Developer',
        company: 'Virtuo',
        logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplay-lh.googleusercontent.com%2FJKRFG-BIj7C3-FlleCQ3z3JdxODqEebq8UTVnfiS9OyJ5K5JTNAxB3GGATWfyVIJ4LU&f=1&nofb=1&ipt=b384f5cc3e88531b796a8520065b2c909b5c8d199023afbc54f01674c940ff4c',
        location: 'Paris, France · Hybride',
        start: 'Oct. 2019',
        end: 'Janv. 2022',
        bullets: [
          "Livraison de nouvelles fonctionnalités dans l'équipe Customer Experience (notamment l'intégration des véhicules électriques au catalogue client).",
          "Première version de l'ajout de bornes de recharge au trajet d'un client EV : synchronisation avec un partenaire tiers, debug conjoint de leur API, intégration dans nos systèmes.",
          "Refonte du processus d'ajout de nouveaux modèles de véhicules : passage d'un cycle dev + déploiement + validation de deux semaines à quelques minutes de saisie dans le back-office.",
          "Amélioration des pratiques de tests automatisés (technique et documentation) et de la qualité de code.",
          "Management et coaching d'une développeuse junior.",
        ],
      },
      {
        role: 'Senior Developer',
        company: 'La Poste',
        logoUrl: 'https://www.lapostegroupe.com/assets/media/le-groupe-laposte/8312d45c-311b-4dab-aee5-12b140882197_Logo.svg',
        location: 'Paris, France',
        start: 'Juill. 2017',
        end: 'Oct. 2019',
        bullets: [
          "Construction d'une [plateforme d'API management pour le groupe](https://developer.laposte.fr/), avec pour but d'exposer de manière unifiée différents services du groupe à l'extérieur.",
        ],
      },
      {
        role: 'Developer',
        company: 'PrestaShop',
        logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.seeklogo.com%2Flogo-png%2F48%2F1%2Fprestashop-logo-png_seeklogo-482184.png&f=1&nofb=1&ipt=e25358e3c8ec3918ea8d14362a005122206239572cea66714d21fcbc596cc677',
        start: 'Janv. 2017',
        end: 'Mars 2017',
        bullets: ["Premières étapes de la création d'une API e-commerce Prestashop, faite pour fonctionner sans front-end dédié, dans l'esprit de l'API Shopify"],
      },
      {
        role: 'Consultant',
        company: 'OCTO Technology',
        logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.SA3S4j5vN1GMjLsS27XbJAAAAA%3Fpid%3DApi&f=1&ipt=809778524f44e9c2de872abe398438a0a423ab1d6b5c1e697efb6be992b2dc84',
        location: 'Paris, France',
        start: 'Avr. 2010',
        end: 'Déc. 2016',
        summary: 'Missions notables :',
        bullets: [
          "La Poste (mai → déc. 2016) — Tech Lead NodeJS (NodeJS, BackboneJS).",
          "SGMAP (avr. → juin 2016) — Réécriture de l'application Ludwig (NodeJS, MongoDB, Webpack).",
          "DILA / SGMAP (sept. 2014 → févr. 2016) — Développeur sur le projet [France Connect](https://www.franceconnect.gouv.fr) V1 (NodeJS, OpenID Connect).",
          "ING Pays-Bas (juin 2015) — Proof of concept d'API (Java, AngularJS), première étape vers l'app Payconiq.",
          "La Poste (plus d'un an cumulé entre nov. 2012 et mai 2014) — [Digiposte](https://www.laposte.fr/digiposte/tous-mes-documents-partout-et-tout-le-temps) : conseil et audit, puis gestion de projet et synchronisation de plusieurs équipes entre différentes sociétés.",
          "Legal & General — Refonte du front-office (ASP.NET, BackboneJS, Orchard).",
          "[ASIP Santé](https://esante.gouv.fr/lagence) (déc. 2010 → oct. 2012) — « Démonstrateur DMP » (.NET / WPF, interface aux APIs du DMP).",
          "Publications / conférences : article sur le blog OCTO (« Usine de développement .NET avec Git et TeamCity »), conférences d'introduction à l'Agile pour les M2 Info de l'Université Paris Diderot.",
        ],
      },
      {
        role: 'Tournament Manager / In-house app developer',
        company: 'Meltdown eSports Bars',
        logoBG: 'rgb(0,0,0)',
        logoUrl: 'https://static.observatoiredelafranchise.fr/images/logos/244/244/4435-logo_meltdownesportsbars.png',
        location: 'Paris',
        start: 'Janv. 2014',
        end: 'Mai 2014',
        bullets: [
          "Développement de l'app utilisée par les joueurs pour enregistrer leurs scores (wrapper BinaryBeast avec fonctionnalités additionnelles, NodeJS).",
          "Gestion des joueurs les soirs de tournoi (inscriptions, check-in, seeding des brackets) et liaison avec le staff du bar.",
          "Casting occasionnel.",
          "Co-création du format « Meltdown Starleague » : pensé pour cohabiter dans un bar, rester compétitif et accessible aux non pro-gamers, organisé chaque semaine sur 16 places en brackets.",
        ],
      },
      {
        role: 'Stage Développeur Front-end / Backend',
        company: 'GroupSquad',
        start: 'Avr. 2009',
        end: 'Août 2009',
        bullets: [
          "Maintenance de plusieurs applications de la plateforme.",
        ],
      },
    ],
    education: [
      {
        school: 'ESSEC Business School',
        degree: 'MS MPT — Management de projets technologiques',
        start: '2009',
        end: '2010',
      },
      {
        school: 'Université Paris Cité',
        degree: 'Master — Architecture et programmation informatique',
        start: '2008',
        end: '2009',
      },
    ],
    skills: [
        ...jargon,
      'Tests (TDD, unitaires & e2e)', 'Revue de code',
      'Observabilité', 'Architecture logicielle',
      'Tech leading', 'Mentorat', 'Animation de rituels',
    ],
    languages: [
      { name: 'Français', level: 'Langue maternelle' },
      { name: 'Anglais', level: 'Bilingue' },
    ],
    casting: [
      {
        title: 'Caster e-sport — Hoshin Casts',
        detail:
          "Commentaire d'événements e-sport online et offline, principalement sur Overwatch. Notamment caster du tournoi Overwatch de la Gamer Assembly 2024 et de l'All For One plusieurs années de suite. Disponible régulièrement pour des équipes, structures et streams de la scène française, avec un peu de casting en anglais depuis 2025.",
        year: 'Avr. 2018 — présent',
      },
    ],
    tournaments: [
      // Add notable tournaments here, e.g.:
      {
        name: 'Gamers Assembly',
        year: '2024-2026',
        role: 'Caster / Observateur',
        logoUrl: 'https://ga2026.gamers-assembly.net/static/img/logo.png',
        // logoBG: '#0b0b0b',  // optional dark frame for neon / light logos
      },
      {
        name: 'Overwatch All For One',
        year: '2022-2026',
        role: 'Caster / Observateur / Producteur',
        logoUrl: 'https://assets.olympe.xyz/assets/organizations/2/profile',
        // logoBG: '#0b0b0b',  // optional dark frame for neon / light logos
      },
      {
        name: 'FaceIt Masters EMEA',
        year: '2022-2026',
        role: 'Caster / Observateur / Producteur',
        logoUrl: 'https://assets.faceit-cdn.net/organizer_avatar/faceit_1551450699251.jpg',
        // logoBG: '#0b0b0b',  // optional dark frame for neon / light logos
      },
      {
        name: 'Overwatch World Cup 2026',
        year: '2026',
        role: 'Caster communautaire',
        logoUrl: 'https://esports.overwatch.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F267720%2F1500x385%2F92328b3026%2Fow_esports_logo_horizontal_backplate_lightbg.png&w=1080&q=75'
      }
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // ENGLISH
  // ─────────────────────────────────────────────────────────────────────
  en: {
    headline: 'Senior Software Engineer — Paris',
    experience: [
      {
        role: 'Senior Software Engineer',
        company: 'PayFit',
        logoUrl: 'https://payfit-prod-auth0-public-assets-rfso.s3.eu-west-3.amazonaws.com/logo/payfit_logo.svg',
        location: 'Paris, Île-de-France, France',
        start: 'Feb 2022',
        end: 'Present',
        bullets: [
          'Designed and implemented a unit testing framework for our LowCode DSL.',
          'Bootstrapped a testing API that brings all DSL testing tools under one fold and enables downstream CI/CD automated testing.',
          'Contributed to upgrading our LowCode deployment tools.',
          '"Keeping the lights on": support to builders, migration of compute tasks from containers to AWS Lambdas / Step Functions, incremental QoL updates to the app used by builders as an IDE.',
          'One of the "rebooters" of the internal ["Engineering I/O"](https://engineering.payfit.io) conference — a quarterly tech afternoon open to all engineers and curious folks.',
          'Team rituals regular: running retrospectives, occasionally organising get-togethers and team-building events.',
        ],
      },
      {
        role: 'Senior Fullstack Developer',
        company: 'Virtuo',
        location: 'Paris Area, France · Hybrid',
        logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fplay-lh.googleusercontent.com%2FJKRFG-BIj7C3-FlleCQ3z3JdxODqEebq8UTVnfiS9OyJ5K5JTNAxB3GGATWfyVIJ4LU&f=1&nofb=1&ipt=b384f5cc3e88531b796a8520065b2c909b5c8d199023afbc54f01674c940ff4c',
        start: 'Oct 2019',
        end: 'Jan 2022',
        bullets: [
          'Delivered new features in the Customer Experience team, including setup and integrations to make EVs available to our customers.',
          'Built the first version of charge-station addition to an EV customer trip: synced with a third-party provider, debugged their API jointly with them, integrated it into our systems.',
          'Led a refactor of the make/model onboarding pipeline: from a two-week dev + deploy + validation cycle per variant down to a few minutes of back-office data entry.',
          'Improved automated testing practices (technical & documentation) and code quality.',
          'Mentored and coached a more junior developer.',
        ],
      },
      {
        role: 'Senior Developer',
        company: 'La Poste',
        location: 'Paris, France',
        logoUrl: 'https://www.lapostegroupe.com/assets/media/le-groupe-laposte/8312d45c-311b-4dab-aee5-12b140882197_Logo.svg',
        start: 'Jul 2017',
        end: 'Oct 2019',
        bullets: [
          'Building an [API management platform](https://developer.laposte.fr/) for the group, to expose services in a unified way both to the public and internally.',
        ],
      },
      {
        role: 'Developer',
        company: 'PrestaShop',

        logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.seeklogo.com%2Flogo-png%2F48%2F1%2Fprestashop-logo-png_seeklogo-482184.png&f=1&nofb=1&ipt=e25358e3c8ec3918ea8d14362a005122206239572cea66714d21fcbc596cc677',
        start: 'Jan 2017',
        end: 'Mar 2017',
        bullets: [
            "First steps creating an e-commerce API for Prestashop, made to work without any tied in front-end, in the spirit of the Shopify API"
        ],
      },
      {
        role: 'Consultant',
        company: 'OCTO Technology',
        logoUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.SA3S4j5vN1GMjLsS27XbJAAAAA%3Fpid%3DApi&f=1&ipt=809778524f44e9c2de872abe398438a0a423ab1d6b5c1e697efb6be992b2dc84',
        location: 'Paris, France',
        start: 'Apr 2010',
        end: 'Dec 2016',
        summary: 'Notable missions:',
        bullets: [
          'La Poste (May → Dec 2016) — NodeJS Tech Lead (NodeJS, BackboneJS).',
          'SGMAP (Apr → Jun 2016) — Rewrite of the Ludwig app (NodeJS, MongoDB, Webpack).',
          'DILA / SGMAP (Sep 2014 → Feb 2016) — Developer on the [France Connect](https://www.franceconnect.gouv.fr/) V1 project (NodeJS, OpenID Connect, franceconnect.gouv.fr).',
          'ING Netherlands (Jun 2015) — API proof of concept (Java, AngularJS), first step towards the Payconiq app.',
          'La Poste (1y+ total between Nov 2012 and May 2014) — [Digiposte](https://www.laposte.fr/digiposte/tous-mes-documents-partout-et-tout-le-temps): consultancy & audit, then mostly project management, synchronising several teams across different companies.',
          'Legal & General — Front-office overhaul (ASP.NET, BackboneJS, Orchard).',
          '[ASIP Santé](https://esante.gouv.fr/lagence) (Dec 2010 → Oct 2012) — "Démonstrateur DMP" (.NET / WPF, interface to the DMP APIs).',
          'Publications / talks: OCTO blog article ("Usine de développement .NET avec Git et TeamCity"); guest lectures on Agile for M2 CS students at Université Paris Diderot.',
        ],
      },
      {
        role: 'Tournament Manager / In-house app developer',
        company: 'Meltdown eSports Bars',
        logoUrl: 'https://static.observatoiredelafranchise.fr/images/logos/244/244/4435-logo_meltdownesportsbars.png',
        logoBG: 'rgb(0,0,0)',
        location: 'Paris',
        start: 'Jan 2014',
        end: 'May 2014',
        bullets: [
          'Developed the app players used to register their scores (BinaryBeast wrapper with extra features, NodeJS).',
          'Ran player management on tournament nights (registration, check-in, bracket seeding) and acted as liaison with the bar staff.',
          'Occasional casting.',
          'Co-created the "Meltdown Starleague" concept — a format designed to fit a bar, stay competitive yet affordable for non-pro gamers, running weekly 16-player brackets where top FR Starcraft 2 players and average players could compete head-to-head without the former just stomping the latter.',
        ],
      },
      {
        role: 'Front-end / Backend Developer intern',
        company: 'GroupSquad',
        start: 'Apr 2009',
        end: 'Aug 2009',
        bullets: [
          'Maintainer of several apps on the platform.',
        ],
      },
    ],
    education: [
      {
        school: 'ESSEC Business School',
        degree: 'MS MPT — Management of technological projects',
        start: '2009',
        end: '2010',
      },
      {
        school: 'Université Paris Cité',
        degree: "Master's — IT architecture & programming",
        start: '2008',
        end: '2009',
      },
    ],
    skills: [
        ...jargon,
      'Testing (TDD, unit & e2e)', 'Code review',
      'Observability', 'Software architecture',
      'Tech leading', 'Mentoring', 'Facilitation',
    ],
    languages: [
      { name: 'French', level: 'Native proficiency' },
      { name: 'English', level: 'Bilingual proficiency' },
    ],
    casting: [
      {
        title: 'E-sports caster — Hoshin Casts',
        detail:
          'Casting online and offline e-sports events, mostly tied to Overwatch. Notably cast the 2024 Gamer Assembly Overwatch tournament and the All For One for several years. Regularly available to teams, structures and Twitch streams of the French scene, with some English casting starting in 2025.',
        year: 'Apr 2018 — present',
      },
    ],
    tournaments: [
      // Add notable tournaments here, e.g.:
      {
        name: 'Gamers Assembly',
        year: '2024-2026',
        role: 'Caster / Observer',
        logoUrl: 'https://ga2026.gamers-assembly.net/static/img/logo.png',
        // logoBG: '#0b0b0b',  // optional dark frame for neon / light logos
      },
      {
        name: 'Overwatch All For One',
        year: '2022-2026',
        role: 'Caster / Observer / Producer',
        logoUrl: 'https://assets.olympe.xyz/assets/organizations/2/profile',
        // logoBG: '#0b0b0b',  // optional dark frame for neon / light logos
      },
      {
        name: 'FaceIt Masters EMEA',
        year: '2022-2026',
        role: 'Caster / Observer / Producer',
        logoUrl: 'https://assets.faceit-cdn.net/organizer_avatar/faceit_1551450699251.jpg',
        // logoBG: '#0b0b0b',  // optional dark frame for neon / light logos
      },
      {
        name: 'Overwatch World Cup 2026',
        year: '2026',
        role: 'Community caster',
        logoUrl: 'https://esports.overwatch.com/_next/image?url=https%3A%2F%2Fa.storyblok.com%2Ff%2F267720%2F1500x385%2F92328b3026%2Fow_esports_logo_horizontal_backplate_lightbg.png&w=1080&q=75'
      }
    ],
  },
};
