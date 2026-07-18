'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '@/data/siteData';

export default function GallerySection() {
  const [selected, setSelected] = useState<typeof galleryImages[0] | null>(null);
  const heights = [300, 380, 260, 340, 280, 360, 310];

  return (
    <section style={{
      padding: '140px 20px',
      background: 'linear-gradient(180deg, #0d0a14, #150e22, #0d0a14)',
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
          Our Moments
        </p>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 700, background: 'linear-gradient(135deg, #fff8f0, #e8a0bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Photo Gallery
        </h2>
      </motion.div>

      <div className="gallery-grid" style={{ columns: 'auto 3', columnGap: '16px', maxWidth: '1000px', margin: '0 auto' }}>
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            viewport={{ once: true }}
            onClick={() => setSelected(image)}
            className="clickable"
            style={{
              breakInside: 'avoid', marginBottom: '16px', borderRadius: '18px',
              overflow: 'hidden', cursor: 'pointer', position: 'relative',
              height: `${heights[index % heights.length]}px`,
              background: `linear-gradient(${130 + index * 18}deg, rgba(232,160,191,${0.12 + index * 0.015}), rgba(155,114,207,${0.1 + index * 0.015}), rgba(212,165,116,${0.08 + index * 0.01}))`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.5s cubic-bezier(0.23,1,0.32,1)',
              border: '1px solid rgba(255,255,255,0.04)',
            }}
            whileHover={{ scale: 1.02, boxShadow: '0 15px 50px rgba(232,160,191,0.15)' }}
          >
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.23,1,0.32,1)',
              }}
              onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.08)'; }}
              onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)'; }}
            />

            {/* Gradient overlay on hover */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '30px 16px 16px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
              opacity: 0, transition: 'opacity 0.4s', zIndex: 2,
            }} className="gallery-hover-overlay">
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#fff8f0' }}>{image.caption}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(13,10,20,0.92)',
              backdropFilter: 'blur(24px)',
              zIndex: 2000, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', padding: '40px',
              cursor: 'pointer',
            }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: [0, 1.4, 1] }} transition={{ duration: 0.6, delay: 0.15 }} style={{ marginBottom: '20px' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#e8a0bf">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </motion.div>

            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.4, type: 'spring' }}
              style={{
                width: '100%', maxWidth: '650px', height: '380px',
                borderRadius: '24px', overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
                border: '1px solid rgba(255,255,255,0.06)',
                position: 'relative',
              }}
            >
              <img
                src={selected.src}
                alt={selected.alt}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#fff8f0', marginTop: '24px', textAlign: 'center' }}>
              {selected.caption}
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 0.7 }} style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'rgba(255,248,240,0.4)', marginTop: '10px' }}>
              Click anywhere to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-hover-overlay { opacity: 0 !important; }
        div:hover > .gallery-hover-overlay { opacity: 1 !important; }
      `}</style>
    </section>
  );
}
