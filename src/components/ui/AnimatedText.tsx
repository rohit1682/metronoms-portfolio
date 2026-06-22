import { motion } from 'framer-motion';
import { EASE_SMOOTH } from '../../utils/easing';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.04,
}: AnimatedTextProps) {
  const letters = text.split('');

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 40, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.5, ease: EASE_SMOOTH },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'wrap', perspective: '400px' }}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {letters.map((char, i) => (
        <motion.span
          key={i}
          variants={letter}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
