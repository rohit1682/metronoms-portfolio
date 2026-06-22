import { useEffect } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo/logo.jpeg';

interface LogoSplashProps {
  onComplete: () => void;
}

// Total splash duration in ms — adjust here to change splash length
const SPLASH_DURATION_MS = 2800;

export default function LogoSplash({ onComplete }: LogoSplashProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Logo — keyframe animation: invisible → appear → hold → fade out */}
      <motion.img
        src={logo}
        alt="Metronorms"
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.75, 1, 1, 1.05],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.22, 0.7, 1],
          ease: 'easeInOut',
        }}
        style={{
          width: 'min(220px, 55vw)',
          height: 'min(220px, 55vw)',
          objectFit: 'contain',
          borderRadius: '8px',
          filter: 'drop-shadow(0 0 30px rgba(196,30,58,0.5))',
        }}
      />

      {/* Band name fades in beneath the logo */}
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: [0, 0, 1, 0],
          y: [8, 8, 0, 0],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.25, 0.55, 1],
          ease: 'easeInOut',
        }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.2rem, 5vw, 2rem)',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.85)',
          textTransform: 'uppercase',
        }}
      >
        METRONORMS
      </motion.span>

      {/* Red bottom bar — sweeps across like Netflix */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{
          scaleX: [0, 1, 1, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 2.6,
          times: [0, 0.2, 0.7, 1],
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, var(--dark-red), var(--crimson), var(--red-bright))',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  );
}
