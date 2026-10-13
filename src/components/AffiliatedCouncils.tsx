'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { councilAffiliations } from '@/data/siteConfig';
import { 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  HeartPulse
} from 'lucide-react';
import ScrollReveal, { SlideImageRightToLeft } from '@/components/ScrollReveal';

interface AffiliatedCouncilsProps {
  onOpenEnquiry?: (customSubject?: string) => void;
  showTitle?: boolean;
}

export default function AffiliatedCouncils({ onOpenEnquiry, showTitle = true }: AffiliatedCouncilsProps) {
  return (
    <section className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <HeartPulse className="w-3.5 h-3.5 text-emerald-600" />
              <span>Paramedical, Yoga & Alternative Medicine Portals</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Recognized Councils & Healthcare Collaborations
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              We guide prospective students for statutory paramedical credentials, yogic therapies, and alternative medicine programs through verified partner bodies and councils.
            </p>
          </div>
        )}

        {/* Two Luxury Institution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {councilAffiliations.map((item, index) => {
            const isAicpmf = item.id === 'aicpmf';
            return (
              <ScrollReveal key={item.id} delay={index * 0.1} direction={index === 0 ? 'left' : 'right'}>
                <div className="relative rounded-3xl bg-slate-50/70 border-2 border-slate-200 hover:border-amber-400/80 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl group">
                  {/* Decorative corner tag */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isAicpmf 
                        ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300' 
                        : 'bg-blue-100/90 text-blue-900 border border-blue-300'
                    }`}>
                      <ShieldCheck className="w-3 h-3" />
                      <span>{isAicpmf ? 'National Council' : 'Specialized College'}</span>
                    </span>
                  </div>

                  <div>
                    {/* Header with High-Resolution Logo */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200/80">
                      {/* Logo Container */}
                      <div className="relative flex-shrink-0">
                        {isAicpmf ? (
                          // Circular Emblem
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-md border-2 border-emerald-600/30 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                            <Image
                              src={item.logo}
                              alt={`${item.name} Official Emblem`}
                              width={112}
                              height={112}
                              className="w-full h-full object-contain"
                              priority
                            />
                          </div>
                        ) : (
                          // Rectangular Logo
                          <div className="w-32 h-16 sm:w-36 sm:h-20 rounded-xl bg-white p-2 shadow-md border-2 border-blue-800/30 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                            <Image
                              src={item.logo}
                              alt={`${item.name} Official Brand Logo`}
                              width={144}
                              height={80}
                              className="w-full h-full object-contain"
                              priority
                            />
                          </div>
                        )}
                      </div>

                      {/* Header Titles */}
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                          {item.name}
                        </h3>
                        <p className="text-xs font-semibold text-amber-700">
                          {item.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Official Portal Link Callout Banner */}
                    <div className="mt-5 p-3.5 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-slate-600 font-medium">Official Portal:</span>
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-bold text-[#082B59] hover:text-[#1355A5] hover:underline flex items-center gap-1"
                        >
                          <span>{item.displayUrl}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                        </a>
                      </div>

                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 hover:text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 shadow-sm whitespace-nowrap"
                      >
                        <span>Visit {item.displayUrl}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    {/* Description Narrative */}
                    <div className="mt-5 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Campus & Offices:</strong> {item.location}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Statutory Reference:</strong> {item.recognition}</span>
                      </div>
                    </div>

                    {/* Featured Programs Pills */}
                    <div className="mt-5 pt-4 border-t border-slate-200">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                        Key Available Pathways:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {item.featuredCourses.map((c, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-xs font-medium"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                    <a
                      href={item.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#082B59] hover:text-[#1355A5] inline-flex items-center gap-1 hover:underline"
                    >
                      <span>Open Website ({item.displayUrl})</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(item.name)}
                      className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Enquire for {item.shortName}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Advisory / Disclaimer Strip */}
        <div className="mt-10 p-4 rounded-2xl bg-teal-50/70 border border-teal-200 flex items-start gap-3 text-xs text-teal-950">
          <ShieldCheck className="w-4 h-4 text-teal-700 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Admissions Notice:</strong> SAHI RAAH CONSULTANCY acts as an educational guidance facilitator connecting eligible candidates to accredited faculties, councils, and universities. For syllabus downloads, verification of autonomous council gazettes, or branch registrations, please refer directly to the official websites (<a href="https://www.aicpmf.com" target="_blank" rel="noopener noreferrer" className="text-[#082B59] underline font-bold">www.aicpmf.com</a> and <a href="https://www.bayc.in" target="_blank" rel="noopener noreferrer" className="text-[#082B59] underline font-bold">www.bayc.in</a>) or visit our counseling desk in Raxaul.
          </p>
        </div>
      </div>
    </section>
  );
}
