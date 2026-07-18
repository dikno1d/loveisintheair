'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [particles, setParticles] = useState<{ w: number; h: number; x: number; y: number; dur: number; del: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }, () => ({
        w: 1 + Math.random() * 2,
        h: 1 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: 2 + Math.random() * 2,
        del: Math.random() * 2,
      }))
    );
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {particles.map((p, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${p.w}px`,
                height: `${p.h}px`,
                borderRadius: '50%',
                background: 'rgba(232,160,191,0.4)',
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: p.dur,
                repeat: Infinity,
                delay: p.del,
              }}
            />
          ))}

          <div className="loading-heart" />
          <p className="loading-text">Loading Love</p>
          <div className="loading-bar">
            <div className="loading-bar-fill" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
