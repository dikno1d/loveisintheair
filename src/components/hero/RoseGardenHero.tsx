'use client';

import { useEffect, useRef } from 'react';

const PRIMES = [3, 5, 7, 11, 13, 17];

const ROSE_TYPES: Record<number, { colors: string[]; size: number; petals: number; center: string; centerSize: number }> = {
  3: { colors: ['#cc1133', '#dd2244', '#ee3355'], size: 22, petals: 7, center: '#ffcc66', centerSize: 6 },
  5: { colors: ['#e8a0bf', '#f0c4d8', '#ffcce0'], size: 20, petals: 6, center: '#d4a574', centerSize: 5 },
  7: { colors: ['#ff6b8a', '#ff8fa3', '#ffb3c1'], size: 26, petals: 8, center: '#ffdd57', centerSize: 7 },
  11: { colors: ['#d4a574', '#e8c49a', '#f5deb3'], size: 24, petals: 7, center: '#cc1133', centerSize: 6 },
  13: { colors: ['#c77dba', '#d494c9', '#e0b0d6'], size: 18, petals: 6, center: '#ffcc66', centerSize: 5 },
  17: { colors: ['#ff69b4', '#ff8ec8', '#ffb3da'], size: 28, petals: 8, center: '#d4a574', centerSize: 7 },
};

function adjustColor(hex: string, amount: number): string {
  const r = Math.min(255, Math.max(0, parseInt(hex.slice(1, 3), 16) + amount * 3));
  const g = Math.min(255, Math.max(0, parseInt(hex.slice(3, 5), 16) + amount * 3));
  const b = Math.min(255, Math.max(0, parseInt(hex.slice(5, 7), 16) + amount * 3));
  return `rgb(${r},${g},${b})`;
}

