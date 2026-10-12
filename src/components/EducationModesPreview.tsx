'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Building, 
  Laptop, 
  FileCheck2, 
  ArrowRight, 
  CheckCircle2, 
  ShieldAlert 
} from 'lucide-react';

interface EducationModesPreviewProps {
  onOpenEnquiry: () => void;
}

export default function EducationModesPreview({ onOpenEnquiry }: EducationModesPreviewProps) {
  const modes = [
    {
      id: 'regular',
      title: 'Regular Universities',
      subtitle: 'Full-Time On-Campus Experience',
      badge: 'Campus Learning',
      badgeColor: 'bg-blue-100 text-[#082B59] border-blue-200',
      description:
        'Ideal for students seeking comprehensive campus life, daily lecture attendance, laboratory experimentation, university clubs, and direct faculty mentorship across B.Tech, BNYS, B.Sc, BBA, and MBA.',
      highlights: [
        'Recognized campus-based universities',
        'State-of-the-art laboratory & workshop sessions',
        'Hostel, library, and sports infrastructure',
        'Regular degree awarding as per UGC statutory guidelines'
      ],
      href: '/regular-education',
      buttonText: 'Explore Regular Admissions',
      cardBorder: 'hover:border-blue-500'
    },
    {
      id: 'distance-online',
      title: 'Distance & Online Education',
      subtitle: 'Flexible Degrees for Working Adults',
      badge: 'UGC-DEB Flexible Mode',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
      description:
        'Designed specifically for working professionals, defense candidates, and remote learners needing high-quality degree completion without relocating or sacrificing current employment.',
      highlights: [
        'UGC-DEB compliant programmes (BA, B.Com, BCA, MBA, MA)',
        'Recorded digital lectures & weekend virtual counselling',
        'Digital study material and flexible exam sessions',
        'Equal legal academic recognition for eligible programmes'
      ],
      href: '/distance-online-education',
      buttonText: 'Explore Distance & Online',
      cardBorder: 'hover:border-teal-500'
    },
    {
      id: 'boards',
      title: 'Online & Offline Boards',
      subtitle: 'Class 10th & 12th Academic Guidance',
      badge: 'Secondary & Senior Secondary',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      description:
        'Guidance for candidates who experienced school gaps, failed prior board attempts, or require flexible board certification through recognized open schooling boards (NIOS / State Boards).',
      highlights: [
        'Registration guidance for Class 10th & 12th',
        'Science, Commerce, and Arts subject streams',
        'Syllabus planning, practical record guidance & admit cards',
        'Strict statutory compliance: Valid for government & higher studies'
      ],
      disclaimer:
        'SAHI RAAH provides procedural guidance and does not issue certificates or bypass examinations.',
      href: '/school-guidance',
      buttonText: 'Explore Board Guidance',
      cardBorder: 'hover:border-amber-500'
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span>Flexible Academic Pathways</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tailored Education Modes for Every Learner
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            Whether you want traditional full-time college life, flexible online distance learning, or school-level board completion, SAHI RAAH CONSULTANCY guides you through verified statutory channels.
          </p>
        </div>

        {/* 3 Distinctive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modes.map((mode) => (
            <div
              key={mode.id}
              className={`bg-white rounded-2xl border-2 border-slate-200/80 p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${mode.cardBorder}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${mode.badgeColor}`}>
                    {mode.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#082B59]">
                    {mode.id === 'regular' && <Building className="w-5 h-5 text-[#082B59]" />}
                    {mode.id === 'distance-online' && <Laptop className="w-5 h-5 text-teal-600" />}
                    {mode.id === 'boards' && <FileCheck2 className="w-5 h-5 text-amber-600" />}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900">{mode.title}</h3>
                <p className="text-xs font-semibold text-teal-700 mt-0.5 mb-3">{mode.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{mode.description}</p>

                <div className="space-y-2.5 mb-6">
                  {mode.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="leading-tight">{h}</span>
                    </div>
                  ))}
                </div>

                {mode.disclaimer && (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2 mb-6">
                    <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-tight">{mode.disclaimer}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                <Link
                  href={mode.href}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-[#082B59] bg-slate-100 hover:bg-[#082B59] hover:text-white transition-all shadow-sm"
                >
                  <span>{mode.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={onOpenEnquiry}
                  className="w-full py-2 text-[11px] font-semibold text-slate-500 hover:text-teal-700 transition-colors"
                >
                  Request Mode Counselling
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
