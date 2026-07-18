'use client';

import { useState, useEffect, useCallback, useRef, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_NOTES, GARDEN_MESSAGES } from './rose-garden-state';
import BloomingRoseSVG from './BloomingRoseSVG';

const RoseGardenExperience = dynamic(() => import('./RoseGardenExperience'), { ssr: false });

type Phase = 'intro' | 'bloom' | 'note' | 'scatter' | 'transform' | 'garden';

export default function FlowerGardenSection() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [typedText, setTypedText] = useState('');
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [gardenMsg, setGardenMsg] = useState<string | null>(null);
  const [noteIdx, setNoteIdx] = useState(0);
  const [sceneReady, setSceneReady] = useState(false);

  const phaseRef = useRef<Phase>('intro');
  const gardenMsgTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setPhaseSafe = useCallback((p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  }, []);

  const handleBloomDone = useCallback(() => {
    setPhaseSafe('note');
  }, [setPhaseSafe]);
  const handleScatterDone = useCallback(() => { setPhaseSafe('transform'); }, [setPhaseSafe]);
  const handleGardenReady = useCallback(() => { setPhaseSafe('garden'); }, [setPhaseSafe]);
  const handleGardenRoseClick = useCallback((msg: string) => {
    setGardenMsg(msg);
    if (gardenMsgTimeout.current) clearTimeout(gardenMsgTimeout.current);
    gardenMsgTimeout.current = setTimeout(() => setGardenMsg(null), 3000);
  }, []);

  // Auto-bloom when section scrolls into view
  const sectionRef = useRef<HTMLElement>(null);
  const bloomTriggered = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || bloomTriggered.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !bloomTriggered.current) {
          bloomTriggered.current = true;
          setTimeout(() => setPhaseSafe('bloom'), 800);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [setPhaseSafe]);

  // Note phase typewriter
  useEffect(() => {
    if (phase !== 'note') { setTypedText(''); setShowNextBtn(false); return; }
    const note = LOVE_NOTES[noteIdx % LOVE_NOTES.length];
    let idx = 0;
    setTypedText('');
    setShowNextBtn(false);
    const interval = setInterval(() => {
      idx++;
      setTypedText(note.slice(0, idx));
      if (idx >= note.length) {
        clearInterval(interval);
        setTimeout(() => setShowNextBtn(true), 600);
      }
    }, 55);
    return () => clearInterval(interval);
  }, [phase, noteIdx]);

  useEffect(() => {
    return () => { if (gardenMsgTimeout.current) clearTimeout(gardenMsgTimeout.current); };
  }, []);

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
      {/* SVG rose — visible from intro through note, exits on scatter */}
      <AnimatePresence>
        {(phase === 'intro' || phase === 'bloom' || phase === 'note') && (
          <motion.div
            key="rose-svg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: phase === 'note' ? 0.75 : 1,
              y: phase === 'note' ? '-10%' : 0,
            }}
            exit={{ opacity: 0, scale: 1.8, transition: { duration: 1.8, ease: 'easeInOut' } }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <BloomingRoseSVG
              blooming={phase === 'bloom'}
              onBloomComplete={handleBloomDone}
              bloomed={phase === 'note'}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D garden — only after note phase */}
      {(phase === 'scatter' || phase === 'transform' || phase === 'garden') && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <Suspense fallback={
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', letterSpacing: '4px', color: 'rgba(232,160,191,0.5)' }}>
                Loading garden...
              </p>
            </div>
          }>
            <RoseGardenExperience
              phase={phase}
              onBloomDone={handleBloomDone}
              onScatterDone={handleScatterDone}
              onGardenReady={handleGardenReady}
              onGardenRoseClick={handleGardenRoseClick}
              onReady={() => setSceneReady(true)}
            />
          </Suspense>
        </div>
      )}

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
              <AnimatePresence>
                {showNextBtn && (
                  <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    onClick={(e) => { e.stopPropagation(); setPhaseSafe('scatter'); setNoteIdx(n => n + 1); }}
                    style={{ marginTop: '28px', background: 'linear-gradient(135deg, #e8a0bf, #d4a574)', color: '#0d0a14', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.85rem', letterSpacing: '2px', textTransform: 'uppercase', padding: '12px 36px', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,160,191,0.3)' }}
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                    Next
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Garden label */}
      <AnimatePresence>
        {phase === 'garden' && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 20, pointerEvents: 'none' }}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(212,165,116,0.5)', textShadow: '0 0 15px rgba(0,0,0,0.8)' }}>
              Tap any rose for a message
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Garden message */}
      <AnimatePresence>
        {gardenMsg && (
          <motion.div key={gardenMsg} initial={{ opacity: 0, y: 20, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            style={{ position: 'absolute', top: '12%', left: '50%', transform: 'translateX(-50%)', zIndex: 30, background: 'rgba(13,10,20,0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(232,160,191,0.2)', borderRadius: '20px', padding: '16px 28px', boxShadow: '0 12px 40px rgba(0,0,0,0.4)', pointerEvents: 'none', maxWidth: '90%' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(0.85rem, 2.2vw, 1.05rem)', color: '#fff8f0', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
              {gardenMsg}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
