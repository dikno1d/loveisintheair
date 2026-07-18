'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SITE_CONFIG } from '@/data/siteData';

function getTimeDiff() {
  const start = new Date(SITE_CONFIG.startDate);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ textAlign: 'center', minWidth: '70px' }}>
      <motion.div
        key={value}
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 700,
          background: 'linear-gradient(135deg, #fff8f0, #f0c4d8, #d4a574)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          filter: 'drop-shadow(0 0 15px rgba(232,160,191,0.25))',
          lineHeight: 1,
        }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,248,240,0.4)', marginTop: '8px' }}>
        {label}
      </p>
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<{ w: number; h: number; x: number; y: number; dur: number; del: number }[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 25 }, () => ({
        w: 1.5 + Math.random() * 2,
        h: 1.5 + Math.random() * 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        dur: 3 + Math.random() * 3,
        del: Math.random() * 3,
      }))
    );
    setMounted(true);
    setTime(getTimeDiff());
    const id = setInterval(() => setTime(getTimeDiff()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{
      padding: '140px 20px',
      background: 'linear-gradient(180deg, #0d0a14, #18102a, #0d0a14)',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Ambient particles */}
      {particles.map((p, i) => (
        <motion.div key={i} style={{
          position: 'absolute', width: `${p.w}px`, height: `${p.h}px`,
          borderRadius: '50%', background: 'rgba(232,160,191,0.5)',
          left: `${p.x}%`, top: `${p.y}%`,
        }} animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.6, 1] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.del }} />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '36px',
          padding: 'clamp(40px, 6vw, 70px)',
          textAlign: 'center', maxWidth: '750px', width: '100%',
          boxShadow: '0 30px 80px rgba(0,0,0,0.3), 0 0 80px rgba(232,160,191,0.08)',
          position: 'relative', zIndex: 2,
        }}
      >
        {/* Inner glow */}
        <div style={{
          position: 'absolute', inset: '-1px', borderRadius: '36px',
          background: 'linear-gradient(135deg, rgba(232,160,191,0.08), transparent 40%, rgba(212,165,116,0.06))',
          pointerEvents: 'none',
        }} />

        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#d4a574', marginBottom: '12px' }}>
          Days Together
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '40px' }}>
          And Counting...
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(12px, 3vw, 40px)', flexWrap: 'wrap' }}>
          {mounted && (
            <>
              <TimeUnit value={time.days} label="Days" />
              <div style={{ color: 'rgba(232,160,191,0.3)', fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1, alignSelf: 'start' }}>:</div>
              <TimeUnit value={time.hours} label="Hours" />
              <div style={{ color: 'rgba(232,160,191,0.3)', fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1, alignSelf: 'start' }}>:</div>
              <TimeUnit value={time.minutes} label="Min" />
              <div style={{ color: 'rgba(232,160,191,0.3)', fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1, alignSelf: 'start' }}>:</div>
              <TimeUnit value={time.seconds} label="Sec" />
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
