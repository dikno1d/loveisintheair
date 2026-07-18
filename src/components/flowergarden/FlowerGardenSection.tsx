'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_NOTES } from './rose-garden-state';
import BloomingRoseSVG from './BloomingRoseSVG';

type Phase = 'intro' | 'bloom' | 'note';

export default function FlowerGardenSection() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [typedText, setTypedText] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const bloomTriggered = useRef(false);
  const noteRef = useRef(0);

  // Auto-bloom when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || bloomTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !bloomTriggered.current) {
          bloomTriggered.current = true;
          setTimeout(() => {
            if (phase === 'intro') setPhase('bloom');
          }, 800);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [phase]);

  const handleBloomDone = () => {
    setPhase('note');
  };

  // Typewriter effect
  useEffect(() => {
    if (phase !== 'note') { setTypedText(''); return; }
    const note = LOVE_NOTES[noteRef.current % LOVE_NOTES.length];
    let idx = 0;
    setTypedText('');
    const interval = setInterval(() => {
      idx++;
      setTypedText(note.slice(0, idx));
      if (idx >= note.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '500px',
        overflow: 'hidden',
        background: '#0d0a14',
      }}
    >
      {/* Rose — always visible */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: phase === 'note' ? 0.7 : phase === 'intro' ? 0.9 : 1,
          y: phase === 'note' ? '-12%' : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
        style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}
      >
        <BloomingRoseSVG
          blooming={phase === 'bloom'}
          onBloomComplete={handleBloomDone}
          bloomed={phase === 'note'}
        />
      </motion.div>

      {/* Love Note overlay */}
      <AnimatePresence>
        {phase === 'note' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20, pointerEvents: 'none' }}>
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ background: 'rgba(13,10,20,0.7)', backdropFilter: 'blur(24px)', border: '1px solid rgba(232,160,191,0.15)', borderRadius: '28px', padding: 'clamp(28px, 5vw, 48px) clamp(24px, 4vw, 44px)', maxWidth: '520px', width: '88%', textAlign: 'center', boxShadow: '0 20px 80px rgba(0,0,0,0.5)', pointerEvents: 'auto' }}>
              <div style={{ width: '36px', height: '36px', margin: '0 auto 20px', background: 'linear-gradient(135deg, rgba(232,160,191,0.2), rgba(212,165,116,0.15))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8a0bf" strokeWidth="1.5">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1rem, 2.8vw, 1.25rem)', lineHeight: 1.7, color: '#fff8f0', minHeight: '60px' }}>
                &ldquo;{typedText}<motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ color: '#e8a0bf' }}>|</motion.span>&rdquo;
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
