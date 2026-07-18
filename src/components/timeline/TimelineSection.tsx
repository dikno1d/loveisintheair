'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { timelineEvents } from '@/data/siteData';

export default function TimelineSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const event = timelineEvents[current];

  const next = () => {
    if (current < timelineEvents.length - 1) {
      setDirection(1);
      setCurrent(c => c + 1);
    }
  };

  const prev = () => {
    if (current > 0) {
      setDirection(-1);
      setCurrent(c => c - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, rotateY: dir > 0 ? 15 : -15 }),
    center: { x: 0, opacity: 1, rotateY: 0 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, rotateY: dir > 0 ? -15 : 15 }),
  };

  return (
    <section style={{
      padding: 'clamp(60px, 10vw, 120px) clamp(12px, 3vw, 20px)',
      background: 'linear-gradient(180deg, #0d0a14, #150e22, #0d0a14)',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        style={{ textAlign: 'center', marginBottom: 'clamp(30px, 5vw, 50px)' }}
      >
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '6px', textTransform: 'uppercase', color: '#d4a574', marginBottom: '12px' }}>
          Our Story
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf, #d4a574)', backgroundSize: '200% 200%', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', animation: 'gradient-shift 4s ease infinite' }}>
          A Love Timeline
        </h2>
      </motion.div>

      {/* Card counter */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(232,160,191,0.5)', marginBottom: '20px', letterSpacing: '3px' }}>
        {current + 1} / {timelineEvents.length}
      </p>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '30px' }}>
        {timelineEvents.map((_, i) => (
          <div key={i} onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            style={{
              width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px',
              background: i === current ? 'linear-gradient(135deg, #e8a0bf, #d4a574)' : 'rgba(255,255,255,0.15)',
              cursor: 'pointer', transition: 'all 0.3s ease',
            }} />
        ))}
      </div>

      {/* Card container */}
      <div style={{ perspective: '1200px', width: '100%', maxWidth: '560px', minHeight: '440px', position: 'relative' }}>
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={event.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '28px',
              overflow: 'hidden',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {/* Image */}
            <div style={{ width: '100%', height: '220px', position: 'relative', overflow: 'hidden' }}>
              <img src={event.image} alt={event.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.5))' }} />
              <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 30% 30%, rgba(232,160,191,0.1), transparent 60%)` }} />

              {/* Date badge */}
              <div style={{
                position: 'absolute', top: '16px', left: '16px',
                background: 'rgba(13,10,20,0.7)', backdropFilter: 'blur(12px)',
                border: '1px solid rgba(232,160,191,0.15)', borderRadius: '30px',
                padding: '6px 14px',
              }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#d4a574', margin: 0 }}>
                  {event.date}
                </p>
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '28px 28px 32px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.3rem, 3vw, 1.6rem)', fontWeight: 700, color: '#fff8f0', marginBottom: '12px', lineHeight: 1.3 }}>
                {event.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(0.82rem, 2vw, 0.92rem)', lineHeight: 1.75, color: 'rgba(255,248,240,0.6)', marginBottom: '16px' }}>
                {event.description}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'rgba(232,160,191,0.6)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {event.location}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '32px' }}>
        <motion.button onClick={prev} disabled={current === 0}
          whileHover={{ scale: current > 0 ? 1.1 : 1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            color: current > 0 ? '#e8a0bf' : 'rgba(255,255,255,0.2)',
            cursor: current > 0 ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </motion.button>

        <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.85rem', color: 'rgba(232,160,191,0.5)' }}>
          {current < timelineEvents.length - 1 ? 'Tap to next story' : 'The beginning of forever'}
        </p>

        <motion.button onClick={next} disabled={current === timelineEvents.length - 1}
          whileHover={{ scale: current < timelineEvents.length - 1 ? 1.1 : 1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            background: current < timelineEvents.length - 1 ? 'linear-gradient(135deg, #e8a0bf, #d4a574)' : 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: current < timelineEvents.length - 1 ? '#0d0a14' : 'rgba(255,255,255,0.2)',
            cursor: current < timelineEvents.length - 1 ? 'pointer' : 'default',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: current < timelineEvents.length - 1 ? '0 4px 20px rgba(232,160,191,0.3)' : 'none',
            transition: 'all 0.3s ease',
          }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </motion.button>
      </div>
    </section>
  );
}
