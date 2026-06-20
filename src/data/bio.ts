export interface BioContent {
  /** Short intro line under the name in the about section */
  lead: string;
  /** Engineer-side narrative (2 short paragraphs) */
  engineer: string[];
  /** Caster-side narrative (2 short paragraphs) */
  caster: string[];
  /** A few small "fact" badges */
  facts: { label: string; value: string }[];
}

export const bio: Record<'fr' | 'en', BioContent> = {
  fr: {
    lead:
      "Développeur passionné par le code et l'amélioration continue, et accessoirement caster Overwatch sur la scène esport francophone.",
    engineer: [
      "Je suis Senior Software Engineer, basé à Paris. J'aime creuser les sujets en profondeur, comprendre les systèmes que je manipule, et grand adepte de la Boy Scout Rule.",
      "Je m'intéresse particulièrement à la qualité, à l'observabilité, et aux pratiques qui permettent à une équipe d'aller vite sans casser ce qui marche déjà.",
      "« Et ta position par rapport à l'IA, c'est quoi ? » : Un outil formidable mais qui, pour bien faire, demande encore plus de rigueur (technique, organisationnelle, mais aussi RH) que quand on faisait sans. Ce n'est PAS un marteau doré, malgré ce que les plus enthousiastes d'entre nous voudraient parfois nous faire croire :D"
    ],
    caster: [
      "Je commente Overwatch en français sous le pseudo Hoshin — c'est aussi mon handle en ligne sur la plupart des plateformes. Je couvre des tournois (Overwatch All For One, Gamers Assembly, LANs locales, FaceIt League), des ligues amateur et des rendez-vous communautaires de la scène FR, en online comme en offline.",
      "Le casting, pour moi, c'est raconter une histoire en direct : rendre lisible un jeu très dense, donner du contexte aux moments forts, et partager l'émotion avec le public. C'est un complément naturel à mon métier de dev — deux façons de transformer de la complexité en quelque chose qui se comprend.",
    ],
    facts: [
      { label: 'Basé à', value: 'Paris, FR' },
      { label: 'Langues', value: 'FR · EN' },
      { label: 'Stack', value: 'TypeScript · Node · React · Kubernetes' },
    ],
  },
  en: {
    lead:
      "Developer passionate about code and continuous improvement, and Overwatch caster on the French-speaking esports scene on the side.",
    engineer: [
      "I'm a Senior Software Engineer based in Paris. I like digging into the systems I work on, understanding them deeply, and making sure the code I leave behind is easier to pick up than the one I found.",
      "I care especially about quality, observability, and the practices that let a team move fast without breaking what already works.",
      "\"What is your take on AI?\" : An incredible tool that makes things even more demanding than before (from a technical, organizational, but also HR standpoint), if you want to do things right. It is NOT a golden hammer, whatever the most enthusiasts among us would sometimes want us to believe =)",
    ],
    caster: [
      "I cast Overwatch in French under the Hoshin handle — it's also my online name across most platforms. I cover tournaments, amateur leagues and community events of the FR scene, both online and offline.",
      "Casting, to me, is telling a live story: making a dense game readable, giving context to the big moments, and sharing the emotion with the audience. It's a natural counterpart to my day job — two ways of turning complexity into something people can follow.",
    ],
    facts: [
      { label: 'Based in', value: 'Paris, FR' },
      { label: 'Languages', value: 'FR · EN' },
      { label: 'Stack', value: 'TypeScript · Node · React · Kubernetes' },
    ],
  },
};
