'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';
import { getStoredCourses, getStoredUniversities } from '@/lib/storage';
import { getCourseWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils';
import EligibilityModal from '@/components/EligibilityModal';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import UniversityCard from '@/components/UniversityCard';
import { Course, University } from '@/types';
import { 
  GraduationCap, 
  Clock, 
  BookOpen, 
  CheckCircle2, 
  Briefcase, 
  ShieldCheck, 
  MessageCircle, 
  ArrowLeft, 
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';

function CourseDetailContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [universities, setUniversities] = useState<University[]>(initialUniversities);

  useEffect(() => {
    setCourses(getStoredCourses());
    setUniversities(getStoredUniversities());
    const handleSync = () => {
      setCourses(getStoredCourses());
      setUniversities(getStoredUniversities());
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('sr_data_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('sr_data_updated', handleSync);
    };
  }, []);

  const course = courses.find((c) => c.slug === slug);

  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

  if (!course) {
    return notFound();
  }

  // Find universities offering this course
  const offeringUniversities = universities.filter((u) =>
    u.availableCourseIds?.includes(course.id)
  );

  const whatsappUrl = getWhatsAppUrl(getCourseWhatsAppMessage(course.name));

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-amber-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Courses</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-800 text-teal-200 text-xs font-bold uppercase tracking-wider">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black">
                  {course.shortName}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 text-xs font-medium">
                  Level: {course.level}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
                {course.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-black shadow-lg transition-transform active:scale-95"
                >
                  Apply for Admission Guidance
                </button>

                <button
                  onClick={() => setEligibilityOpen(true)}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-colors"
                >
                  Verify My Eligibility
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Ask on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Quick Specs Box */}
            <div className="lg:col-span-4 bg-[#051D3C] border border-amber-400/40 rounded-3xl p-6 shadow-xl space-y-4 text-xs">
              <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider border-b border-white/10 pb-2">
                Programme Snapshot
              </h3>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Duration:</span>
                <span className="font-bold text-white">{course.duration}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Degree Level:</span>
                <span className="font-bold text-teal-300">{course.level}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Available Modes:</span>
                <span className="font-bold text-amber-300">{course.modes.join(', ')}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">Approx. Fee Range:</span>
                <span className="font-bold text-slate-200">{course.approxFeePerYear || 'Variable by institution'}</span>
              </div>

              {course.admissionCriteria && (
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-slate-400">Admission Process:</span>
                  <span className="font-bold text-emerald-300">{course.admissionCriteria}</span>
                </div>
              )}

              <div className="flex justify-between py-1">
                <span className="text-slate-400">Admission Session:</span>
                <span className="font-bold text-emerald-400">2026–2027 (Open)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Details Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Official Course Poster / Banner Display */}
        {course.image && (
          <div className="bg-white p-4 sm:p-6 rounded-3xl border-2 border-amber-300/80 shadow-lg flex flex-col md:flex-row items-center gap-6 overflow-hidden">
            <div className="relative w-full md:w-1/2 aspect-[16/9] sm:aspect-[16/10] max-h-80 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-md">
              <Image
                src={course.image}
                alt={`${course.name} Official Overview`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-3 md:w-1/2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block">
                Official Programme Profile
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {course.name}
              </h2>
              {course.tagline && (
                <p className="text-sm font-semibold text-teal-800 italic">
                  &ldquo;{course.tagline}&rdquo;
                </p>
              )}
              <p className="text-xs text-slate-600 leading-relaxed">
                Admissions guidance and bonafide documentation assistance available for Sessions 2026–2027 & 2027–2028 across our accredited partner universities.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setEnquiryOpen(true)}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Apply for this Course
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Eligibility & Regulatory Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-[#082B59] font-bold text-base">
              <CheckCircle2 className="w-5 h-5 text-teal-600" />
              <h3>Prescribed Eligibility Overview</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
              {course.eligibility}
            </p>
            {course.admissionCriteria && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900">Admission Selection Mode:</span>
                <span className="text-xs font-extrabold text-emerald-800 bg-white px-2.5 py-1 rounded border border-emerald-300 shadow-sm">
                  {course.admissionCriteria}
                </span>
              </div>
            )}
            <p className="text-[11px] text-slate-500 italic">
              Note: Minimum percentage requirements may vary for reserved categories (SC/ST/OBC) as per statutory guidelines.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <h3>Regulatory Advisory & Approvals</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-4 rounded-xl border border-amber-200">
              {course.regulatoryNote || 'Offered through statutory UGC-enacted universities. Students must confirm university approval for the relevant academic session.'}
            </p>
            <p className="text-[11px] text-slate-500 italic">
              SAHI RAAH explicitly verifies all professional council compliances (AICTE, NCTE, Ayush, UGC-DEB) prior to application.
            </p>
          </div>
        </div>

        {/* Syllabus / Subjects & Career Prospects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <BookOpen className="w-5 h-5 text-teal-600" />
              <h3>Key Subjects & Core Curriculum</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {course.keySubjects.map((sub, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-900 text-xs font-semibold border border-teal-200"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-base">
              <Briefcase className="w-5 h-5 text-[#082B59]" />
              <h3>Career & Employment Prospects</h3>
            </div>
            <div className="space-y-2">
              {course.careerProspects.map((cp, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                  <span>{cp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Universities Offering this Course */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Directory Cross-Match
              </span>
              <h2 className="text-2xl font-bold text-slate-900">
                Institutions Offering {course.shortName}
              </h2>
            </div>
            <Link
              href="/universities"
              className="text-xs font-bold text-[#082B59] hover:underline"
            >
              View all universities
            </Link>
          </div>

          {offeringUniversities.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center">
              <p className="text-xs text-slate-500">
                Institutional availability varies by active intake and recognition status for the session. Please contact our counsellors for real-time university allocation.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {offeringUniversities.map((uni) => (
                <UniversityCard
                  key={uni.id}
                  university={uni}
                  onApply={(u) => {
                    setSelectedUni(u);
                    setEnquiryOpen(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <EligibilityModal
        course={course}
        onClose={() => setEligibilityOpen(false)}
        onApply={() => setEnquiryOpen(true)}
      />

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCourse={course}
        initialUniversity={selectedUni}
      />
    </div>
  );
}

export default function CourseDetailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC] py-20 text-center text-slate-500 font-semibold">Loading course details...</div>}>
      <CourseDetailContent />
    </Suspense>
  );
}
