export interface Social {
  id: string;
  label: string;
  href: string;
  /**
   * Iconify icon name, e.g. "simple-icons:linkedin" or "lucide:mail".
   * Resolved at build time by astro-icon. Available collections are declared
   * in package.json via @iconify-json/* dependencies.
   */
  icon: string;
  /** Optional short description for the Links section card */
  description?: string;
  /** Highlight as the primary "go-to" link in the Links section */
  featured?: boolean;
  /**
   * Which identity this link belongs to.
   * - 'pro'    → grouped under the engineer/pro Links subsection
   * - 'caster' → grouped under the caster Links subsection
   */
  group: 'pro' | 'caster';
}

/**
 * NOTE: Replace any remaining TODO handles with your real ones before deploying.
 */
export const socials: Social[] = [
  // ── PRO ────────────────────────────────────────────────────────────
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/martinbahier/',
    group: 'pro',
    icon: 'simple-icons:linkedin',
  },
  {
    id: 'email-pro',
    label: 'Email',
    href: 'mailto:martin.bahier@gmail.com',
    group: 'pro',
    icon: 'lucide:mail',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/hoshin',
    group: 'pro',
    featured: true,
    description: 'Mon profil GitHub : code perso, expérimentations et contributions open-source.',
    icon: 'simple-icons:github',
  },
  // ── CASTER ─────────────────────────────────────────────────────────
  {
    id: 'hoshin',
    label: 'Hoshin Casts',
    href: 'https://www.hoshin-casts.com',
    group: 'caster',
    featured: true,
    description: 'Mon site perso de casting Overwatch.',
    icon: 'lucide:headphones',
  },
  {
    id: 'discord',
    label: 'Discord',
    href: 'https://discordapp.com/users/.hoshin',
    group: 'caster',
    icon: 'simple-icons:discord',
  },
  {
    id: 'twitch',
    label: 'Twitch',
    href: 'https://www.twitch.tv/hoshinawen',
    group: 'caster',
    icon: 'simple-icons:twitch',
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    href: 'https://twitter.com/Hoshin_OW',
    group: 'caster',
    icon: 'simple-icons:x',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: 'https://www.youtube.com/@HoshInawen',
    group: 'caster',
    icon: 'simple-icons:youtube',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/hoshincasts',
    group: 'caster',
    icon: 'simple-icons:instagram',
  },
  {
    id: 'email-caster',
    label: 'Email',
    href: 'mailto:hoshin-casts@proton.me',
    group: 'caster',
    icon: 'lucide:mail',
  },
];

export const proSocials = socials.filter((s) => s.group === 'pro');
export const casterSocials = socials.filter((s) => s.group === 'caster');
export const featuredPro = proSocials.find((s) => s.featured)!;
export const featuredCaster = casterSocials.find((s) => s.featured)!;
