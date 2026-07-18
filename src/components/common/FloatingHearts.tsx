'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

function CSSHeart({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    setHearts(
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 8 + Math.random() * 12,
        delay: Math.random() * 25,
        duration: 12 + Math.random() * 18,
        opacity: 0.06 + Math.random() * 0.12,
      }))
    );
  }, []);

  if (hearts.length === 0) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          style={{
            position: 'absolute', left: `${h.left}%`, bottom: '-20px',
            opacity: h.opacity, pointerEvents: 'none',
          }}
          animate={{
            y: [0, -1400],
            x: [0, Math.sin(h.id) * 40],
            rotate: [0, 360],
          }}
          transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: 'linear' }}
        >
          <CSSHeart size={h.size} color="#e8a0bf" />
        </motion.div>
      ))}
    </div>
  );
}
