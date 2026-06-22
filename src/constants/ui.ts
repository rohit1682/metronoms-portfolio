// ─────────────────────────────────────────────────────────────────────────────
// UI TEXT CONSTANTS
// All display strings used across components — edit here to update the site
// ─────────────────────────────────────────────────────────────────────────────

export const HERO_UI = {
  tagline: 'Experimental Rock · Kolkata, India',
  ctaLabel: 'Explore Our World',
  scrollLabel: 'Scroll to discover',
} as const;

export const ABOUT_UI = {
  sectionNumber: '01',
  displayHeading: 'Who We Are',
} as const;

export const EXPERIENCE_UI = {
  sectionNumber: '02',
  displayHeading: 'Our Journey',
} as const;

export const MEMBERS_UI = {
  sectionNumber: '03',
  displayHeading: 'The Band',
  subheading: 'Five instruments. One chemistry. Endless possibilities.',
  swipeHint: 'Swipe to explore',
  // Member roles — key must match MEMBERS.list[].name exactly
  roles: {
    SHESHTHO: 'Lead Guitar & Vocals',
    JOYORSHI: 'Rhythm Guitar',
    KOUSTAV: 'Guitar',
    MANODEEP: 'Bass & Booking',
    ARKADEEP: 'Drums',
    ANIKET: 'Keyboards',
    ANISH: 'Vocals',
  } as Record<string, string>,
  fallbackRole: 'Band Member',
} as const;

export const GALLERY_UI = {
  sectionNumber: '04',
  displayHeading: 'Our Highlights',
  subheading: 'Moments captured from stages across Kolkata.',
  emptyMessage: 'No photos in this category yet.',
} as const;

export const CONTACT_UI = {
  sectionNumber: '05',
  displayHeading: 'Book Us',
  subheading: "Ready to bring Metronorms to your stage? Reach out and let's make it happen.",
} as const;

export const SIDEBAR_ICONS: Record<string, string> = {
  home: '◈',
  about: '◉',
  experience: '◎',
  members: '◈',
  gallery: '◆',
  contact: '◇',
};
