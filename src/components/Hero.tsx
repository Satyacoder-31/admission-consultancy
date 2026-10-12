'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getGeneralWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils';
import { 
  ArrowRight, 
  MessageCircle, 
  GraduationCap, 
  Sparkles, 
  Compass, 
  CheckCircle2,
  Calendar,
  Building2,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { SlideImageRightToLeft } from '@/components/ScrollReveal';

interface HeroProps {
  onOpenEnquiry: () => void;
}

const HERO_SLIDES = [
  {
    id: 1,
    image: '/images/hero/slide-1-campus.jpg',
    alt: 'Prestigious University Campus Environment',
    badge: '15+ Leading Partner Universities',
    caption: 'Prestigious Campuses',
  },
  {
    id: 2,
    image: '/images/hero/slide-2-library.jpg',
    alt: 'Modern Academic Research & Library Learning',
    badge: '21+ Recognized Degrees & Diplomas',
    caption: 'Modern Learning',
  },
  {
    id: 3,
    image: '/images/hero/slide-3-convocation.jpg',
    alt: 'Graduation Convocation & Recognized Degrees',
    badge: 'UGC & Council Approved Pathways',
    caption: 'Convocation & Degrees',
  },
  {
    id: 4,
    image: '/images/hero/slide-4-counselling.jpg',
    alt: 'Personalized Educational Admission Guidance at Raxaul',
    badge: 'One-on-One Counselling Desk',
    caption: 'Personalized Guidance',
  },
];

export default function Hero({ onOpenEnquiry }: HeroProps) {
  const whatsappUrl = getWhatsAppUrl(getGeneralWhatsAppMessage());
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic slideshow transition every 5.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden bg-[#082B59] text-white pt-8 pb-16 lg:pt-14 lg:pb-24 w-full max-w-full"
    >
      {/* ============================================================== */}
      {/* MULTI-IMAGE BACKGROUND SLIDESHOW WITH SMOOTH CROSSFADE         */}
      {/* ============================================================== */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={idx === 0}
                className={`object-cover object-center transition-transform duration-[7000ms] ease-out ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
              />
            </div>
          );
        })}

        {/* Multi-layered luxury gradients for 100% contrast & legibility */}
        {/* Left-to-right directional mask for text readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#03152B]/95 via-[#082B59]/90 to-[#082B59]/75 lg:to-[#082B59]/60" />
        
        {/* Top-to-bottom vignette */}
        <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#051D3C]/95 via-transparent to-[#082B59]/95" />

        {/* Ambient dot matrix luxury texture */}
        <div
          className="absolute inset-0 z-20 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(247, 213, 123, 0.45) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* Decorative curved brand accent path */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden z-20">
        <svg
          viewBox="0 0 1200 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full object-cover"
        >
          <path
            d="M-100 700 C 300 650, 400 350, 700 300 C 1000 250, 1100 100, 1300 50"
            stroke="url(#gradient-path)"
            strokeWidth="32"
            strokeLinecap="round"
          />
          <path
            d="M-50 750 C 350 700, 450 400, 750 350 C 1050 300, 1150 150, 1350 100"
            stroke="url(#gradient-path-teal)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray="12 12"
          />
          <defs>
            <linearGradient id="gradient-path" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#078C8A" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#1355A5" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#E6B437" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="gradient-path-teal" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#078C8A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0AAFA8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating subtle glowing ambient orbs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none z-20" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-amber-400/10 blur-3xl pointer-events-none z-20" />

      {/* Content Container */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge with current slide spotlight */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/30 text-xs text-amber-300 font-semibold shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{HERO_SLIDES[currentSlide].badge} • Sessions 2026–2028</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
              Your Dreams Deserve{' '}
              <span className="block gold-gradient-text mt-1">
                The Right Direction.
              </span>
            </h1>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-200/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore courses, discover universities, and receive personalized admission guidance for the next step in your academic journey. From Raxaul to leading universities across India.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onOpenEnquiry}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 shadow-xl shadow-amber-400/20 hover:scale-[1.02] active:scale-[0.98] transition-all border border-amber-300 cursor-pointer"
              >
                <GraduationCap className="w-5 h-5 text-slate-900" />
                <span>Get Admission Guidance</span>
              </button>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-amber-400/50 shadow-md transition-all hover:scale-[1.02]"
              >
                <Compass className="w-4 h-4 text-teal-300" />
                <span>Explore Courses</span>
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm text-white bg-[#25D366]/90 hover:bg-[#25D366] transition-transform active:scale-95 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Verifiable Trust Indicators Bar */}
            <div className="pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0 text-teal-300">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">21+ Courses</h4>
                  <p className="text-[11px] text-slate-300">UG, PG, Tech, Medical & Diploma</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center flex-shrink-0 text-amber-300">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">15+ Universities</h4>
                  <p className="text-[11px] text-slate-300">Regular, Distance & Online</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center flex-shrink-0 text-blue-300">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Guidance</h4>
                  <p className="text-[11px] text-slate-300">Kaurihar Chouk, Raxaul</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Poster & Floating Glass Cards (5 cols) */}
          <div className="lg:col-span-5 relative flex justify-center w-full max-w-full">
            <div className="relative w-full max-w-md mx-auto">
              <SlideImageRightToLeft className="w-full flex justify-center">
                {/* Visual Frame */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-400/40 bg-slate-900/60 backdrop-blur-md">
                  <div className="relative w-full aspect-[4/5] overflow-hidden">
                    <Image
                      src="/images/brand/admission_poster.jpg"
                      alt="SAHI RAAH CONSULTANCY Official Admission Guidance Poster"
                      fill
                      className="object-cover object-top hover:scale-105 transition-transform duration-700"
                      priority
                    />
                  </div>

                  {/* Bottom overlay badge */}
                  <div className="p-3.5 sm:p-4 bg-[#051D3C]/95 border-t border-amber-400/30 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block">
                        SAHI RAAH CONSULTANCY
                      </span>
                      <span className="text-xs font-extrabold text-white">
                        Raxaul (East Champaran, Bihar)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-amber-300 block font-semibold">
                        Helpline: 8092911956
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Offline & Online Support
                      </span>
                    </div>
                  </div>
                </div>
              </SlideImageRightToLeft>

              {/* Floating Card 1: Session Badge (Top Right) */}
              <div className="absolute top-2 right-2 sm:-top-4 sm:-right-4 bg-white/95 backdrop-blur-md text-slate-900 p-2.5 sm:p-3 rounded-2xl shadow-xl border border-amber-400/50 flex items-center gap-2 sm:gap-3 animate-bounce [animation-duration:5s] max-w-[190px] sm:max-w-[210px] z-10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold flex-shrink-0">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="leading-tight">
                  <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase block">
                    ADMISSION OPEN
                  </span>
                  <span className="text-[11px] sm:text-xs font-black text-[#082B59]">
                    Session 2026–2027
                  </span>
                </div>
              </div>

              {/* Floating Card 2: 3 Education Modes (Bottom Left) */}
              <div className="absolute bottom-2 left-2 sm:-bottom-5 sm:-left-6 bg-[#051D3C]/95 backdrop-blur-md text-white p-2.5 sm:p-3.5 rounded-2xl shadow-2xl border border-teal-400/40 flex items-center gap-2 sm:gap-3 max-w-[200px] sm:max-w-[240px] z-10">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
                </div>
                <div className="leading-tight">
                  <span className="text-[9px] sm:text-[10px] font-bold text-teal-300 uppercase block">
                    Three Study Modes
                  </span>
                  <span className="text-[11px] sm:text-xs font-bold text-white">
                    Regular • Distance • Online
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* SLIDESHOW PROGRESS & INTERACTIVE CONTROLS STRIP                */}
        {/* ============================================================== */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0 scrollbar-none">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mr-2 hidden md:inline-block">
              Campus Spotlight:
            </span>
            {HERO_SLIDES.map((slide, idx) => {
              const isActive = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`group relative flex items-center gap-2 py-1.5 px-3 rounded-full transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 font-bold border border-amber-400/50 shadow-sm'
                      : 'bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                  aria-label={`Go to slide ${idx + 1}: ${slide.caption}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-all ${
                      isActive ? 'bg-amber-400 scale-125 ring-2 ring-amber-400/40' : 'bg-slate-400 group-hover:bg-white'
                    }`}
                  />
                  <span className="text-xs whitespace-nowrap">{slide.caption}</span>
                </button>
              );
            })}
          </div>

          {/* Previous / Next buttons & Slide Counter */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={prevSlide}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous background slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-mono text-xs text-amber-300 px-1 font-bold">
              0{currentSlide + 1} / 0{HERO_SLIDES.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next background slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
