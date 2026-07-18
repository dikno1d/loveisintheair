'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import HeartIntro from '@/components/common/HeartIntro';
import CursorAndProgress from '@/components/common/CursorAndProgress';
import HeroSection from '@/components/hero/HeroSection';
import FloatingHearts from '@/components/common/FloatingHearts';
import EasterEggs from '@/components/common/EasterEggs';

const TimelineSection = dynamic(() => import('@/components/timeline/TimelineSection'), { ssr: false });
const LoveLetterSection = dynamic(() => import('@/components/loveletter/LoveLetterSection'), { ssr: false });
const FlowerGardenSection = dynamic(() => import('@/components/flowergarden/FlowerGardenSection'), { ssr: false });
const CountdownSection = dynamic(() => import('@/components/countdown/CountdownSection'), { ssr: false });
const ReasonsSection = dynamic(() => import('@/components/reasons/ReasonsSection'), { ssr: false });
const SurpriseBoxSection = dynamic(() => import('@/components/surprisebox/SurpriseBoxSection'), { ssr: false });
const GallerySection = dynamic(() => import('@/components/gallery/GallerySection'), { ssr: false });
const ChatSection = dynamic(() => import('@/components/chat/ChatSection'), { ssr: false });
const MusicPlayer = dynamic(() => import('@/components/music/MusicPlayer'), { ssr: false });
const FooterSection = dynamic(() => import('@/components/footer/FooterSection'), { ssr: false });

export default function Home() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div style={{ position: 'relative', background: '#0d0a14' }} suppressHydrationWarning>
      {!introDone && <HeartIntro onDone={() => setIntroDone(true)} />}
      <CursorAndProgress />
      <FloatingHearts />
      <EasterEggs />

      <HeroSection />

      <div className="section-divider" />
      <TimelineSection />

      <div className="section-divider" />
      <LoveLetterSection />

      <div className="section-divider" />
      <FlowerGardenSection />

      <div className="section-divider" />
      <CountdownSection />

      <div className="section-divider" />
      <ReasonsSection />

      <div className="section-divider" />
      <GallerySection />

      <div className="section-divider" />
      <SurpriseBoxSection />

      <div className="section-divider" />
      <ChatSection />

      <div className="section-divider" />
      <FooterSection />

      <MusicPlayer />
    </div>
  );
}
