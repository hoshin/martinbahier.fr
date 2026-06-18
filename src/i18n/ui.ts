export const languages = {
  fr: 'Français',
  en: 'English',
} as const;

export const defaultLang = 'fr' as const;

export type Lang = keyof typeof languages;

export const ui = {
  fr: {
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.cv': 'CV',
    'nav.blog': 'Blog',
    'nav.links': 'Liens',
    'nav.skipToContent': 'Aller au contenu',

    'theme.toggle': 'Changer de thème',
    'lang.switch': 'Changer de langue',

    'hero.engineer.role': 'Senior Software Engineer',
    'hero.engineer.tagline': 'Développeur, animateur, coach... Je me mets au service de mon équipe pour l\'aider à réussir',
    'hero.engineer.cta': 'Voir mon CV',

    'hero.caster.role': 'Caster Overwatch',
    'hero.caster.tagline': "Caster, observer, Producer Overwatch sous le pseudo 'Hoshin'. Développeur d'outils d'aide à la production",
    'hero.caster.cta': 'Hoshin Casts',

    'about.title': 'À propos',
    'about.engineerHeading': 'Côté code',
    'about.casterHeading': 'Côté casting',

    'cv.title': 'CV',
    'cv.print': 'Imprimer / Enregistrer en PDF',
    'cv.fullPage': 'Voir le CV complet',
    'cv.experience': 'Expérience',
    'cv.education': 'Formation',
    'cv.skills': 'Compétences',
    'cv.languages': 'Langues',
    'cv.casting': 'Casting & esport',
    'cv.tournaments': 'Tournois couverts',
    'cv.present': 'Aujourd\'hui',

    'blog.title': 'Blog',
    'blog.subtitle': 'Notes, réflexions et retours d\'expérience.',
    'blog.latest': 'Derniers articles',
    'blog.viewAll': 'Voir tous les articles',
    'blog.empty': 'Aucun article pour l\'instant.',
    'blog.readMore': 'Lire la suite',
    'blog.publishedOn': 'Publié le',
    'blog.backToList': '← Retour au blog',
    'blog.minRead': 'min de lecture',

    'links.title': 'Liens',
    'links.subtitle': 'Pour me suivre ou me contacter.',
    'links.proHeading': 'Côté pro',
    'links.casterHeading': 'Côté caster',
    'links.hoshin': 'Hoshin Casts',
    'links.hoshinDesc': "Mon site perso de casting Overwatch — la vitrine de mon travail sur la scène francophone.",
    'links.githubKicker': 'Mon code',
    'links.githubDesc': 'Mon profil GitHub : projets en cours et expérimentations diverses',
    'links.hoshinKicker': 'Mon site vitrine de caster',

    'footer.builtWith': 'Construit avec Astro.',
    'footer.rights': 'Tous droits réservés.',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.cv': 'Resume',
    'nav.blog': 'Blog',
    'nav.links': 'Links',
    'nav.skipToContent': 'Skip to content',

    'theme.toggle': 'Toggle theme',
    'lang.switch': 'Switch language',

    'hero.engineer.role': 'Senior Software Engineer',
    'hero.engineer.tagline': 'Developer, facilitator, coach... I devote myself to my team to help it succeed.',
    'hero.engineer.cta': 'See my resume',

    'hero.caster.role': 'Overwatch Caster',
    'hero.caster.tagline': 'I cast French-speaking Overwatch esports under the Hoshin handle.',
    'hero.caster.cta': 'Hoshin Casts',

    'about.title': 'About',
    'about.engineerHeading': 'The engineer',
    'about.casterHeading': 'The caster',

    'cv.title': 'Resume',
    'cv.print': 'Print / Save as PDF',
    'cv.fullPage': 'See full resume',
    'cv.experience': 'Experience',
    'cv.education': 'Education',
    'cv.skills': 'Skills',
    'cv.languages': 'Languages',
    'cv.casting': 'Casting & esports',
    'cv.tournaments': 'Tournaments covered',
    'cv.present': 'Present',

    'blog.title': 'Blog',
    'blog.subtitle': 'Notes, thoughts and learnings.',
    'blog.latest': 'Latest posts',
    'blog.viewAll': 'See all posts',
    'blog.empty': 'No posts yet.',
    'blog.readMore': 'Read more',
    'blog.publishedOn': 'Published on',
    'blog.backToList': '← Back to blog',
    'blog.minRead': 'min read',

    'links.title': 'Links',
    'links.subtitle': 'Follow me or get in touch.',
    'links.proHeading': 'Pro',
    'links.casterHeading': 'Caster',
    'links.hoshin': 'Hoshin Casts',
    'links.hoshinDesc': 'My personal Overwatch casting site — the showcase of my work on the French-speaking scene.',
    'links.githubKicker': 'My code',
    'links.githubDesc': 'My GitHub profile: personal code, experiments and open-source contributions.',
    'links.hoshinKicker': 'My casting site',

    'footer.builtWith': 'Built with Astro.',
    'footer.rights': 'All rights reserved.',
  },
} as const;

export type UIKey = keyof (typeof ui)['fr'];

export function useTranslations(lang: Lang) {
  return function t(key: UIKey): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  if (segment === 'en') return 'en';
  return 'fr';
}