export default function RoseGardenHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const root = container;

    const timers: number[] = [];

    function createStars() {
      const el = root.querySelector('.rg-stars');
      if (!el) return;
      for (let i = 0; i < 180; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2.5 + 0.4;
        const brightness = 0.3 + Math.random() * 0.7;
        Object.assign(star.style, {
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          background: i % 7 === 0 ? '#f0c4d8' : i % 5 === 0 ? '#fff9c4' : '#fff',
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 55}%`,
          opacity: '0',
          animation: `rg-twinkle ${2.5 + Math.random() * 5}s ease-in-out ${Math.random() * 4}s infinite`,
          boxShadow: size > 2 ? `0 0 ${size * 3}px rgba(255,255,255,${brightness * 0.3})` : 'none',
        });
        el.appendChild(star);
      }
    }

    function createGrass() {
      const el = root.querySelector('.rg-ground');
      if (!el) return;
      for (let i = 0; i < 120; i++) {
        const blade = document.createElement('div');
        const h = 6 + Math.random() * 20;
        const green = Math.random() > 0.5 ? '#2d5a1e' : '#1a3a12';
        const tip = Math.random() > 0.5 ? '#4a8a35' : '#3a7028';
        Object.assign(blade.style, {
          position: 'absolute',
          bottom: '0',
          left: `${Math.random() * 100}%`,
          width: `${1 + Math.random() * 1.5}px`,
          height: `${h}px`,
          background: `linear-gradient(to top, ${green}, ${tip})`,
          borderRadius: '0 0 1px 1px',
          transformOrigin: 'bottom center',
          opacity: `${0.25 + Math.random() * 0.45}`,
          animation: `rg-grass-sway ${2 + Math.random() * 2.5}s ease-in-out ${Math.random() * 2}s infinite`,
        });
        el.appendChild(blade);
      }
    }

    function createFireflies() {
      const el = root.querySelector('.rg-fireflies');
      if (!el) return;
      const colors = [
        { bg: '#fff9c4', shadow: '0 0 8px #fff9c4, 0 0 16px rgba(255,249,196,0.4)' },
        { bg: '#f0c4d8', shadow: '0 0 8px #f0c4d8, 0 0 16px rgba(240,196,216,0.4)' },
        { bg: '#e8c49a', shadow: '0 0 8px #e8c49a, 0 0 14px rgba(232,196,154,0.35)' },
      ];
      for (let i = 0; i < 25; i++) {
        const ff = document.createElement('div');
        const x = 5 + Math.random() * 90;
        const y = 12 + Math.random() * 55;
        const dur = 3 + Math.random() * 4;
        const c = colors[i % colors.length];
        Object.assign(ff.style, {
          position: 'absolute',
          width: `${3 + Math.random() * 2}px`,
          height: `${3 + Math.random() * 2}px`,
          borderRadius: '50%',
          left: `${x}%`,
          top: `${y}%`,
          background: c.bg,
          filter: 'blur(1.5px)',
          boxShadow: c.shadow,
          opacity: '0',
          zIndex: '10',
          transition: 'opacity 0.6s ease',
          animation: `rg-ff-float ${dur}s ease-in-out infinite`,
        });
        el.appendChild(ff);
        timers.push(window.setTimeout(() => { ff.style.opacity = `${0.4 + Math.random() * 0.4}`; }, i * 120));
        const prime = PRIMES[Math.floor(Math.random() * PRIMES.length)];
        const blinkId = window.setInterval(() => {
          ff.style.opacity = '0';
          window.setTimeout(() => { ff.style.opacity = `${0.4 + Math.random() * 0.4}`; }, 80 + Math.random() * 200);
        }, prime * 1000 + Math.random() * 2000);
        timers.push(blinkId);
      }
    }

    function createMoonHalo() {
      const el = root.querySelector('.rg-moon-halo');
      if (!el) return;
      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        const size = 140 + i * 60;
        Object.assign(ring.style, {
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: '50%',
          border: `1px solid rgba(240,196,216,${0.08 - i * 0.02})`,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: `rg-pulse ${4 + i * 1.5}s ease-in-out ${i * 0.5}s infinite`,
        });
        el.appendChild(ring);
      }
    }

    function createRose(x: number, depth: number, initialDelay: number, prime: number) {
      const garden = root.querySelector('.rg-garden');
      if (!garden) return;

      const style = ROSE_TYPES[prime] || ROSE_TYPES[3];
      const scale = 0.45 + depth * 0.55;
      const yPos = 5 + Math.random() * 40;
      const stemH = 35 + Math.random() * 55;
      const isInitial = initialDelay < 500;

      const rose = document.createElement('div');
      Object.assign(rose.style, {
        position: 'absolute',
        bottom: `${yPos}%`,
        left: `${x}%`,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        zIndex: `${Math.round(depth * 100)}`,
        opacity: '0',
      });
      rose.className = 'rg-rose';

      const stem = document.createElement('div');
      Object.assign(stem.style, {
        position: 'absolute',
        bottom: '0',
        left: '50%',
        transform: 'translateX(-50%)',
        width: `${2 + Math.random()}px`,
        height: '0',
        background: 'linear-gradient(to top, #2d5a1e, #4a8a35, #2d5a1e)',
        borderRadius: '2px',
        transition: `height ${isInitial ? 0.8 : 1.2}s cubic-bezier(0.2,0.8,0.2,1)`,
      });
      rose.appendChild(stem);

      for (let l = 0; l < 2; l++) {
        const leaf = document.createElement('div');
        const side = l % 2 === 0 ? -1 : 1;
        const lAngle = side * (25 + Math.random() * 20);
        Object.assign(leaf.style, {
          position: 'absolute',
          bottom: `${stemH * (0.3 + l * 0.3)}px`,
          left: '0',
          width: '12px',
          height: '6px',
          background: `linear-gradient(${side > 0 ? '135deg' : '225deg'}, #3a8029, #5cad4a)`,
          borderRadius: side > 0 ? '0 70% 0 50%' : '70% 0 50% 0',
          transformOrigin: side > 0 ? '0 50%' : '100% 50%',
          transform: `rotate(${lAngle}deg)`,
          opacity: '0',
          transition: `opacity 0.5s cubic-bezier(0.34,1.56,0.64,1) ${isInitial ? 0.6 : 0.8 + l * 0.1}s`,
        });
        stem.appendChild(leaf);
      }

      const center = document.createElement('div');
      Object.assign(center.style, {
        position: 'absolute',
        bottom: `${stemH}px`,
        left: '50%',
        transform: 'translate(-50%, 50%) scale(0)',
        width: `${style.centerSize}px`,
        height: `${style.centerSize}px`,
        borderRadius: '50%',
        background: style.center,
        boxShadow: `0 0 6px ${style.center}`,
        zIndex: '3',
        transition: `transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${isInitial ? 0.8 : 1}s, opacity 0.5s ease ${isInitial ? 0.8 : 1}s`,
        opacity: '0',
      });
      rose.appendChild(center);

      const petalLayers = [
        { count: style.petals, dist: style.size * 0.45, pSize: style.size * 0.55, zIndex: 4 },
        { count: Math.max(4, style.petals - 2), dist: style.size * 0.28, pSize: style.size * 0.42, zIndex: 5 },
        { count: Math.max(3, style.petals - 3), dist: style.size * 0.12, pSize: style.size * 0.3, zIndex: 6 },
      ];

      petalLayers.forEach((layer, li) => {
        for (let p = 0; p < layer.count; p++) {
          const petal = document.createElement('div');
          const angle = (360 / layer.count) * p + Math.random() * 5 - 2.5;
          const rad = (angle * Math.PI) / 180;
          const offX = Math.sin(rad) * layer.dist;
          const offY = Math.cos(rad) * layer.dist;
          const hueShift = Math.floor(Math.random() * 6) - 3;
          const c = adjustColor(style.colors[Math.min(li, style.colors.length - 1)], hueShift);
          const c2 = adjustColor(style.colors[0], hueShift + 8);
          const petalDelay = isInitial ? 0.8 + li * 0.1 + p * 0.03 : 1 + li * 0.12 + p * 0.05;

          Object.assign(petal.style, {
            position: 'absolute',
            bottom: `${stemH}px`,
            left: '50%',
            width: `${layer.pSize}px`,
            height: `${layer.pSize * 1.1}px`,
            transform: `translate(calc(-50% + ${offX}px), calc(50% - ${offY}px)) rotate(${angle}deg) scale(0)`,
            transformOrigin: 'center bottom',
            background: `linear-gradient(to bottom, ${c}, ${c2})`,
            borderRadius: '50% 50% 50% 0',
            opacity: '0',
            zIndex: `${layer.zIndex}`,
            transition: `transform 0.6s cubic-bezier(0.34,1.56,0.64,1) ${petalDelay}s, opacity 0.6s ease ${petalDelay}s`,
          });
          rose.appendChild(petal);
        }
      });

      garden.appendChild(rose);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          rose.style.opacity = '1';
          stem.style.height = `${stemH}px`;
          stem.querySelectorAll('div').forEach((leaf) => { leaf.style.opacity = '0.85'; });
          center.style.transform = 'translate(-50%, 50%) scale(1)';
          center.style.opacity = '1';
          rose.querySelectorAll('div').forEach((d) => {
            if (d.style.zIndex >= '4') {
              d.style.transform = d.style.transform.replace('scale(0)', 'scale(1)');
              d.style.opacity = '0.9';
            }
          });
        });
      });

      const swayDur = 8 + Math.random() * 5;
      rose.style.animation = `rg-sway ${swayDur}s ease-in-out ${Math.random() * 4}s infinite`;

      const allRoses = garden.querySelectorAll('.rg-rose');
      if (allRoses.length > 80) {
        const old = allRoses[0] as HTMLElement;
        old.style.opacity = '0';
        old.style.transition = 'opacity 1.5s ease';
        window.setTimeout(() => old.remove(), 1500);
      }
    }

    // Initial roses
    for (let i = 0; i < 50; i++) {
      const depth = Math.random();
      const x = 3 + Math.random() * 94;
      const prime = PRIMES[Math.floor(Math.random() * PRIMES.length)];
      createRose(x, depth, Math.random() * 800, prime);
    }

    PRIMES.forEach((prime) => {
      const id = window.setInterval(() => {
        createRose(3 + Math.random() * 94, Math.random(), 100, prime);
      }, prime * 2500);
      timers.push(id);
    });

    createStars();
    createGrass();
    createFireflies();
    createMoonHalo();

    return () => {
      timers.forEach((id) => {
        clearInterval(id);
        clearTimeout(id);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0,
        background: 'linear-gradient(170deg, #030614 0%, #0a0e24 15%, #141238 30%, #1e184d 42%, #2a1a45 52%, #1a1030 65%, #0d0a14 100%)',
      }}
    >
      {/* Atmospheric glow — pink/gold horizon band */}
      <div style={{
        position: 'absolute', bottom: '25%', left: '-10%', width: '120%', height: '40%',
        background: 'radial-gradient(ellipse at 50% 80%, rgba(232,160,191,0.12) 0%, rgba(212,165,116,0.06) 40%, transparent 70%)',
        zIndex: 0,
      }} />

      {/* Upper purple haze */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '50%',
        background: 'radial-gradient(ellipse at 30% 20%, rgba(155,114,207,0.1) 0%, transparent 50%)',
        zIndex: 0,
      }} />

      {/* Stars */}
      <div className="rg-stars" style={{ position: 'absolute', inset: 0, height: '60%', zIndex: 0 }} />

      {/* Moon */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '15%',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #fff8f0, #f0e8d8, #e8d8c0)',
        boxShadow: '0 0 20px rgba(240,232,216,0.4), 0 0 60px rgba(240,232,216,0.15), 0 0 120px rgba(232,160,191,0.08)',
        zIndex: 1,
      }}>
        {/* Moon craters */}
        <div style={{ position: 'absolute', top: '25%', left: '30%', width: '8px', height: '8px', borderRadius: '50%', background: 'rgba(200,190,170,0.3)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '55%', width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(200,190,170,0.2)' }} />
        <div style={{ position: 'absolute', top: '35%', left: '60%', width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(200,190,170,0.25)' }} />
      </div>

      {/* Moon halo rings */}
      <div className="rg-moon-halo" style={{
        position: 'absolute', top: '10%', right: '15%', width: '50px', height: '50px', zIndex: 0, pointerEvents: 'none',
      }} />

      {/* Horizon glow line */}
      <div style={{
        position: 'absolute', bottom: '32%', left: 0, width: '100%', height: '2px',
        background: 'linear-gradient(90deg, transparent 5%, rgba(232,160,191,0.15) 25%, rgba(212,165,116,0.2) 50%, rgba(232,160,191,0.15) 75%, transparent 95%)',
        filter: 'blur(4px)',
        zIndex: 1,
      }} />

      {/* Distant treeline silhouette */}
      <svg style={{ position: 'absolute', bottom: '30%', width: '100%', height: '15%', zIndex: 1, opacity: 0.4 }} viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0 120 L0 80 Q60 40 100 65 Q130 30 160 55 Q200 20 240 50 Q280 35 320 60 Q360 25 400 55 Q440 40 480 65 Q520 30 560 50 Q600 15 640 45 Q680 30 720 55 Q760 20 800 50 Q840 35 880 60 Q920 25 960 55 Q1000 40 1040 65 Q1080 30 1120 50 Q1160 15 1200 45 Q1240 30 1280 55 Q1320 20 1360 50 Q1400 35 1440 60 L1440 120 Z" fill="rgba(15,10,25,0.8)" />
      </svg>

      {/* Ground */}
      <div
        className="rg-ground"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '35%',
          background: 'linear-gradient(to bottom, #0f1f10 0%, #0a1a0a 50%, #060e06 100%)',
          borderRadius: '50% 70% 0 0 / 25px',
          zIndex: 2,
          overflow: 'hidden',
        }}
      />

      {/* Ground mist */}
      <div style={{
        position: 'absolute', bottom: '28%', left: 0, width: '100%', height: '12%',
        background: 'linear-gradient(to bottom, transparent, rgba(232,160,191,0.03), rgba(155,114,207,0.02), transparent)',
        zIndex: 3,
        pointerEvents: 'none',
        animation: 'rg-mist-drift 20s ease-in-out infinite',
      }} />

      {/* Garden */}
      <div className="rg-garden" style={{ position: 'absolute', inset: 0, zIndex: 4 }} />

      {/* Fireflies */}
      <div className="rg-fireflies" style={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none' }} />

      <style>{`
        @keyframes rg-twinkle { 0%,100%{opacity:0.05} 50%{opacity:0.65} }
        @keyframes rg-grass-sway { 0%,100%{transform:rotate(-3deg)} 50%{transform:rotate(3deg)} }
        @keyframes rg-sway { 0%,100%{transform:scale(1) rotate(-2deg)} 50%{transform:scale(1) rotate(2deg)} }
        @keyframes rg-ff-float {
          0%{transform:translate(0,0)} 25%{transform:translate(3px,-4px)} 50%{transform:translate(-2px,-2px)}
          75%{transform:translate(4px,-5px)} 100%{transform:translate(0,0)}
        }
        @keyframes rg-pulse { 0%,100%{opacity:0.3;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.6;transform:translate(-50%,-50%) scale(1.05)} }
        @keyframes rg-mist-drift { 0%,100%{transform:translateX(0)} 50%{transform:translateX(30px)} }
      `}</style>
    </div>
  );
}
