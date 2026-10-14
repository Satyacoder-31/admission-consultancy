'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { recognizedBoards } from '@/data/siteConfig';
import { 
  ShieldCheck, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Sparkles,
  FileCheck,
  AlertCircle
} from 'lucide-react';
import ScrollReveal, { SlideImageRightToLeft } from '@/components/ScrollReveal';

interface RecognizedBoardsProps {
  onOpenEnquiry?: (customSubject?: string) => void;
  showTitle?: boolean;
}

export default function RecognizedBoards({ onOpenEnquiry, showTitle = true }: RecognizedBoardsProps) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showTitle && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#082B59] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#1355A5]" />
              <span>Recognized Open Schooling & Secondary Education Boards</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Class 10th & 12th Recognized Board Pathways
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
              Legitimate registration guidance and academic counselling for secondary (10th) and senior secondary (12th) certifications through verified government and statutory open schooling boards across India.
            </p>
          </div>
        )}

        {/* 4 Premium Board Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {recognizedBoards.map((board, index) => {
            return (
              <ScrollReveal key={board.id} delay={index * 0.08} direction={index % 2 === 0 ? 'left' : 'right'}>
                <div className="relative h-full rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400/80 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-xl group">
                  {/* Decorative Corner Tag */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>{board.badge}</span>
                    </span>
                  </div>

                  <div>
                    {/* Header with High-Resolution Emblem Logo */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-200/80">
                      {/* Logo Container with Circular Frame */}
                      <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-50 p-2 shadow-inner border border-slate-200 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform">
                        <Image
                          src={board.logo}
                          alt={`${board.name} Official Emblem`}
                          width={112}
                          height={112}
                          className="w-full h-full object-contain"
                          priority
                        />
                      </div>

                      {/* Header Titles */}
                      <div className="space-y-1.5 pr-20 sm:pr-0">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          {board.category}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
                          {board.name}
                        </h3>
                        {board.nativeName && (
                          <p className="text-xs font-semibold text-teal-700">
                            {board.nativeName}
                          </p>
                        )}
                        <p className="text-xs font-medium text-amber-700">
                          {board.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Recognition Banner */}
                    <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 shadow-inner">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                        <span className="text-slate-600 font-medium">Recognition:</span>
                        <span className="font-bold text-[#082B59] line-clamp-1">{board.recognition}</span>
                      </div>
                      <span className="text-[10px] font-bold text-[#082B59] bg-amber-100 px-2 py-0.5 rounded border border-amber-300 flex-shrink-0">
                        Valid for Higher Studies
                      </span>
                    </div>

                    {/* Description Narrative */}
                    <div className="mt-5 space-y-3">
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {board.description}
                      </p>

                      <div className="flex items-start gap-2 text-xs text-slate-600">
                        <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Headquarters / Campus:</strong> {board.location}</span>
                      </div>
                    </div>

                    {/* Certification Levels */}
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Available Board Levels:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {board.levels.map((level, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs font-semibold"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Key Highlights Checkmarks */}
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Key Advantages:
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                        {board.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <span className="text-xs text-slate-500 font-medium">
                      Session 2026–2027 Registrations Open
                    </span>

                    <button
                      onClick={() => onOpenEnquiry && onOpenEnquiry(board.name)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 hover:text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer ml-auto"
                    >
                      <span>Enquire for {board.shortName}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Advisory / Disclaimer Strip */}
        <div className="mt-12 p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300 flex items-start gap-3.5 text-xs text-amber-950">
          <ShieldCheck className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold uppercase tracking-wider text-amber-900">
              Statutory Board Guidance & Ethical Compliance Advisory
            </h5>
            <p className="leading-relaxed">
              SAHI RAAH CONSULTANCY acts solely as an educational counseling and registration facilitation service provider for eligible learners. We strictly do <strong>NOT</strong> manufacture certificates, alter marks, guarantee examination pass percentages, or bypass statutory board assessment procedures. All examinations, assessments, practical evaluations, and certificates are conducted and awarded exclusively by the respective recognized boards (such as BBOSE, BOSSE, TNSOS, and Jamia Urdu Aligarh) as per government notifications.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
