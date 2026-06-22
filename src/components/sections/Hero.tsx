import { motion } from 'framer-motion';
import AnimatedText from '../ui/AnimatedText';
import { BRAND, CONTACT } from '../../constants';
import { HERO_BG, GROUP_PHOTOS } from '../../constants/images';
import { HERO_UI } from '../../constants/ui';

// Ken Burns: slow drift + subtle zoom — brings the static photo to life
const KEN_BURNS_CSS = `
  @keyframes kenBurns {
    0%   { transform: scale(1.06) translate(0%, 0%); }
    33%  { transform: scale(1.10) translate(-1.2%, -0.6%); }
    66%  { transform: scale(1.08) translate(0.8%, 0.4%); }
    100% { transform: scale(1.06) translate(0%, 0%); }
  }
  .hero-bg-img {
    animation: kenBurns 18s ease-in-out infinite;
    will-change: transform;
  }

  /* Stack hero buttons vertically on very small screens */
  @media (max-width: 400px) {
    .hero-action-row {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .hero-action-row button {
      width: 100% !important;
    }
  }

  /* Scroll indicator: hidden on very short viewports to avoid overlap */
  .hero-scroll-indicator {
    display: flex;
  }
  @media (max-height: 480px) {
    .hero-scroll-indicator {
      display: none !important;
    }
  }
`;

export default function Hero() {
  const bgImage = HERO_BG || GROUP_PHOTOS[0];

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <style>{KEN_BURNS_CSS}</style>

      {/* Ken Burns background */}
      {bgImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden',
          }}
        >
          <img
            src={bgImage}
            alt=""
            className="hero-bg-img"
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 30%',
              display: 'block',
            }}
          />
        </motion.div>
      )}

      {/* Uniform dark base */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(10,10,10,0.38)', zIndex: 1,
      }} />

      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.70) 40%, rgba(10,10,10,0.92) 80%, #0a0a0a 100%)',
        zIndex: 1,
      }} />

      {/* Red vignette edge */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 38%, rgba(139,0,0,0.28) 100%)',
        zIndex: 2,
      }} />

      {/* Content — paddingBottom reserves space for the scroll indicator so it never overlaps */}
      <div style={{
        position: 'relative', zIndex: 3,
        textAlign: 'center',
        padding: 'clamp(32px, 6vh, 60px) 24px clamp(100px, 16vh, 140px)',
        maxWidth: '960px', width: '100%',
      }}>
        {/* Top label */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-body)', fontSize: '0.7rem',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--crimson)', marginBottom: '24px',
          }}
        >
          {BRAND.instagram}
        </motion.div>

        {/* Band name — letter stagger with crimson glow */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.5rem, 16vw, 10rem)',
          letterSpacing: '0.05em', lineHeight: 0.9,
          color: 'var(--white)', marginBottom: '0',
          textTransform: 'uppercase', display: 'block',
          textShadow: '0 0 60px rgba(196,30,58,0.35), 0 0 120px rgba(139,0,0,0.2)',
        }}>
          <AnimatedText text={BRAND.name} delay={0.5} staggerDelay={0.06} />
        </h1>

        {/* Red divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.6, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          style={{
            width: '80px', height: '3px',
            background: 'linear-gradient(90deg, var(--dark-red), var(--crimson))',
            margin: '28px auto',
            borderRadius: '2px', transformOrigin: 'left',
            boxShadow: '0 0 12px rgba(196,30,58,0.5)',
          }}
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-italic)', fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 3vw, 1.2rem)',
            color: 'var(--white-dim)', letterSpacing: '0.08em',
            marginBottom: '40px',
          }}
        >
          {HERO_UI.tagline}
        </motion.p>

        {/* Action row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="hero-action-row"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexWrap: 'wrap', gap: '16px',
          }}
        >
          {/* Explore button */}
          <motion.button
            onClick={scrollToAbout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 36px',
              background: 'transparent',
              border: '1px solid var(--crimson)',
              color: 'var(--white)',
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(196,30,58,0.2)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(196,30,58,0.3)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'transparent';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            {HERO_UI.ctaLabel}
          </motion.button>

          {/* Book Us pill */}
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            style={{
              padding: '13px 36px',
              background: 'linear-gradient(135deg, #8B0000, #C41E3A)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#fff',
              fontFamily: 'var(--font-body)', fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.2em',
              textTransform: 'uppercase', cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(196,30,58,0.4)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 28px rgba(196,30,58,0.65)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(196,30,58,0.4)';
            }}
          >
            Book Us
          </motion.button>
        </motion.div>

        {/* Booking phone — subtle below buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3, duration: 0.8 }}
          style={{
            marginTop: '18px', fontSize: '0.72rem',
            color: 'var(--white-muted)', letterSpacing: '0.12em',
          }}
        >
          {CONTACT.bookingLabel} {CONTACT.phones[0].number}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.6 }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)', zIndex: 3,
          flexDirection: 'column',
          alignItems: 'center', gap: '8px', cursor: 'pointer',
        }}
        onClick={scrollToAbout}
      >
        <span style={{
          fontSize: '0.62rem', letterSpacing: '0.2em',
          textTransform: 'uppercase', color: 'var(--white-muted)',
        }}>
          {HERO_UI.scrollLabel}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px', height: '40px',
            background: 'linear-gradient(180deg, var(--crimson), transparent)',
            borderRadius: '1px',
          }}
        />
      </motion.div>
    </section>
  );
}
