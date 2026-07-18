'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/siteData';

interface StarData { x: number; y: number; size: number; dur: number; del: number }
interface LanternData { left: number; yEnd: number; dur: number; del: number }

function CSSHeart({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

function Star({ data }: { data: StarData }) {
  return (
    <motion.div
      style={{
        position: 'absolute', left: `${data.x}%`, top: `${data.y}%`,
        width: `${data.size}px`, height: `${data.size}px`, borderRadius: '50%', background: 'white',
      }}
      animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.4, 1] }}
      transition={{ duration: data.dur, repeat: Infinity, delay: data.del }}
    />
  );
}

function Lantern({ data, i }: { data: LanternData; i: number }) {
  return (
    <motion.div
      style={{ position: 'absolute', bottom: '15%', left: `${data.left}%` }}
      animate={{
        y: [0, -data.yEnd],
        x: [0, Math.sin(i) * 35, Math.cos(i) * -25, 0],
        opacity: [0.85, 0.6, 0.25, 0],
        scale: [1, 0.85, 0.5],
      }}
      transition={{ duration: data.dur, repeat: Infinity, delay: data.del, ease: 'easeOut' }}
    >
      {/* CSS Lantern */}
      <svg width="24" height="32" viewBox="0 0 24 32">
        <rect x="10" y="0" width="4" height="4" rx="1" fill="rgba(212,165,116,0.8)" />
        <rect x="8" y="4" width="8" height="2" rx="1" fill="rgba(212,165,116,0.6)" />
        <rect x="6" y="6" width="12" height="18" rx="6" fill="rgba(232,160,191,0.15)" stroke="rgba(232,160,191,0.3)" strokeWidth="0.5" />
        <ellipse cx="12" cy="15" rx="3" ry="5" fill="rgba(240,200,112,0.3)" />
        <rect x="8" y="24" width="8" height="2" rx="1" fill="rgba(212,165,116,0.6)" />
        <rect x="10" y="26" width="4" height="4" rx="1" fill="rgba(212,165,116,0.8)" />
      </svg>
    </motion.div>
  );
}

export default function FooterSection() {
  const [stars, setStars] = useState<StarData[]>([]);
  const [lanterns, setLanterns] = useState<LanternData[]>([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 80 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 80,
        size: 1 + Math.random() * 2.5,
        dur: 2 + Math.random() * 3,
        del: Math.random() * 3,
      }))
    );
    setLanterns(
      Array.from({ length: 10 }, (_, i) => ({
        left: 12 + Math.random() * 76,
        yEnd: 350 + Math.random() * 300,
        dur: 9 + Math.random() * 6,
        del: i * 2.5 + Math.random() * 3,
      }))
    );
  }, []);

  return (
    <footer style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(180deg, #0d0a14, #050210)',
      overflow: 'hidden', padding: '60px 20px',
    }}>
      {/* Stars */}
      {stars.map((s, i) => <Star key={i} data={s} />)}

      {/* Moon */}
      <motion.div
        style={{
          position: 'absolute', top: '10%', right: '14%',
          width: '90px', height: '90px', borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #f5f0e0, #d4c890)',
          boxShadow: '0 0 50px rgba(245,240,224,0.25), 0 0 100px rgba(245,240,224,0.08)',
        }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Moon glow */}
      <div style={{
        position: 'absolute', top: '8%', right: '12%',
        width: '130px', height: '130px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,240,224,0.08), transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Moon reflection */}
      <div style={{
        position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)',
        width: '35px', height: '80px',
        background: 'linear-gradient(180deg, rgba(245,240,224,0.12), transparent)',
        filter: 'blur(10px)', borderRadius: '50%',
      }} />

      {/* Lanterns */}
      {lanterns.map((l, i) => <Lantern key={i} data={l} i={i} />)}

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '680px' }}
      >
        <motion.div
          style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center' }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <CSSHeart size={40} color="#e8a0bf" />
        </motion.div>

        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(1.2rem, 3vw, 1.9rem)', fontWeight: 600,
          lineHeight: 1.65,
          background: 'linear-gradient(135deg, #fff8f0, #f0c4d8, #d4a574)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          marginBottom: '35px',
        }}>
          &ldquo;{SITE_CONFIG.quote}&rdquo;
        </p>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(255,248,240,0.35)', letterSpacing: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Made with love, for you
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#e8a0bf">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </p>

        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '28px' }}>
          {/* Gift icon */}
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.3, y: -4 }} whileTap={{ scale: 0.9 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4a574" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
            </svg>
          </motion.div>
          {/* Flower icon */}
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.3, y: -4 }} whileTap={{ scale: 0.9 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8a0bf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2a4 4 0 0 0-4 4c0 2 2 4 4 6 2-2 4-4 4-6a4 4 0 0 0-4-4z"/><path d="M22 12a4 4 0 0 0-4-4c-2 0-4 2-6 4 2 2 4 4 6 4a4 4 0 0 0 4-4z"/><path d="M12 22a4 4 0 0 0 4-4c0-2-2-4-4-6-2 2-4 4-4 6a4 4 0 0 0 4 4z"/><path d="M2 12a4 4 0 0 0 4 4c2 0 4-2 6-4-2-2-4-4-6-4a4 4 0 0 0-4 4z"/>
            </svg>
          </motion.div>
          {/* Sparkle icon */}
          <motion.div style={{ cursor: 'pointer' }} whileHover={{ scale: 1.3, y: -4 }} whileTap={{ scale: 0.9 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9b72cf" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l2.09 6.26L20.18 10l-6.09 1.74L12 18l-2.09-6.26L3.82 10l6.09-1.74L12 2z"/>
              <path d="M18 14l1.04 3.13L22 18l-2.96.87L18 22l-1.04-3.13L14 18l2.96-.87L18 14z" opacity="0.6"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}
