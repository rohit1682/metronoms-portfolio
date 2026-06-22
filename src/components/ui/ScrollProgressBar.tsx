import { useScroll, useSpring, motion } from 'framer-motion';

/**
 * Thin crimson progress bar fixed at the very top of the viewport.
 * Tracks window scroll progress (0 → 1) smoothed by a spring.
 * Uses scaleX transform only — zero layout cost.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        transformOrigin: 'left',
        scaleX,
        background: 'linear-gradient(90deg, #8B0000, #C41E3A, #FF1744)',
        zIndex: 9999,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    />
  );
}
