'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialCourses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import EligibilityModal from '@/components/EligibilityModal';
import { Course } from '@/types';
import { FileCheck2, ShieldAlert, CheckCircle2, AlertCircle } from 'lucide-react';
import RecognizedBoards from '@/components/RecognizedBoards';

export default function SchoolGuidancePage() {
  const schoolCourses = initialCourses.filter((c) => c.category === 'School-Level Education');
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [eligibilityCourse, setEligibilityCourse] = useState<Course | null>(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold mb-3">
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Class 10th & 12th Board Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            School-Level Board Guidance
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Academic counselling, stream selection, and examination registration assistance for Class 10th (Secondary) and Class 12th (Senior Secondary) through recognized open schooling boards.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Mandatory Transparency Notice */}
        <div className="bg-amber-50 rounded-3xl border-2 border-amber-300 p-6 sm:p-8 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <h3>Statutory Notice on Board Guidance</h3>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
            SAHI RAAH CONSULTANCY acts strictly as an educational guidance facilitator. We do NOT issue certificates, fabricate marksheets, guarantee examination results, or bypass official board procedures. All examinations, assessments, practicals, and certifications are conducted and awarded exclusively by recognized educational boards (such as NIOS and State Open Boards).
          </p>
        </div>

        {/* Board Guidance Tracks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                Secondary Level
              </span>
              <span className="text-xs font-semibold text-slate-500">Age: 14+ Years</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Class 10th Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Designed for candidates who could not complete schooling, dropped out due to financial or personal challenges, or wish to resume education.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Subject choice guidance: Hindi, English, Math, Science, Social Science</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>TMA (Tutor Marked Assignments) submission support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Admit card and examination centre assistance</span>
              </div>
            </div>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold transition-colors"
            >
              Get Class 10th Guidance
            </button>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                Senior Secondary Level
              </span>
              <span className="text-xs font-semibold text-slate-500">Eligibility: 10th Pass</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Class 12th Guidance</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Stream selection across Science (PCM/PCB), Commerce, and Arts. Essential qualification for university degrees, polytechnics, and competitive recruitments.
            </p>
            <div className="space-y-2 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Stream matching according to your future college goals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Credit transfer (TOC) guidance for candidates with previous failed board subjects</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Practical file preparation and examination date-sheet notifications</span>
              </div>
            </div>
            <button
              onClick={() => setEnquiryOpen(true)}
              className="w-full py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold transition-colors"
            >
              Get Class 12th Guidance
            </button>
          </div>
        </div>

        {/* 4 Recognized Boards Showcase */}
        <RecognizedBoards onOpenEnquiry={() => setEnquiryOpen(true)} showTitle={true} />

        {/* Credit Transfer (TOC) & Failed Students Special Counseling */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#082B59] rounded-3xl p-8 sm:p-10 text-white space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider inline-block">
                Special Admission Category
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Failed or Incomplete in Other Boards?
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                If you appeared in CBSE, ICSE, BSEB, UP Board, or any State Board and could not clear 1 or 2 subjects, you can save your academic year through <strong>Transfer of Credit (TOC)</strong> in recognized Open Boards (such as BBOSE, BOSSE, or TNSOS). Passed subject marks can be credited directly so you only re-appear for remaining subjects.
              </p>
            </div>

            <button
              onClick={() => setEnquiryOpen(true)}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-transform shadow-lg whitespace-nowrap active:scale-95"
            >
              Consult for TOC / Re-Admission
            </button>
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
