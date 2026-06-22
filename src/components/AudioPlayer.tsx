import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore — Vite resolves .wav assets as URLs
import track from '../assets/OC/SADDHO NEI AMAR MASTER.wav';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const autoplayPendingRef = useRef(false);

  // Attempt autoplay on mount. If the browser blocks it, register a one-time
  // listener so music starts automatically on the very first user interaction.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;

    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
        autoplayPendingRef.current = false;
        // Remove the interaction listener once playing
        document.removeEventListener('click', startAudio);
        document.removeEventListener('touchstart', startAudio);
        document.removeEventListener('keydown', startAudio);
        document.removeEventListener('scroll', startAudio);
        window.removeEventListener('wheel', startAudio);
      } catch {
        // Still blocked — will retry on next interaction
      }
    };

    const tryAutoplay = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
      } catch {
        // Autoplay blocked by browser policy.
        // Register a one-time listener: play as soon as the user touches anything.
        autoplayPendingRef.current = true;
        document.addEventListener('click', startAudio, { once: false });
        document.addEventListener('touchstart', startAudio, { once: false });
        document.addEventListener('keydown', startAudio, { once: false });
        document.addEventListener('scroll', startAudio, { once: false, passive: true });
        window.addEventListener('wheel', startAudio, { once: false, passive: true });
      }
    };

    tryAutoplay();

    return () => {
      document.removeEventListener('click', startAudio);
      document.removeEventListener('touchstart', startAudio);
      document.removeEventListener('keydown', startAudio);
      document.removeEventListener('scroll', startAudio);
      window.removeEventListener('wheel', startAudio);
    };
  }, []);

  // Show tooltip only when autoplay was blocked (so user knows to tap)
  useEffect(() => {
    if (hasInteracted) return;
    const t = setTimeout(() => setShowTooltip(true), 1200);
    const t2 = setTimeout(() => setShowTooltip(false), 5500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [hasInteracted]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setHasInteracted(true);

    if (audio.paused) {
      await audio.play().catch(() => {});
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !audio.muted;
    setIsMuted(audio.muted);
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio ref={audioRef} src={track} preload="none" />

      {/* Floating player — fixed bottom-right */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '20px',
          zIndex: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '8px',
        }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {(showTooltip && !hasInteracted) && (
            <motion.div
              initial={{ opacity: 0, y: 6, x: 10 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.3 }}
              style={{
                background: 'rgba(10,10,10,0.92)',
                border: '1px solid rgba(139,0,0,0.4)',
                borderRadius: '4px',
                padding: '8px 14px',
                fontSize: '0.72rem',
                color: 'var(--white-dim)',
                letterSpacing: '0.06em',
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(8px)',
              }}
            >
              🎵 Tap anywhere to start music
            </motion.div>
          )}
        </AnimatePresence>

        {/* Control row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Track label — visible when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'rgba(10,10,10,0.85)',
                  border: '1px solid rgba(139,0,0,0.3)',
                  borderRadius: '3px',
                  padding: '6px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {/* Animated bars */}
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['4px', '14px', '7px', '12px', '4px'] }}
                      transition={{
                        duration: 0.9,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                      style={{
                        width: '3px',
                        background: 'var(--crimson)',
                        borderRadius: '1px',
                      }}
                    />
                  ))}
                </div>
                <span style={{
                  fontSize: '0.68rem',
                  color: 'var(--white-dim)',
                  letterSpacing: '0.06em',
                  fontFamily: 'var(--font-body)',
                  maxWidth: '130px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  Saddho Nei Amar
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mute toggle — only visible when playing */}
          <AnimatePresence>
            {isPlaying && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={toggleMute}
                title={isMuted ? 'Unmute' : 'Mute'}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(10,10,10,0.85)',
                  border: '1px solid rgba(139,0,0,0.3)',
                  color: isMuted ? 'var(--white-muted)' : 'var(--white-dim)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
                whileTap={{ scale: 0.92 }}
              >
                {isMuted ? '🔇' : '🔊'}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Play / Pause main button */}
          <motion.button
            onClick={togglePlay}
            title={isPlaying ? 'Pause' : 'Play Saddho Nei Amar'}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              boxShadow: isPlaying
                ? ['0 0 10px rgba(196,30,58,0.3)', '0 0 22px rgba(196,30,58,0.6)', '0 0 10px rgba(196,30,58,0.3)']
                : '0 0 0px transparent',
            }}
            transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: isPlaying
                ? 'linear-gradient(135deg, var(--dark-red), var(--crimson))'
                : 'rgba(10,10,10,0.85)',
              border: '1px solid rgba(196,30,58,0.6)',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </motion.button>
        </div>
      </div>
    </>
  );
}
