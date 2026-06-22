import type { Easing } from 'framer-motion';

// Shared cubic-bezier easing for Framer Motion variants
// Typed explicitly to satisfy TS strict mode with Framer Motion v12
export const EASE_SMOOTH: Easing = [0.4, 0, 0.2, 1] as [number, number, number, number];
