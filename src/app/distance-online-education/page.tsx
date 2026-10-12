'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialCourses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import EligibilityModal from '@/components/EligibilityModal';
import { Course } from '@/types';
import { Laptop, CheckCircle2, ShieldAlert, Sparkles, BookOpen } from 'lucide-react';

export default function DistanceOnlineEducationPage() {
  const distanceCourses = initialCourses.filter(
    (c) => c.modes.includes('Distance') || c.modes.includes('Online')
  );

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [eligibilityCourse, setEligibilityCourse] = useState<Course | null>(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800 text-teal-200 text-xs font-semibold mb-3">
            <Laptop className="w-3.5 h-3.5" />
            <span>UGC-DEB Compliant Learning</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Distance & Online Education
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Flexible, high-quality degree completion designed for working professionals, remote learners, and students seeking self-paced education.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Compliance Alert */}
        <div className="bg-amber-50 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3>Important Distance & Online Degree Regulations</h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            Degrees awarded through Distance and Online mode from UGC-DEB recognized universities hold equal legal validity as regular degrees for central and state government jobs, civil services, and higher education. However, technical engineering (B.Tech), clinical medical (BNYS/MBBS), and PhD programs CANNOT be pursued via distance mode as per statutory law.
          </p>
        </div>

        {/* Suitable courses */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Approved Distance & Online Offerings
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Eligible Degrees for Working Adults
              </h2>
            </div>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md"
            >
              Consult a Counsellor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distanceCourses.map((c) => (
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
