'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { initialCourses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import EligibilityModal from '@/components/EligibilityModal';
import { Course } from '@/types';
import { Building, CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function RegularEducationPage() {
  const regularCourses = initialCourses.filter((c) => c.modes.includes('Regular'));
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [eligibilityCourse, setEligibilityCourse] = useState<Course | null>(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>Campus-Based Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Regular University Admissions
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Full-time classroom learning, hands-on laboratory workshops, campus sports, hostels, and comprehensive peer immersion across recognized universities in India.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Why Choose Regular */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">Laboratory & Technical Training</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mandatory for technical degrees like B.Tech, M.Tech, BNYS, and B.Sc that require physical experiments, workshop hours, and clinical internships.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">Campus Placement & Networking</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Direct access to university placement cells, alumni networks, corporate internships, and guest lectures from industry experts.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-bold text-slate-900">Statutory Recognition</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Regular degrees from UGC-recognized universities are universally accepted for UPSC, State PSCs, banking, corporate roles, and international visas.
            </p>
          </div>
        </div>

        {/* Regular Courses Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Regular Degree Directory
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Available Regular Campus Programmes
              </h2>
            </div>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md"
            >
              Get Regular Admission Guidance
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularCourses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onCheckEligibility={(crs) => setEligibilityCourse(crs)}
                onApply={() => setEnquiryOpen(true)}
              />
            ))}
          </div>
        </div>
      </div>

      <EligibilityModal
        course={eligibilityCourse}
        onClose={() => setEligibilityCourse(null)}
        onApply={() => setEnquiryOpen(true)}
      />

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
}
