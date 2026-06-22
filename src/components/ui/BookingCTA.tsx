import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const PULSE_CSS = `
  @keyframes bookingPulse {
    0%   { transform: scale(1); opacity: 0.6; }
    70%  { transform: scale(2.0); opacity: 0; }
    100% { transform: scale(2.0); opacity: 0; }
  }
`;

/**
 * Floating "Book Us" CTA button — fixed bottom-right, all pages.
 * Hidden on /highlights so it doesn't overlap the animation.
 */
export default function BookingCTA() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (pathname === '/highlights') return null;

  const handleClick = () => {
    if (pathname !== '/') {
      navigate('/');
      // After navigation, give the page a moment to render then scroll
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 350);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{PULSE_CSS}</style>
      <div style={{
        position: 'fixed',
        bottom: '88px',
        right: '20px',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}>
        {/* Button wrapper — rings are positioned relative to this, not the whole column */}
        <div style={{ position: 'relative', width: '48px', height: '48px' }}>
          {/* Pulse rings — centered exactly on the button */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            {[0, 0.6].map((delay) => (
              <div
                key={delay}
                style={{
                  position: 'absolute',
                  width: '48px', height: '48px', borderRadius: '50%',
                  border: '2px solid rgba(196,30,58,0.7)',
                  animationName: 'bookingPulse',
                  animationDuration: '2.2s',
                  animationTimingFunction: 'ease-out',
                  animationIterationCount: 'infinite',
                  animationDelay: `${delay}s`,
                }}
              />
            ))}
          </div>

          {/* Button */}
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.93 }}
            title="Book Metronorms"
            style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #8B0000, #C41E3A)',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 24px rgba(196,30,58,0.5), 0 2px 8px rgba(0,0,0,0.6)',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: '18px',
              position: 'relative', zIndex: 1,
            }}
          >
            📅
          </motion.button>
        </div>

        {/* Label */}
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.52rem', letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
          whiteSpace: 'nowrap',
        }}>
          Book Us
        </div>
      </div>
    </>
  );
}
