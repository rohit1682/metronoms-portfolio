// ─────────────────────────────────────────────────────────────────────────────
// METRONORMS — Portfolio Content Constants
// Source: metronorms portfolio.pdf
// Theme: Experimental rock band portfolio — dark, bold, high-energy aesthetic
// ─────────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: "METRONORMS",
  instagram: "@metronorms_music",
  instagramHandle: "metronorms_music",
  tagline: "PORTFOLIO",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// ABOUT US
// ─────────────────────────────────────────────────────────────────────────────

export const ABOUT = {
  heading: "ABOUT US",
  description: [
    "Metronorms is a 6-piece experimental rock band from Kolkata, India, known for bending genres and breaking musical conventions. What started as a group of friends jamming between classes quickly turned into something much bigger, built on a shared obsession with loud amps and a solid groove.",
    "We blend intricate rhythms, ambient soundscapes, and raw rock energy to deliver an immersive sonic journey. Over the last few years, we have cut our teeth on the competitive circuit, consistently proving we belong under the spotlight by placing in the top three across numerous inter-college fests and district competitions.",
    "From haunting melodies to high-octane breakdowns, our music reflects the chaos, curiosity, and consciousness of modern life.",
    "While the trophies are a great reminder of our hard work, for Metronorms, it has always been about the chemistry—bringing that disciplined, \"on-the-beat\" energy from the rehearsal room to a live crowd and turning every stage into a second home. Formed out of a mutual love for innovation and expression, our sound pulls from progressive rock, alternative, psychedelia, and Indian textures—resulting in something entirely our own.",
  ],
  genres: [
    "Progressive Rock",
    "Alternative",
    "Psychedelia",
    "Indian Textures",
  ],
  origin: "Kolkata, India",
  members: 5,
  type: "Experimental Rock Band",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// OUR EXPERIENCE
// ─────────────────────────────────────────────────────────────────────────────

export const EXPERIENCE = {
  heading: "OUR EXPERIENCE",
  summary:
    "Over the past two years, Metronorms has solidified our presence in the Kolkata live music scene, transforming from a group of friends into a disciplined, stage-ready act.",
  description: [
    "We have built our reputation by delivering high-impact performances across the city, including sets at Meghnad Saha Institute of Technology, Institute of Post Graduate Medical Education & Research and SSKM Hospital, Asutosh College, Future Institute of Engineering and Management, Techno India University, and Amity University.",
    "Beyond the college circuit, we have successfully expanded our footprint by playing private shows and securing competitive accolades, most notably finishing as the 2nd runner-up in \"Poila Parbona\" among the top 20 bands in Kolkata.",
    "These experiences have allowed us to consistently refine our live sound, ensuring that we bring professional precision to every performance. We take pride in our ability to adapt our high-octane energy to any setting, whether it's a bustling college fest or a social gathering.",
    "As we continue to evolve as a collective, our focus remains on pushing the boundaries of our performance and connecting deeply with our audience.",
    "We are currently active and available for bookings, ready to bring our unique, genre-bending sound and professional energy to your next event.",
  ],
  venues: [
    "Meghnad Saha Institute of Technology",
    "Institute of Post Graduate Medical Education & Research and SSKM Hospital",
    "Asutosh College",
    "Future Institute of Engineering and Management",
    "Techno India University",
    "Amity University",
  ],
  achievements: [
    {
      title: "2nd Runner-Up — \"Poila Parbona\"",
      detail: "Finished among the top 20 bands in Kolkata",
    },
    {
      title: "Top 3 — Multiple Inter-College Fests",
      detail: "Consistently placed in top three across numerous competitions",
    },
  ],
  bookingStatus: "Currently active and available for bookings",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// OUR ORIGINAL
// ─────────────────────────────────────────────────────────────────────────────

export const ORIGINAL = {
  heading: "OUR ORIGINAL",
  trackTitle: "Saddho Nei Amar",
  description: [
    "Marking a defining milestone in our journey, we have officially unveiled our debut original composition, \"Saddho Nei Amar.\"",
    "This release acts as a profound bridge between our origins in the high-energy college circuit and our emerging path as recording artists, perfectly encapsulating the experimental spirit that defines our sound.",
    "By blending intricate rhythms with evocative soundscapes, this track is the culmination of our shared creative vision and the dedicated hours we have spent refining our unique aesthetic in the rehearsal room.",
    "\"Saddho Nei Amar\" captures an immersive experience—both intimate and explosive—that represents the heart of our collaboration.",
    "It is now available to stream on all major music platforms, marking our boldest step yet in pushing the boundaries of our musical expression.",
  ],
  availability: "Available on all major music platforms",
  milestone: "Debut original composition",
  streamingLinks: {
    spotify: "https://open.spotify.com/track/4yst9KkO61zs0Ip1EFyTmE",
    amazonMusic: "https://music.amazon.in/albums/B0GY1MC4C1?trackAsin=B0GY1KX2TC",
    youtubeMusic: "https://music.youtube.com/watch?v=tP0-9Hp77gA",
    appleMusic: "https://music.apple.com/in/album/saddho-nei-amar/1895246054?i=6763282415",
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// OUR FACES — Band Members
// ─────────────────────────────────────────────────────────────────────────────

export const MEMBERS = {
  heading: "OUR FACES",
  list: [
    { name: "SHESHTHO" },
    { name: "JOYORSHI" },
    { name: "KOUSTAV" },
    { name: "MANODEEP" },
    { name: "ARKADEEP" },
    { name: "ANIKET" },
    { name: "ANISH" },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// OUR HIGHLIGHTS
// ─────────────────────────────────────────────────────────────────────────────

export const HIGHLIGHTS = {
  heading: "OUR HIGHLIGHTS",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// OUR CONTACT
// ─────────────────────────────────────────────────────────────────────────────

export const CONTACT = {
  heading: "OUR CONTACT",
  instagram: "metronorms_music",
  bookingLabel: "For Bookings:",
  phones: [
    { number: "+91 79806 16997", label: "Primary" },
    { number: "+91 90736 41090", label: "Secondary" },
    { number: "+91 86977 13788", label: "Tertiary" },
  ],
  primaryContact: "Manodeep & Metronorms",
  bandName: "Metronorms",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// CLOSING
// ─────────────────────────────────────────────────────────────────────────────

export const CLOSING = {
  message: "THANK YOU",
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION — Section labels matching PDF structure
// ─────────────────────────────────────────────────────────────────────────────

export const NAV_SECTIONS = [
  { id: "about", label: "About Us" },
  { id: "experience", label: "Our Experience" },
  { id: "original", label: "Our Original" },
  { id: "members", label: "Our Faces" },
  { id: "highlights", label: "Our Highlights" },
  { id: "contact", label: "Our Contact" },
] as const;
