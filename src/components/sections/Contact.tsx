import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CONTACT, BRAND, CLOSING } from '../../constants';
import { CONTACT_UI } from '../../constants/ui';

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(60px, 10vw, 120px) clamp(20px, 5vw, 60px)',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #080808 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background accent */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.4), transparent)',
      }} />

      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
      }}>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Label */}
          <motion.div
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--crimson)',
              marginBottom: '16px',
            }}
          >
            {CONTACT_UI.sectionNumber} / {CONTACT.heading}
          </motion.div>

          {/* Heading */}
          <motion.h2 variants={itemVariants} className="section-heading" style={{ marginBottom: '8px' }}>
            {CONTACT_UI.displayHeading}
          </motion.h2>

          <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="red-divider" />
          </motion.div>

          <motion.p
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-italic)',
              fontStyle: 'italic',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
              color: 'var(--white-dim)',
              lineHeight: 1.7,
              marginTop: '16px',
              marginBottom: '48px',
            }}
          >
            {CONTACT_UI.subheading}
          </motion.p>

          {/* Contact cards */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
              marginBottom: '40px',
            }}
          >
            {CONTACT.phones.map((phone) => (
              <motion.a
                key={phone.number}
                href={`tel:${phone.number.replace(/\s/g, '')}`}
                whileHover={{ scale: 1.03, borderColor: 'rgba(196,30,58,0.7)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: 'block',
                  padding: '20px',
                  background: 'rgba(139,0,0,0.08)',
                  border: '1px solid rgba(139,0,0,0.3)',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  fontSize: '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--crimson)',
                  marginBottom: '8px',
                }}>
                  {phone.label}
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  letterSpacing: '0.05em',
                  color: 'var(--white)',
                }}>
                  {phone.number}
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Instagram */}
          <motion.a
            variants={itemVariants}
            href={`https://instagram.com/${CONTACT.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 32px',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '2px',
              color: 'var(--white-dim)',
              textDecoration: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'all 0.3s ease',
              marginBottom: '56px',
            }}
          >
            <span style={{ fontSize: '1rem' }}>◆</span>
            @{CONTACT.instagram}
          </motion.a>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            style={{
              width: '100%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.4), transparent)',
              marginBottom: '40px',
            }}
          />

          {/* Thank you + band name */}
          <motion.div variants={itemVariants}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.06)',
              lineHeight: 1,
              marginBottom: '8px',
            }}>
              {CLOSING.message}
            </div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              letterSpacing: '0.2em',
              color: 'var(--crimson)',
            }}>
              — {BRAND.name}
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--white-muted)',
              letterSpacing: '0.1em',
              marginTop: '8px',
            }}>
              {BRAND.instagram}
            </div>
          </motion.div>

          {/* Primary contact name */}
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: '32px',
              fontSize: '0.72rem',
              color: 'var(--white-muted)',
              letterSpacing: '0.08em',
            }}
          >
            Primary contact: <span style={{ color: 'var(--white-dim)' }}>{CONTACT.primaryContact}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
