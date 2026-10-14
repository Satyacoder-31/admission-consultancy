'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { councilAffiliations } from '@/data/siteConfig';
import { 
  ShieldCheck, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Award
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#082B59] text-xs font-bold uppercase tracking-wider mb-3">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>National Regulatory Authorities & Board Equivalence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Statutory Commission & Council Recognition
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              We guide students to verify institutional approvals directly with the University Grants Commission (UGC) and confirm secondary board recognitions through the Council of Boards of School Education in India (COBSE).
            </p>
          </div>
        )}

        {/* Two Luxury Institution Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {councilAffiliations.map((item, index) => {
            const isUgc = item.id === 'ugc';
            return (
              <ScrollReveal key={item.id} delay={index * 0.1} direction={index === 0 ? 'left' : 'right'}>
                <div className="relative rounded-3xl bg-slate-50/70 border-2 border-slate-200 hover:border-amber-400/80 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl group">
                  {/* Decorative corner tag */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                      isUgc 
                        ? 'bg-blue-100/90 text-[#082B59] border border-blue-300' 
                        : 'bg-amber-100/90 text-amber-950 border border-amber-300'
                    }`}>
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{isUgc ? 'Apex University Authority' : 'Apex School Boards Council'}</span>
                    </span>
                  </div>

                  <div>
                    {/* Header with High-Resolution Logo */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200/80">
                      {/* Logo Container */}
                      <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-2 shadow-md border-2 border-slate-300 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                          <Image
                            src={item.logo}
                            alt={`${item.name} Official Emblem`}
                            width={112}
                            height={112}
                            className="w-full h-full object-contain"
                            priority
                          />
                        </div>
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

                    {/* Institutional Status Badge */}
                    <div className="mt-5 p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-inner">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-slate-600 font-medium">Recognition:</span>
                        <span className="font-bold text-[#082B59]">{item.recognition}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        Statutory Body
                      </span>
                    </div>

                    {/* Description Narrative */}
                    <div className="mt-5 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {item.description}
                      </p>

                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Headquarters:</strong> {item.location}</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Statutory Authority:</strong> {item.recognition}</span>
                      </div>
                    </div>

                    {/* Featured Programs Pills */}
                    <div className="mt-5 pt-4 border-t border-slate-200">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                        Key Verification Areas:
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
                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#082B59] text-xs font-bold transition-all border border-slate-300 flex items-center justify-center gap-1.5"
                    >
                      <span>Official {item.shortName} Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-teal-600" />
                    </a>

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(item.name)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Check University / Board Validity</span>
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
            <strong>Statutory Compliance Advisory:</strong> SAHI RAAH CONSULTANCY acts strictly as an educational guidance facilitator. We direct students exclusively towards statutory UGC-enacted universities and COBSE-recognized educational boards to ensure complete credential legitimacy and pan-India government job validity.
          </p>
        </div>
      </div>
    </section>
  );
}
