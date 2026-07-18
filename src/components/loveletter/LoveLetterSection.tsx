'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const letterText = `My Dearest Love,

From the moment you walked into my life, everything changed. The colors became brighter, the music became sweeter, and every day became an adventure worth living.

You are my sunrise and my sunset, my calm and my storm, my greatest adventure and my safest place. In your eyes, I found my home. In your smile, I found my peace. In your heart, I found my forever.

Every moment with you is a memory I treasure. Every laugh we share is a melody I replay in my mind. Every touch is a promise of forever.

I want you to know that through every storm, every challenge, and every moment of doubt, my love for you only grows stronger. You are not just a part of my life — you ARE my life.

I promise to love you on the good days and the bad days. When the sun shines and when it rains. Today, tomorrow, and every day after that.

I'll choose you forever.`;

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const t = setTimeout(() => setShowLetter(true), 1000);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (!showLetter) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < letterText.length) {
        setTypedText(letterText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        setIsTypingDone(true);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [showLetter]);

  return (
    <section
      style={{
        padding: '140px 20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, #0d0a14, #18102a, #0d0a14)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow orbs */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,160,191,0.06), transparent)', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,165,116,0.05), transparent)', top: '30%', right: '20%', pointerEvents: 'none' }} />

      {/* Title */}
      <motion.div
        style={{ textAlign: 'center', marginBottom: '70px', position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#d4a574', marginBottom: '16px' }}>
          For You
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          A Love Letter
        </h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            onClick={() => setIsOpen(true)}
            style={{ cursor: 'pointer', perspective: '1200px' }}
            whileHover={{ scale: 1.06, y: -12 }}
            animate={{ y: [0, -10, 0] }}
            transition={{ y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' } }}
          >
            <div style={{ width: '320px', height: '220px', position: 'relative', filter: 'drop-shadow(0 20px 60px rgba(232,160,191,0.2))' }}>
              {/* Envelope body */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(145deg, #f0c4d8, #e8a0bf)', borderRadius: '6px', overflow: 'hidden' }}>
                {/* Texture lines */}
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(0deg, transparent, transparent 8px, rgba(199,125,186,0.15) 8px, rgba(199,125,186,0.15) 9px)' }} />
              </div>

              {/* Envelope flap */}
              <motion.div
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '110px',
                  background: 'linear-gradient(145deg, #c77dba, #e8a0bf)',
                  clipPath: 'polygon(0 0, 50% 85%, 100% 0)',
                  transformOrigin: 'top center',
                  zIndex: 2,
                }}
              />

              {/* Wax seal */}
              <div
                style={{
                  position: 'absolute', top: '80px', left: '50%', transform: 'translateX(-50%)',
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #f0d4a4, #d4a574, #a07840)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem', zIndex: 3,
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#d4a574">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              {/* Bottom V */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '110px', background: 'linear-gradient(145deg, #d4a574, #e8c9a0)', clipPath: 'polygon(0 100%, 50% 15%, 100% 100%)', opacity: 0.5 }} />
            </div>
            <motion.p
              style={{ textAlign: 'center', marginTop: '28px', color: 'rgba(232,160,191,0.5)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '2px' }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              Click to open
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.85, rotateX: -15 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="love-letter-paper"
            style={{
              maxWidth: '640px', width: '100%',
              background: 'linear-gradient(145deg, rgba(255,248,240,0.96), rgba(240,196,216,0.88))',
              borderRadius: '20px', padding: '50px 44px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.35), 0 0 80px rgba(232,160,191,0.15)',
              position: 'relative', zIndex: 2,
            }}
          >
            {/* Paper lines */}
            <div style={{ position: 'absolute', inset: 0, borderRadius: '20px', background: 'repeating-linear-gradient(transparent, transparent 31px, rgba(200,180,170,0.15) 31px, rgba(200,180,170,0.15) 32px)', pointerEvents: 'none' }} />

            {/* Left margin line */}
            <div style={{ position: 'absolute', top: '30px', bottom: '30px', left: '50px', width: '1px', background: 'rgba(231,76,111,0.12)' }} />

            <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.92rem', lineHeight: '32px', color: '#3d2050', whiteSpace: 'pre-wrap', position: 'relative', zIndex: 2, paddingLeft: '10px' }}>
              {typedText}
              {!isTypingDone && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.7, repeat: Infinity }}
                  style={{ color: '#e8a0bf', fontWeight: 700 }}
                >
                  |
                </motion.span>
              )}
            </p>

            {/* Signature flourish */}
            {isTypingDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                style={{ textAlign: 'right', marginTop: '20px', paddingRight: '10px' }}
              >
                <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', color: '#c77dba', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                  Forever yours
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#c77dba">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </p>
              </motion.div>
            )}

            {/* Corner decoration */}
            <div style={{ position: 'absolute', top: '12px', right: '16px', opacity: 0.15 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8a0bf" strokeWidth="1">
                <circle cx="12" cy="12" r="3" fill="rgba(232,160,191,0.3)"/>
                <ellipse cx="12" cy="5" rx="2.5" ry="4" fill="rgba(232,160,191,0.2)"/>
                <ellipse cx="12" cy="19" rx="2.5" ry="4" fill="rgba(232,160,191,0.2)"/>
                <ellipse cx="5" cy="12" rx="4" ry="2.5" fill="rgba(232,160,191,0.2)"/>
                <ellipse cx="19" cy="12" rx="4" ry="2.5" fill="rgba(232,160,191,0.2)"/>
              </svg>
            </div>
            <div style={{ position: 'absolute', bottom: '12px', left: '16px', opacity: 0.15, transform: 'rotate(180deg)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e8a0bf" strokeWidth="1">
                <circle cx="12" cy="12" r="3" fill="rgba(232,160,191,0.3)"/>
                <ellipse cx="12" cy="5" rx="2.5" ry="4" fill="rgba(232,160,191,0.2)"/>
                <ellipse cx="12" cy="19" rx="2.5" ry="4" fill="rgba(232,160,191,0.2)"/>
                <ellipse cx="5" cy="12" rx="4" ry="2.5" fill="rgba(232,160,191,0.2)"/>
                <ellipse cx="19" cy="12" rx="4" ry="2.5" fill="rgba(232,160,191,0.2)"/>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
