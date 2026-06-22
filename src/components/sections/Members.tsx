import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MEMBERS } from '../../constants';
import { MEMBER_HERO_PHOTO, MEMBER_PHOTOS } from '../../constants/images';
import { MEMBERS_UI } from '../../constants/ui';

function MemberCard({ member, index }: { member: { name: string }; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const photos = MEMBER_PHOTOS[member.name] ?? [];
  const heroPhoto = MEMBER_HERO_PHOTO[member.name];

  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.4, 0, 0.2, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setImgIndex(0); }}
      onTouchStart={() => setHovered((v) => !v)}
      style={{
        position: 'relative',
        aspectRatio: '3/4',
        borderRadius: '4px',
        overflow: 'hidden',
        cursor: 'pointer',
        border: hovered ? '1px solid rgba(196,30,58,0.7)' : '1px solid rgba(255,255,255,0.06)',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Glow on hover */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: '-2px',
              boxShadow: '0 0 30px rgba(196,30,58,0.4)',
              borderRadius: '4px',
              zIndex: 10,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>

      {/* Photo — cycles on hover if multiple available */}
      {heroPhoto ? (
        <motion.img
          src={hovered && photos[imgIndex + 1] ? photos[imgIndex + 1] : heroPhoto}
          alt={member.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center top',
            transition: 'transform 0.6s ease, filter 0.4s ease',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            filter: hovered ? 'brightness(0.7) contrast(1.1)' : 'brightness(0.9) contrast(1.05)',
          }}
          loading="lazy"
        />
      ) : (
        <div style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #1a1a1a, #0a0a0a)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '3rem',
            color: 'rgba(139,0,0,0.4)',
          }}>
            {member.name[0]}
          </span>
        </div>
      )}

      {/* Always-visible gradient at bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55%',
        background: 'linear-gradient(0deg, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.4) 60%, transparent 100%)',
        zIndex: 2,
      }} />

      {/* Name — always visible at bottom */}
      <div style={{
        position: 'absolute',
        bottom: '16px',
        left: '16px',
        right: '16px',
        zIndex: 3,
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          letterSpacing: '0.1em',
          color: 'var(--white)',
          lineHeight: 1,
        }}>
          {member.name}
        </div>

        {/* Role — slides up on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              style={{
                fontSize: '0.72rem',
                color: 'var(--crimson)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              {MEMBERS_UI.roles[member.name] ?? MEMBERS_UI.fallbackRole}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Photo count indicator */}
      {photos.length > 1 && (
        <div style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 3,
          fontSize: '0.65rem',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.1em',
          background: 'rgba(0,0,0,0.4)',
          padding: '3px 8px',
          borderRadius: '10px',
        }}>
          {photos.length} photos
        </div>
      )}
    </motion.div>
  );
}

export default function Members() {
  const { ref: headRef, inView: headInView } = useInView({ threshold: 0.2, triggerOnce: true });
  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="members"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        right: '-5%',
        width: '40%',
        height: '80%',
        background: 'radial-gradient(ellipse, rgba(139,0,0,0.07) 0%, transparent 70%)',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, x: -30 }}
          animate={headInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '48px' }}
        >
          <div style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.7rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--crimson)',
            marginBottom: '12px',
          }}>
            {MEMBERS_UI.sectionNumber} / {MEMBERS.heading}
          </div>
          <h2 className="section-heading" style={{ marginBottom: '8px' }}>
            {MEMBERS_UI.displayHeading}
          </h2>
          <div className="red-divider" />
          <p style={{
            fontFamily: 'var(--font-italic)',
            fontStyle: 'italic',
            fontSize: 'clamp(0.9rem, 2.5vw, 1.05rem)',
            color: 'var(--white-dim)',
            marginTop: '12px',
            maxWidth: '500px',
          }}>
            {MEMBERS_UI.subheading}
          </p>
        </motion.div>

        {/* Desktop grid */}
        <div
          className="members-grid-desktop"
          style={{
            display: 'none',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '16px',
          }}
        >
          {MEMBERS.list.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Mobile horizontal carousel */}
        <div
          className="members-carousel-mobile"
          ref={carouselRef}
          style={{
            display: 'flex',
            overflowX: 'auto',
            gap: '16px',
            paddingBottom: '16px',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
          }}
        >
          {MEMBERS.list.map((member, i) => (
            <div
              key={member.name}
              style={{
                flexShrink: 0,
                width: 'clamp(200px, 65vw, 280px)',
                scrollSnapAlign: 'start',
              }}
            >
              <MemberCard member={member} index={i} />
            </div>
          ))}
        </div>

        {/* Swipe hint — mobile only */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={headInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="swipe-hint-mobile"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            fontSize: '0.7rem',
            color: 'var(--white-muted)',
            letterSpacing: '0.1em',
          }}
        >
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
          {MEMBERS_UI.swipeHint}
        </motion.div>
      </div>

      <style>{`
        .members-carousel-mobile::-webkit-scrollbar { display: none; }
        @media (min-width: 768px) {
          .members-grid-desktop { display: grid !important; }
          .members-carousel-mobile { display: none !important; }
          .swipe-hint-mobile { display: none !important; }
        }
      `}</style>
    </section>
  );
}
