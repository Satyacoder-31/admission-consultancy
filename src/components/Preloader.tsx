'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Preloader() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isRendered, setIsRendered] = useState(true);
  const isInitialMount = useRef(true);

  const resetScrollToTop = () => {
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    }
  };

  // Function to run a smooth loading sequence
  const startLoadingAnimation = (durationMs = 400) => {
    setIsRendered(true);
    setIsVisible(true);
    setProgress(0);
    resetScrollToTop();

    const stepTime = 25;
    const steps = durationMs / stepTime;
    let current = 0;

    const interval = setInterval(() => {
      current += 100 / steps;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          setIsVisible(false);
          resetScrollToTop();
          setTimeout(() => {
            setIsRendered(false);
            resetScrollToTop();
          }, 450);
        }, 150);
      } else {
        setProgress(Math.round(current));
      }
    }, stepTime);

    return () => clearInterval(interval);
  };

  // Initial load: ensure window is at the very top of the page
  useEffect(() => {
    resetScrollToTop();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      setIsRendered(false);
      resetScrollToTop();
      return;
    }

    const cleanup = startLoadingAnimation(500);
    return cleanup;
  }, []);

  // Whenever user redirects / navigates to a new page, show the branded loading screen and reset to top
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    resetScrollToTop();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      resetScrollToTop();
      return;
    }

    // Trigger branded loading screen on route change
    const cleanup = startLoadingAnimation(420);
    return cleanup;
  }, [pathname]);

  if (!isRendered) return null;

  return (
    <div
      id="branded-preloader"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center transition-all duration-500 ease-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
      }`}
      style={{
        background: 'radial-gradient(circle at center, #0F4280 0%, #082B59 60%, #041830 100%)',
      }}
      role="status"
      aria-live="polite"
      aria-label="Loading SAHI RAAH CONSULTANCY"
    >
      {/* Background ambient glowing rings */}
      <div className="absolute w-[360px] h-[360px] md:w-[480px] md:h-[480px] rounded-full border border-teal-500/15 animate-ping opacity-25 pointer-events-none" />
      <div className="absolute w-[280px] h-[280px] md:w-[380px] md:h-[380px] rounded-full border border-amber-400/20 animate-spin opacity-30 pointer-events-none [animation-duration:12s]" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Logo Container with gentle glow */}
        <div className="relative mb-5">
          <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-teal-500 to-amber-400 opacity-40 blur-lg animate-pulse" />
          <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white p-2 shadow-2xl flex items-center justify-center border-2 border-amber-400/70 overflow-hidden transform transition-transform duration-300">
            <Image
              src="/images/brand/logo.jpg"
              alt="SAHI RAAH CONSULTANCY Official Logo"
              width={112}
              height={112}
              className="w-full h-full object-contain rounded-full"
              priority
            />
          </div>
        </div>

        {/* Brand Name */}
        <h2 className="text-xl md:text-2xl font-black tracking-wider text-white uppercase mb-0.5">
          SAHI RAAH
        </h2>
        <p className="text-[11px] md:text-xs tracking-[0.25em] font-bold text-amber-300 uppercase mb-2">
          CONSULTANCY
        </p>

        {/* Tagline */}
        <p className="text-xs text-teal-200/90 font-medium italic mb-5">
          &ldquo;Your Future. Our Guidance.&rdquo;
        </p>

        {/* Animated Progress Bar */}
        <div className="w-52 md:w-60 bg-slate-900/70 rounded-full h-2 p-0.5 border border-white/10 shadow-inner overflow-hidden mb-2.5">
          <div
            className="h-full rounded-full transition-all duration-100 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #078C8A 0%, #1355A5 50%, #E6B437 100%)',
              boxShadow: '0 0 10px rgba(230, 180, 55, 0.7)',
            }}
          />
        </div>

        {/* Status & Percentage */}
        <div className="flex items-center justify-between w-52 md:w-60 text-xs font-mono text-slate-300">
          <span className="flex items-center gap-1.5 text-teal-300 font-sans text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            Loading Page
          </span>
          <span className="font-bold text-amber-300 text-xs">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
