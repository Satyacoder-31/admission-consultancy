'use client';

import React, { useState } from 'react';
import { 
  Target, 
  Compass, 
  Scale, 
  FileCheck, 
  CheckCheck, 
  Sparkles, 
  GraduationCap, 
  ShieldCheck,
  Check
} from 'lucide-react';

interface ProcessTimelineProps {
  onOpenEnquiry: () => void;
}

export default function ProcessTimeline({ onOpenEnquiry }: ProcessTimelineProps) {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      number: 1,
      title: 'Tell Us Your Goals',
      icon: Target,
      tag: 'Initial Discovery',
      summary: 'Share your background, educational stream, career aspirations, and financial preferences.',
      details: [
        'Detailed one-on-one consultation with our Raxaul counselling team',
        'Evaluation of previous marksheets (10th, 12th, or Bachelor degree)',
        'Budget and preferred mode alignment (Regular, Distance, or Online)'
      ]
    },
    {
      number: 2,
      title: 'Explore Suitable Courses',
      icon: Compass,
      tag: 'Course Matching',
      summary: 'Discover courses matched accurately against your academic stream and eligibility.',
      details: [
        'Clear differentiation between professional, technical, and general streams',
        'Transparent explanation of course duration, semester patterns, and syllabus',
        'Review of future career, competitive exams, or higher degree pathways'
      ]
    },
    {
      number: 3,
      title: 'Compare Universities',
      icon: Scale,
      tag: 'Institutional Review',
      summary: 'Evaluate prospective universities based on legal recognition, fee structure, and mode of delivery.',
      details: [
        'Verification of university statutory enactment and UGC status',
        'Transparent tuition fees, exam fees, and hostel breakdown',
        'Real insights into examination centres, student portal, and faculty support'
      ]
    },
    {
      number: 4,
      title: 'Prepare Your Application',
      icon: FileCheck,
      tag: 'Documentation Desk',
      summary: 'Compile the mandatory document bundle required for university enrolment.',
      details: [
        'Document verification (10th/12th marksheets, passing certificates, Aadhaar)',
        'Assistance with transfer certificate (TC) and migration certificates',
        'Application form filling and official university portal registration'
      ]
    },
    {
      number: 5,
      title: 'Application Follow-Up',
      icon: CheckCheck,
      tag: 'Enrollment & Confirmation',
      summary: 'Monitor your application status through official admission confirmation and enrolment number issuance.',
      details: [
        'Official admission receipt and university acknowledgement receipt',
        'Enrolment / Registration number tracking and student ID card assistance',
        'Ongoing guidance for semester exam schedules and syllabus material'
      ]
    }
  ];

  const documentChecklist = [
    'Class 10th Marksheet & Passing Certificate',
    'Class 12th Marksheet & Certificate (for UG / Diploma)',
    "Graduation Marksheets & Degree (for PG / PGDCA / B.Lib)",
    'Government Photo ID Proof (Aadhaar Card / Voter ID)',
    'Recent Passport-Sized Photographs (Colour)',
    'Transfer Certificate (TC) & Migration Certificate',
    'Category / Caste Certificate (if seeking quota fee relaxation)'
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Structured 5-Step Admission Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SAHI RAAH Guides Your Academic Journey
          </h2>
          <p className="text-slate-600 text-sm md:text-base mt-3 leading-relaxed">
            From initial counselling at our Raxaul office to university enrolment, experience a clear, transparent, and step-by-step guidance process.
          </p>
        </div>

        {/* 5-Step Timeline Selector (Horizontal on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {steps.map((s) => {
            const Icon = s.icon;
            const isCurrent = activeStep === s.number;
            return (
              <button
                key={s.number}
                onClick={() => setActiveStep(s.number)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#082B59] text-white border-amber-400 shadow-lg scale-102 ring-2 ring-amber-400/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center ${
                      isCurrent ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    0{s.number}
                  </span>
                  <Icon className={`w-4 h-4 ${isCurrent ? 'text-teal-300' : 'text-slate-400'}`} />
                </div>
                <h4 className="text-xs font-bold line-clamp-1">{s.title}</h4>
                <p className={`text-[10px] mt-0.5 ${isCurrent ? 'text-amber-300' : 'text-slate-500'}`}>
                  {s.tag}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Showcase Card */}
        {(() => {
          const current = steps.find((s) => s.number === activeStep) || steps[0];
          const CurrentIcon = current.icon;
          return (
            <div className="bg-gradient-to-br from-slate-50 to-teal-50/20 rounded-3xl border-2 border-slate-200 p-6 md:p-10 shadow-sm mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#082B59] text-amber-300 flex items-center justify-center shadow-md">
                      <CurrentIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                        Step 0{current.number}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900">
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                    {current.summary}
                  </p>

                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Key Highlights of this stage:
                    </p>
                    {current.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Document Checklist Box */}
                <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 border-b pb-3">
                    <FileCheck className="w-5 h-5 text-teal-600" />
                    <h4 className="text-sm font-bold">Standard Document Checklist</h4>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {documentChecklist.slice(0, 5).map((doc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 flex-shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500 italic">Self-attested copies needed</span>
                    <button
                      onClick={onOpenEnquiry}
                      className="text-xs font-bold text-[#082B59] hover:text-teal-700 underline"
                    >
                      Get Checklist Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Legal Disclaimer Box & Persistent CTA */}
        <div className="bg-[#051D3C] text-white p-6 md:p-8 rounded-3xl border border-amber-400/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Institutional Independence Statement</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              Final admission decisions, entrance cut-offs, eligibility confirmation, and degree awards are made exclusively by the respective university or education board. SAHI RAAH CONSULTANCY acts strictly as an educational guidance and application facilitator.
            </p>
          </div>

          <button
            onClick={onOpenEnquiry}
            className="flex-shrink-0 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-black text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-amber-600 shadow-xl shadow-amber-400/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <GraduationCap className="w-5 h-5 text-slate-900" />
            <span>Start Your Enquiry Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}
