'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Petal({ index }: { index: number }) {
  const colors = ['#e8a0bf', '#f0c4d8', '#ff69b4', '#ffb7c5', '#d4a574'];
  const color = colors[index % colors.length];
  const startX = Math.random() * 100;
  const driftX = (Math.random() - 0.5) * 80;
  const dur = 2 + Math.random() * 2;
  const delay = Math.random() * 1.2;
  const size = 6 + Math.random() * 6;

  return (
    <motion.div
      initial={{ x: `${startX}vw`, y: -20, rotate: 0, opacity: 1 }}
      animate={{ y: '110vh', rotate: 360 + Math.random() * 360, x: `${startX + driftX}vw`, opacity: [1, 1, 0] }}
      transition={{ duration: dur, delay, ease: 'easeIn' }}
      style={{ position: 'absolute', pointerEvents: 'none' }}
    >
      <svg width={size} height={size} viewBox="0 0 10 10">
        <ellipse cx="5" cy="5" rx="4" ry="5" fill={color} opacity="0.7" transform={`rotate(${Math.random() * 60})`} />
      </svg>
    </motion.div>
  );
}

export default function EasterEggs() {
  const [showMessage, setShowMessage] = useState(false);
  const [petalRain, setPetalRain] = useState(false);

  const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','Right','b','a'];
  const [konamiIndex, setKonamiIndex] = useState(0);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === konamiCode[konamiIndex]) {
      const next = konamiIndex + 1;
      if (next === konamiCode.length) {
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 4000);
        setKonamiIndex(0);
      } else {
        setKonamiIndex(next);
      }
    } else {
      setKonamiIndex(0);
    }
  }, [konamiIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    let clickCount = 0;
    let timer: ReturnType<typeof setTimeout>;
    const handler = () => {
      clickCount++;
      if (clickCount === 2) {
        setPetalRain(true);
        setTimeout(() => setPetalRain(false), 5000);
        clickCount = 0;
      }
      clearTimeout(timer);
      timer = setTimeout(() => { clickCount = 0; }, 400);
    };
    window.addEventListener('dblclick', handler);
    return () => { window.removeEventListener('dblclick', handler); clearTimeout(timer); };
  }, []);

  return (
    <>
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            style={{
              position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              zIndex: 10000, background: 'rgba(13,10,20,0.96)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(232,160,191,0.25)', borderRadius: '28px',
              padding: '48px 64px', textAlign: 'center',
              boxShadow: '0 0 80px rgba(232,160,191,0.25)',
            }}
          >
            <motion.p animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}
              style={{
                fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700,
                background: 'linear-gradient(135deg, #e8a0bf, #d4a574)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                display: 'flex', alignItems: 'center', gap: '10px',
              }}>
              I love you
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#e8a0bf" style={{ flexShrink: 0 }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {petalRain && (
          <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
            {Array.from({ length: 50 }, (_, i) => (
              <Petal key={i} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
