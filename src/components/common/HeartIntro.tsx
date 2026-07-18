'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HeartIntroProps { onDone: () => void }

export default function HeartIntro({ onDone }: HeartIntroProps) {
  const [phase, setPhase] = useState<'loading' | 'appear' | 'open' | 'done'>('loading');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const rafRef = useRef<number>(0);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setPhase('done');
    gsap.delayedCall(0.3, onDone);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let heartScale = 0;
    let heartOpacity = 0;
    let splitAmount = 0;
    let glowIntensity = 0;
    let zoomThrough = 0;
    let heartbeat = 0;

    // Floating particles
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number; color: string }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: -0.15 - Math.random() * 0.4,
        size: 1 + Math.random() * 2.5, alpha: 0.15 + Math.random() * 0.3,
        color: ['#e8a0bf', '#ff69b4', '#d4a574', '#ffb7c5', '#c084fc'][i % 5],
      });
    }

    // Rose petals
    const petals: { x: number; y: number; vx: number; vy: number; rot: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 18; i++) {
      petals.push({
        x: Math.random() * canvas.width, y: -20 - Math.random() * 200,
        vx: 0.2 + Math.random() * 0.4, vy: 0.4 + Math.random() * 0.6,
        rot: Math.random() * Math.PI * 2, size: 8 + Math.random() * 12,
        alpha: 0.15 + Math.random() * 0.2,
      });
    }

    // Draw a single half-heart using smooth bezier curves
    // side: -1 = left half, 1 = right half
    const drawHalfHeart = (cx: number, cy: number, s: number, side: number) => {
      ctx.save();
      ctx.translate(cx, cy);

      // Half heart with correct orientation:
      // Point at bottom, two bumps at top, dip at center-top
      ctx.beginPath();
      ctx.moveTo(0, 0); // Center top dip

      if (side === -1) {
        // Left half: from dip → left bump → down to bottom point
        ctx.bezierCurveTo(
          -4 * s, -14 * s,   // control 1
          -28 * s, -42 * s,  // control 2
          -36 * s, -42 * s   // peak of left bump
        );
        ctx.bezierCurveTo(
          -52 * s, -42 * s,  // control 1
          -64 * s, -20 * s,  // control 2
          -64 * s, -4 * s    // left side
        );
        ctx.bezierCurveTo(
          -64 * s, 18 * s,   // control 1
          -38 * s, 46 * s,   // control 2
          0, 56 * s          // bottom point
        );
      } else {
        // Right half: from dip → right bump → down to bottom point
        ctx.bezierCurveTo(
          4 * s, -14 * s,
          28 * s, -42 * s,
          36 * s, -42 * s
        );
        ctx.bezierCurveTo(
          52 * s, -42 * s,
          64 * s, -20 * s,
          64 * s, -4 * s
        );
        ctx.bezierCurveTo(
          64 * s, 18 * s,
          38 * s, 46 * s,
          0, 56 * s
        );
      }
      ctx.closePath();

      // Crystal gradient
      const grad = ctx.createLinearGradient(side * -30 * s, -45 * s, side * 30 * s, 55 * s);
      grad.addColorStop(0, '#ff3366');
      grad.addColorStop(0.25, '#ff5588');
      grad.addColorStop(0.5, '#ff88aa');
      grad.addColorStop(0.75, '#ff3366');
      grad.addColorStop(1, '#cc1144');
      ctx.fillStyle = grad;
      ctx.fill();

      // Crystal highlight / shine
      ctx.beginPath();
      if (side === -1) {
        ctx.ellipse(-18 * s, -30 * s, 8 * s, 14 * s, -0.4, 0, Math.PI * 2);
      } else {
        ctx.ellipse(14 * s, -28 * s, 6 * s, 10 * s, 0.3, 0, Math.PI * 2);
      }
      ctx.fillStyle = `rgba(255,255,255,${0.18 * heartOpacity})`;
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      time += 0.016;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const heartSize = Math.min(w, h) * 0.0032;

      // Background
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, w, h);

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * (0.5 + Math.sin(time * 2 + p.x * 0.01) * 0.5);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      // Petals
      petals.forEach(p => {
        p.x += p.vx + Math.sin(time + p.x * 0.01) * 0.3;
        p.y += p.vy;
        if (p.y > h + 20) { p.y = -20; p.x = Math.random() * w; }
        ctx.save();
        ctx.globalAlpha = p.alpha * (1 - zoomThrough * 0.8);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot + time * 0.3);
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.4, p.size, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#ff8899';
        ctx.fill();
        ctx.restore();
      });

      // Heart scale with heartbeat
      const currentScale = heartScale * (1 + heartbeat * 0.06);

      // Glow behind heart
      if (glowIntensity > 0 && currentScale > 0) {
        ctx.save();
        ctx.globalAlpha = glowIntensity * 0.35;
        const glow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 180 * currentScale);
        glow.addColorStop(0, 'rgba(255,51,102,0.4)');
        glow.addColorStop(0.5, 'rgba(255,100,140,0.12)');
        glow.addColorStop(1, 'rgba(255,51,102,0)');
        ctx.fillStyle = glow;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      // Heart halves
      if (currentScale > 0 && heartOpacity > 0) {
        ctx.save();
        ctx.globalAlpha = heartOpacity;

        const splitPx = splitAmount * w * 0.45;

        // Left half — slides/rotates left like a door
        ctx.save();
        ctx.translate(cx - splitPx, cy);
        if (splitAmount > 0) {
          ctx.rotate(-splitAmount * 0.6);
          ctx.scale(1 - splitAmount * 0.15, 1);
        }
        ctx.globalAlpha = heartOpacity * Math.max(0, 1 - splitAmount * 0.3);
        drawHalfHeart(0, 0, currentScale, -1);
        ctx.restore();

        // Right half — slides/rotates right like a door
        ctx.save();
        ctx.translate(cx + splitPx, cy);
        if (splitAmount > 0) {
          ctx.rotate(splitAmount * 0.6);
          ctx.scale(1 - splitAmount * 0.15, 1);
        }
        ctx.globalAlpha = heartOpacity * Math.max(0, 1 - splitAmount * 0.3);
        drawHalfHeart(0, 0, currentScale, 1);
        ctx.restore();

        ctx.restore();

        // Golden center line when splitting
        if (splitAmount > 0.02 && splitAmount < 0.7) {
          ctx.save();
          const lineAlpha = Math.min(1, splitAmount * 4) * Math.max(0, 1 - (splitAmount - 0.4) * 3);
          ctx.globalAlpha = lineAlpha;
          const lineH = 70 * currentScale;
          const lineGrad = ctx.createLinearGradient(cx, cy - lineH, cx, cy + lineH);
          lineGrad.addColorStop(0, 'rgba(255,204,102,0)');
          lineGrad.addColorStop(0.2, 'rgba(255,204,102,0.9)');
          lineGrad.addColorStop(0.5, 'rgba(255,245,200,1)');
          lineGrad.addColorStop(0.8, 'rgba(255,204,102,0.9)');
          lineGrad.addColorStop(1, 'rgba(255,204,102,0)');
          ctx.fillStyle = lineGrad;
          ctx.fillRect(cx - 2, cy - lineH, 4, lineH * 2);
          ctx.restore();
        }

        // Portal glow through the gap
        if (splitAmount > 0.15) {
          ctx.save();
          const portalAlpha = Math.min(1, (splitAmount - 0.15) * 2.5);
          ctx.globalAlpha = portalAlpha * 0.6;
          const portalGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 160 + splitPx);
          portalGrad.addColorStop(0, 'rgba(255,245,210,0.7)');
          portalGrad.addColorStop(0.4, 'rgba(255,200,120,0.3)');
          portalGrad.addColorStop(1, 'rgba(255,180,100,0)');
          ctx.fillStyle = portalGrad;
          ctx.fillRect(0, 0, w, h);
          ctx.restore();
        }
      }

      // White flash during portal zoom
      if (zoomThrough > 0.2 && zoomThrough < 0.85) {
        ctx.save();
        ctx.globalAlpha = Math.sin((zoomThrough - 0.2) / 0.65 * Math.PI) * 0.35;
        ctx.fillStyle = '#fff8f0';
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }

      // Zoom through — white vignette closing in
      if (zoomThrough > 0.5) {
        ctx.save();
        const vig = (zoomThrough - 0.5) * 2;
        ctx.globalAlpha = vig;
        const vigGrad = ctx.createRadialGradient(cx, cy, w * 0.1 * (1 - vig), cx, cy, w * 0.7);
        vigGrad.addColorStop(0, 'rgba(255,250,240,0)');
        vigGrad.addColorStop(1, 'rgba(255,250,240,1)');
        ctx.fillStyle = vigGrad;
        ctx.fillRect(0, 0, w, h);
        ctx.restore();
      }
    };

    animate();

    // GSAP Timeline
    const tl = gsap.timeline({ onComplete: finish });
    tlRef.current = tl;

    tl.call(() => setPhase('loading'));
    tl.to({}, { duration: 1.2 });

    // Heart appears with elastic bounce
    tl.call(() => setPhase('appear'));
    tl.to({ val: 0 }, {
      val: 1, duration: 1.8, ease: 'elastic.out(1, 0.5)',
      onUpdate: function () { heartScale = this.targets()[0].val; heartOpacity = this.targets()[0].val; }
    });
    tl.to({ val: 0 }, {
      val: 1, duration: 1.2,
      onUpdate: function () { glowIntensity = this.targets()[0].val; }
    }, '<+0.2');

    // Heartbeat pulses
    tl.to({}, {
      duration: 2.2,
      onUpdate: function () {
        const p = this.progress();
        heartbeat = Math.sin(p * Math.PI * 5);
      },
    });

    // Heart splits open like double doors
    tl.call(() => setPhase('open'));
    tl.to({ val: 0 }, {
      val: 1, duration: 2.5, ease: 'power2.inOut',
      onUpdate: function () { splitAmount = this.targets()[0].val; }
    });
    // Heart fades as doors open
    tl.to({ val: 1 }, {
      val: 0, duration: 1.8, ease: 'power2.in',
      onUpdate: function () { heartOpacity = this.targets()[0].val; }
    }, '<+0.3');

    // Zoom through the opening
    tl.to({ val: 0 }, {
      val: 1, duration: 2, ease: 'power2.in',
      onUpdate: function () { zoomThrough = this.targets()[0].val; }
    });

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (tlRef.current) tlRef.current.kill();
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#000', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

      {/* Loading text */}
      {phase === 'loading' && (
        <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)', letterSpacing: '6px', textTransform: 'uppercase', color: 'rgba(232,160,191,0.5)', animation: 'hShimmer 2s ease-in-out infinite' }}>Loading...</p>
        </div>
      )}

      {/* A Love Story text */}
      {(phase === 'appear' || phase === 'open') && (
        <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.85rem, 2.5vw, 1.2rem)', letterSpacing: '5px', textTransform: 'uppercase', color: 'rgba(232,160,191,0.6)', textShadow: '0 0 20px rgba(232,160,191,0.3)' }}>A Love Story</p>
        </div>
      )}

      {/* Skip */}
      <button onClick={() => { if (tlRef.current) tlRef.current.kill(); finish(); }}
        style={{ position: 'absolute', bottom: '32px', right: '32px', background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50px', color: 'rgba(255,248,240,0.45)', fontFamily: 'var(--font-body)', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', padding: '10px 24px', cursor: 'pointer', opacity: 0, animation: 'fadeInSkip 0.5s ease forwards 2s' }}
        onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,248,240,0.8)'; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,248,240,0.45)'; }}>
        Skip Intro
      </button>

      <style>{`
        @keyframes hShimmer { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.8; } }
        @keyframes fadeInSkip { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
}
