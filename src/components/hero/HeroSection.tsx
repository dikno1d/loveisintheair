'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RoseGardenHero from './RoseGardenHero';

interface PetalData {
  id: number;
  delay: number;
  left: number;
  duration: number;
  size: number;
  drift1: number;
  drift2: number;
  rotateEnd: number;
}

interface GlowData {
  id: number;
  size: number;
  left: number;
  bottom: number;
  yEnd: number;
  dur: number;
}

function Petal({ data }: { data: PetalData }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${data.left}%`,
        top: '-20px',
        width: `${data.size}px`,
        height: `${data.size}px`,
        borderRadius: '50% 0 50% 50%',
        background: 'linear-gradient(135deg, rgba(232,160,191,0.8), rgba(212,165,116,0.5))',
        filter: 'blur(0.3px)',
        zIndex: 10,
        pointerEvents: 'none',
      }}
      animate={{
        y: ['0vh', '105vh'],
        x: [0, data.drift1, data.drift2],
        rotate: [0, data.rotateEnd],
        opacity: [0, 0.6, 0.6, 0],
      }}
      transition={{ duration: data.duration, delay: data.delay, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function GlowParticle({ data }: { data: GlowData }) {
  return (
    <motion.div
      style={{
        position: 'absolute',
        width: `${data.size}px`,
        height: `${data.size}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,160,191,0.6), rgba(212,165,116,0.2))',
        left: `${data.left}%`,
        bottom: `${data.bottom}%`,
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -data.yEnd],
        opacity: [0, 0.7, 0],
        scale: [0.5, 1.2, 0.5],
      }}
      transition={{ duration: data.dur, delay: data.id * 0.6, repeat: Infinity, ease: 'easeOut' }}
    />
  );
}

export default function HeroSection() {
  const [started, setStarted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [petals, setPetals] = useState<PetalData[]>([]);
  const [glows, setGlows] = useState<GlowData[]>([]);

  useEffect(() => {
    setPetals(
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        delay: Math.random() * 12,
        left: Math.random() * 100,
        duration: 7 + Math.random() * 7,
        size: 6 + Math.random() * 7,
        drift1: Math.random() * 100 - 50,
        drift2: Math.random() * 60 - 30,
        rotateEnd: 360 + Math.random() * 360,
      }))
    );
    setGlows(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        size: 2 + Math.random() * 3,
        left: Math.random() * 100,
        bottom: 10 + Math.random() * 25,
        yEnd: 60 + Math.random() * 150,
        dur: 3.5 + Math.random() * 4,
      }))
    );
    const timer = setTimeout(() => setStarted(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  }, []);

  return (
    <div
      onMouseMove={onMouseMove}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'none',
      }}
    >
      {/* Rose garden background */}
      <RoseGardenHero />

      {/* Subtle warm overlay — blends garden with content */}
      <motion.div
        style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ duration: 5, ease: 'easeInOut' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(13,10,20,0.15) 0%, rgba(232,160,191,0.04) 40%, rgba(13,10,20,0.3) 100%)',
        }} />
      </motion.div>

      {/* Petals */}
      {petals.map((p) => <Petal key={p.id} data={p} />)}

      {/* Glow particles */}
      {glows.map((g) => <GlowParticle key={g.id} data={g} />)}

      {/* Vignette — stronger edges for cinematic feel */}
      <div
        style={{
          position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(13,10,20,0.6) 100%)',
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 20, textAlign: 'center', padding: '0 24px' }}>
        <AnimatePresence>
          {started && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(12px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, delay: 2 }}
              >
                <h1
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3.5rem, 9vw, 8rem)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    marginBottom: '1.2rem',
                    background: 'linear-gradient(135deg, #fff8f0 0%, #f0c4d8 40%, #d4a574 70%, #e8a0bf 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 40px rgba(232,160,191,0.4))',
                  }}
                >
                  My Forever
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 3 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.4rem)',
                  fontWeight: 300,
                  letterSpacing: '3px',
                  marginBottom: '3rem',
                  color: 'rgba(255,248,240,0.85)',
                  textShadow: '0 0 30px rgba(232,160,191,0.3)',
                }}
              >
                Every beautiful moment starts with you.
              </motion.p>

              <motion.button
                onClick={() => {
                  document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 3.8, type: 'spring', stiffness: 80 }}
                style={{ cursor: 'pointer' }}
              >
                Begin Our Journey
              </motion.button>

              {/* Scroll hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ duration: 1, delay: 5 }}
                style={{
                  position: 'absolute',
                  bottom: '-140px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <motion.div
                  style={{
                    width: '1px',
                    height: '50px',
                    background: 'linear-gradient(180deg, rgba(232,160,191,0.6), transparent)',
                  }}
                  animate={{ scaleY: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
