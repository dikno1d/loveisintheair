'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

function EqBar({ active, i }: { active: boolean; i: number }) {
  const heights = useRef([4 + (i % 3) * 3, 14 + (i % 4) * 4, 8 + (i % 2) * 5, 16 + (i % 3) * 3, 4 + (i % 5) * 2]);
  return (
    <motion.div
      animate={active ? { height: heights.current } : { height: 3 }}
      transition={active ? { duration: 0.5 + i * 0.1, repeat: Infinity, repeatType: 'reverse' } : { duration: 0.3 }}
      style={{ width: '2.5px', background: 'linear-gradient(180deg, #e8a0bf, #d4a574)', borderRadius: '2px' }}
    />
  );
}

export default function MusicPlayer() {
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const playerRef = useRef<any>(null);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const YT_VIDEO_ID = 'cNGjD0VG4R8';

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player('yt-player', {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 1, controls: 0, disablekb: 1, fs: 0, iv_load_policy: 3,
          modestbranding: 1, rel: 0, showinfo: 0, loop: 1, playlist: YT_VIDEO_ID,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        },
        events: {
          onReady: (e: any) => {
            playerRef.current = e.target;
            e.target.setVolume(70);
            e.target.playVideo().then(() => {
              setStarted(true);
              setIsPlaying(true);
            }).catch(() => {
              // Autoplay blocked - try muted
              e.target.mute();
              e.target.playVideo().then(() => {
                setStarted(true);
                setIsPlaying(false);
              }).catch(() => {});
            });
            setDuration(e.target.getDuration());
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) setIsPlaying(true);
            else if (e.data === window.YT.PlayerState.PAUSED) setIsPlaying(false);
          },
        },
      });
    };

    // Retry play on first user interaction
    const retryPlay = () => {
      const p = playerRef.current;
      if (p && !started) {
        p.unMute();
        p.setVolume(70);
        p.playVideo().catch(() => {});
        setStarted(true);
        setIsPlaying(true);
      }
      window.removeEventListener('click', retryPlay);
      window.removeEventListener('touchstart', retryPlay);
    };
    window.addEventListener('click', retryPlay);
    window.addEventListener('touchstart', retryPlay);

    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      window.removeEventListener('click', retryPlay);
      window.removeEventListener('touchstart', retryPlay);
    };
  }, []);

  useEffect(() => {
    if (!started) return;
    progressInterval.current = setInterval(() => {
      const p = playerRef.current;
      if (p?.getCurrentTime && p?.getDuration) {
        setCurrentTime(p.getCurrentTime());
        setDuration(p.getDuration());
        setProgress((p.getCurrentTime() / p.getDuration()) * 100);
      }
    }, 500);
    return () => { if (progressInterval.current) clearInterval(progressInterval.current); };
  }, [started]);

  const togglePlay = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    if (isPlaying) p.pauseVideo();
    else {
      p.unMute();
      p.setVolume(volume);
      p.playVideo();
    }
  }, [isPlaying, volume]);

  const handleVolume = useCallback((val: number) => {
    setVolume(val);
    const p = playerRef.current;
    if (p) { p.setVolume(val); if (val > 0) p.unMute(); }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const p = playerRef.current;
    if (!p || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    p.seekTo(((e.clientX - rect.left) / rect.width) * duration, true);
  }, [duration]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, '0')}`;

  return (
    <>
      <div style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', opacity: 0, pointerEvents: 'none' }}>
        <div id="yt-player" />
      </div>

      <AnimatePresence>
        {started && (
          <motion.div
            style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 1000 }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Expanded panel */}
            <div
              style={{
                width: '300px', marginBottom: '12px',
                background: 'rgba(13,10,20,0.92)', backdropFilter: 'blur(30px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '22px',
                padding: '20px', boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '14px', margin: '0 auto 10px',
                  background: 'linear-gradient(135deg, rgba(232,160,191,0.25), rgba(155,114,207,0.2))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e8a0bf" strokeWidth="1.5"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                </div>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 600, color: '#fff8f0' }}>Perfect</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.75rem', color: 'rgba(255,248,240,0.4)' }}>Ed Sheeran</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', color: 'rgba(255,248,240,0.3)', marginTop: '4px' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </p>
              </div>
              <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', marginBottom: '14px', cursor: 'pointer' }} onClick={handleSeek}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #e8a0bf, #d4a574)', borderRadius: '2px', transition: 'width 0.3s' }} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,248,240,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
                </svg>
                <input type="range" min="0" max="100" step="1" value={volume} onChange={(e) => handleVolume(parseInt(e.target.value))} style={{ flex: 1, accentColor: '#e8a0bf', height: '3px' }} />
              </div>
            </div>

            {/* Floating pill */}
            <motion.div
              onClick={togglePlay}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                background: 'rgba(13,10,20,0.88)', backdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50px',
                padding: '8px 18px 8px 8px', cursor: 'pointer',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
              }}
              whileHover={{ scale: 1.03 }}
            >
              <div style={{
                width: '46px', height: '46px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #e8a0bf, #d4a574)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px rgba(232,160,191,0.25)',
              }}>
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0d0a14"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0d0a14"><polygon points="5,3 19,12 5,21"/></svg>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'end', gap: '2px', height: '22px' }}>
                {Array.from({ length: 5 }, (_, i) => <EqBar key={i} active={isPlaying} i={i} />)}
              </div>
              <div style={{ minWidth: '85px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: '#fff8f0' }}>Perfect</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.55rem', color: 'rgba(255,248,240,0.35)' }}>Ed Sheeran</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
