/**
 * Central site configuration.
 * All external URLs live here. No invented repository links:
 * `github` stays null until an official Macmo repository URL is confirmed.
 */

export const site = {
  name: 'Macmo',
  tagline: 'AI Agent Command Center for macOS',
  description:
    'Macmo is a native macOS command center for AI agents. See what your AI agents are doing, control them when it matters, and give every agent an identity. Local-first and in early development.',
  domain: 'https://macmo.anakterubuk.tech',
  canonical: 'https://macmo.anakterubuk.tech/',
  lang: 'en',
  locale: 'en_US',
  status: 'Early Development',
} as const;

export const studio = {
  name: 'ANAK TERUBUK',
  url: 'https://anakterubuk.tech/',
  descriptor: 'Independent Software & AI Studio',
} as const;

export const links: {
  studio: string;
  contact: string;
  /** Official Macmo repository — null until confirmed. */
  github: string | null;
} = {
  studio: studio.url,
  contact: 'mailto:hello@anakterubuk.tech',
  github: null,
};

export const contact = {
  email: 'hello@anakterubuk.tech',
} as const;

export const nav = [
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Agents', href: '/#agents' },
  { label: 'Security', href: '/#security' },
] as const;

export const footerLinks = [
  { label: studio.name, href: links.studio },
  { label: 'GitHub', href: links.github },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Contact', href: '/contact' },
].filter((link): link is { label: string; href: string } => link.href !== null);

/** Primary development CTA — ANAK TERUBUK until the official repo is confirmed. */
export const developmentCta = {
  label: "Follow Macmo's development",
  href: links.studio,
} as const;
