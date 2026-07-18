'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { reasons } from '@/data/siteData';

function FlipCard({ reason, index }: { reason: typeof reasons[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  const gradients = [
    'linear-gradient(135deg, rgba(232,160,191,0.1), rgba(155,114,207,0.08))',
    'linear-gradient(135deg, rgba(212,165,116,0.1), rgba(232,160,191,0.08))',
    'linear-gradient(135deg, rgba(155,114,207,0.1), rgba(255,51,102,0.08))',
    'linear-gradient(135deg, rgba(255,107,53,0.08), rgba(212,165,116,0.1))',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.04 }}
      viewport={{ once: true, margin: '-30px' }}
      onClick={() => setFlipped(!flipped)}
      className="clickable"
      style={{ perspective: '1000px', cursor: 'pointer', height: '210px' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 20 }}
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: gradients[index % 4],
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '22px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          overflow: 'hidden',
        }}>
          {/* Decorative corner */}
          <div style={{
            position: 'absolute', top: '-20px', right: '-20px',
            width: '60px', height: '60px', borderRadius: '50%',
            background: `radial-gradient(circle, ${['rgba(232,160,191,0.08)', 'rgba(212,165,116,0.08)', 'rgba(155,114,207,0.08)', 'rgba(255,107,53,0.08)'][index % 4]}, transparent)`,
          }} />

          <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{reason.emoji}</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,248,240,0.35)' }}>
            #{reason.id}
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'rgba(232,160,191,0.4)', marginTop: '8px' }}>
            Click to reveal
          </p>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, rgba(232,160,191,0.15), rgba(212,165,116,0.12))',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(232,160,191,0.2)',
          borderRadius: '22px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px',
          boxShadow: '0 0 35px rgba(232,160,191,0.12), inset 0 0 30px rgba(232,160,191,0.05)',
        }}>
          <div style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{reason.emoji}</div>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff8f0', textAlign: 'center', lineHeight: 1.55 }}>
            {reason.text}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ReasonsSection() {
  return (
    <section style={{
      padding: '140px 20px',
      background: 'linear-gradient(180deg, #0d0a14, #13101e, #0d0a14)',
      position: 'relative',
    }}>
      <motion.div
        style={{ textAlign: 'center', marginBottom: '80px' }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#d4a574', marginBottom: '16px' }}>
          From the Heart
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          50 Reasons I Love You
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'rgba(255,248,240,0.4)', marginTop: '12px' }}>
          Click each card to reveal
        </p>
      </motion.div>

      <div className="reasons-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '16px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        {reasons.map((reason, i) => (
          <FlipCard key={reason.id} reason={reason} index={i} />
        ))}
      </div>
    </section>
  );
}
