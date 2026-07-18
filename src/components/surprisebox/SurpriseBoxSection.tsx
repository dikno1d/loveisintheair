'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Confetti({ index }: { index: number }) {
  const colors = ['#e8a0bf', '#d4a574', '#9b72cf', '#ff3366', '#ff6b35', '#f0c4d8', '#f0d4a4', '#fff8f0'];
  const color = colors[index % colors.length];
  const angle = (index / 40) * 360;
  const dist = 80 + Math.random() * 220;
  const x = Math.cos((angle * Math.PI) / 180) * dist;
  const y = Math.sin((angle * Math.PI) / 180) * dist - 120;
  const shape = Math.random() > 0.6 ? '50%' : Math.random() > 0.5 ? '2px' : '0';

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y: y + 220, opacity: [1, 1, 0], scale: [1, 1.2, 0.2], rotate: Math.random() * 720 }}
      transition={{ duration: 1.2 + Math.random() * 1.5, ease: 'easeOut' }}
      style={{
        position: 'absolute', width: `${5 + Math.random() * 8}px`, height: `${5 + Math.random() * 8}px`,
        background: color, borderRadius: shape, pointerEvents: 'none', zIndex: 30,
      }}
    />
  );
}

export default function SurpriseBoxSection() {
  const [opened, setOpened] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setShowContent(true), 900);
  };

  return (
    <section style={{
      padding: '140px 20px', minHeight: '80vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #0d0a14, #150e22, #0d0a14)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Background glow */}
      <motion.div
        animate={{
          background: opened
            ? 'radial-gradient(circle, rgba(232,160,191,0.12), transparent 70%)'
            : 'radial-gradient(circle, rgba(155,114,207,0.06), transparent 70%)',
        }}
        transition={{ duration: 1 }}
        style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
      />

      <motion.div
        style={{ textAlign: 'center', marginBottom: '60px', position: 'relative', zIndex: 2 }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#d4a574', marginBottom: '16px' }}>
          A Special Gift
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Surprise Box
        </h2>
      </motion.div>

      <div
        style={{ position: 'relative', width: '260px', height: '260px', cursor: opened ? 'default' : 'pointer' }}
        onClick={handleOpen}
      >
        {opened && Array.from({ length: 40 }, (_, i) => <Confetti key={i} index={i} />)}

        {/* Box body */}
        <motion.div
          animate={opened ? { y: 25, opacity: 0.7 } : { y: [0, -10, 0] }}
          transition={opened ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', bottom: 0, left: '8%', width: '84%', height: '55%',
            background: 'linear-gradient(145deg, #9b72cf, #7a52b0)',
            borderRadius: '0 0 18px 18px',
            boxShadow: '0 12px 40px rgba(155,114,207,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 5,
          }}
        >
          {/* Ribbon cross */}
          <div style={{ position: 'absolute', width: '100%', height: '3px', background: 'linear-gradient(90deg, #d4a574, #f0d4a4, #d4a574)', top: '45%' }} />
          <div style={{ position: 'absolute', width: '3px', height: '100%', background: 'linear-gradient(180deg, #d4a574, #f0d4a4, #d4a574)', left: '50%' }} />
        </motion.div>

        {/* Lid */}
        <motion.div
          animate={opened ? { y: -70, rotateX: -45, opacity: 0 } : { y: [0, -3, 0] }}
          transition={opened ? { duration: 0.9, ease: 'easeOut' } : { duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          style={{
            position: 'absolute', bottom: '50%', left: '3%', width: '94%', height: '25%',
            background: 'linear-gradient(145deg, #b080d0, #9060b0)',
            borderRadius: '14px 14px 0 0',
            boxShadow: '0 -4px 20px rgba(155,114,207,0.15)',
            zIndex: 6,
          }}
        />

        {/* Bow */}
        {!opened && (
          <div style={{ position: 'absolute', bottom: '50%', left: '50%', transform: 'translateX(-50%)', zIndex: 10 }}>
            <div style={{ position: 'relative', width: '40px', height: '30px' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, width: '18px', height: '22px', borderRadius: '50% 50% 0 0', background: '#d4a574', transform: 'rotate(-12deg)' }} />
              <div style={{ position: 'absolute', right: 0, top: 0, width: '18px', height: '22px', borderRadius: '50% 50% 0 0', background: '#e8c9a0', transform: 'rotate(12deg)' }} />
              <div style={{ position: 'absolute', left: '50%', top: '18px', transform: 'translateX(-50%)', width: '8px', height: '8px', borderRadius: '50%', background: '#c09060' }} />
            </div>
          </div>
        )}

        {/* Content */}
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -40 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              style={{
                position: 'absolute', bottom: '35%', left: '50%', transform: 'translateX(-50%)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                zIndex: 20,
              }}
            >
              {[
                <svg key="heart" width="40" height="40" viewBox="0 0 24 24" fill="#e8a0bf"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>,
                <svg key="ring" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="1.5"><circle cx="12" cy="14" r="7"/><circle cx="12" cy="14" r="5"/><path d="M12 7V3M9 4l3-1 3 1" strokeLinecap="round"/><circle cx="12" cy="3" r="1.5" fill="#d4a574"/></svg>,
                <svg key="blossom" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f0c4d8" strokeWidth="1"><circle cx="12" cy="12" r="3" fill="rgba(240,196,216,0.4)"/><ellipse cx="12" cy="5" rx="2.5" ry="4" fill="rgba(240,196,216,0.25)"/><ellipse cx="12" cy="19" rx="2.5" ry="4" fill="rgba(240,196,216,0.25)"/><ellipse cx="5" cy="12" rx="4" ry="2.5" fill="rgba(240,196,216,0.25)"/><ellipse cx="19" cy="12" rx="4" ry="2.5" fill="rgba(240,196,216,0.25)"/></svg>,
              ].map((icon, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}
                >
                  {icon}
                </motion.div>
              ))}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                style={{
                  fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600,
                  color: '#fff8f0', textAlign: 'center',
                  textShadow: '0 0 25px rgba(232,160,191,0.5)',
                  marginTop: '8px',
                }}
              >
                You are my everything
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!opened && (
        <motion.p
          style={{ marginTop: '35px', color: 'rgba(232,160,191,0.45)', fontFamily: 'var(--font-body)', fontSize: '0.85rem', letterSpacing: '1px' }}
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          Click the box...
        </motion.p>
      )}
    </section>
  );
}
