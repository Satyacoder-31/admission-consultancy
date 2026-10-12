'use client';

import React, { useState, Suspense } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { initialUniversities } from '@/data/universities';
import { initialCourses } from '@/data/courses';
import { getUniversityWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils';
import CourseCard from '@/components/CourseCard';
import EligibilityModal from '@/components/EligibilityModal';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import { Course, University } from '@/types';
import { 
  Building2, 
  MapPin, 
  ShieldAlert, 
  MessageCircle, 
  ArrowLeft, 
  GraduationCap, 
  Calendar,
  CheckCircle2,
  BookOpen
} from 'lucide-react';

function UniversityDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const university = initialUniversities.find((u) => u.slug === slug);

  const [eligibilityCourse, setEligibilityCourse] = useState<Course | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  if (!university) {
    return notFound();
  }

  // Find courses offered by this university
  const offeredCourses = initialCourses.filter((c) =>
    university.availableCourseIds.includes(c.id)
  );

  const whatsappUrl = getWhatsAppUrl(getUniversityWhatsAppMessage(university.name));

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/universities"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Universities</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold">
                  {university.verificationStatus}
                </span>
                <span className="px-3 py-1 rounded-full bg-teal-800 text-teal-200 text-xs font-medium">
                  {university.type}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium">
                  Est. {university.established || 'Established'}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {university.name}
              </h1>

              <div className="flex items-center gap-2 text-sm text-amber-300 font-semibold">
                <MapPin className="w-4 h-4 text-teal-400" />
                <span>{university.location}, {university.state}</span>
              </div>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                {university.summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-black shadow-lg transition-transform active:scale-95"
                >
                  Request University Admission Guidance
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Logo Frame */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-2xl border-4 border-amber-400/50 flex flex-col items-center justify-center">
              <div className="relative w-full h-36 bg-slate-50 rounded-2xl p-3 flex items-center justify-center overflow-hidden border border-slate-200 mb-3">
                <Image
                  src={university.logo}
                  alt={`${university.name} Official Logo`}
                  width={280}
                  height={130}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-xs font-bold text-slate-900 text-center">{university.shortName}</p>
              <p className="text-[11px] text-slate-500 text-center mt-1">{university.address}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Accreditation & Regulatory Disclosure */}
        <div className="bg-amber-50 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3>Institutional Regulatory Status & Guidelines</h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            {university.accreditationNote}
          </p>
          <p className="text-[11px] text-amber-800 italic">
            SAHI RAAH CONSULTANCY verifies that all degree programs, examination centres, and study modes comply with statutory council requirements for the current academic session.
          </p>
        </div>

        {/* Campus Facilities & Features */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
            <Building2 className="w-5 h-5 text-[#082B59]" />
            <h3>Campus Environment & Infrastructure</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {university.campusFeatures.map((feat, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-slate-800">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Programmes */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Academic Offerings
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Courses Available via {university.shortName}
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {offeredCourses.length} Programmes Listed
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {offeredCourses.map((c) => (
              <CourseCard
                key={c.id}
                course={c}
                onCheckEligibility={(crs) => setEligibilityCourse(crs)}
                onApply={(crs) => {
                  setSelectedCourse(crs);
                  setEnquiryOpen(true);
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EligibilityModal
        course={eligibilityCourse}
        onClose={() => setEligibilityCourse(null)}
        onApply={(c) => {
          setSelectedCourse(c);
          setEnquiryOpen(true);
        }}
      />

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCourse={selectedCourse}
        initialUniversity={university}
      />
    </div>
  );
}

export default function UniversityDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] py-20 text-center text-slate-500 font-semibold">Loading university details...</div>}>
      <UniversityDetailContent />
    </Suspense>
  );
}
