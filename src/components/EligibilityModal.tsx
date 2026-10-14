'use client';

import React, { useState, useEffect } from 'react';
import { Course } from '@/types';
import { getCourseWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils';
import { 
  X, 
  CheckCircle2, 
  AlertCircle, 
  BookOpen, 
  Clock, 
  ShieldCheck, 
  MessageCircle, 
  GraduationCap,
  Award
} from 'lucide-react';

interface EligibilityModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (course: Course) => void;
}

export default function EligibilityModal({ course, onClose, onApply }: EligibilityModalProps) {
  const [qual, setQual] = useState('');
  const [marks, setMarks] = useState('');
  const [checkResult, setCheckResult] = useState<string | null>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!course) return null;

  const handleSelfCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qual) {
      setCheckResult('Please select your qualification.');
      return;
    }
    const marksNum = parseFloat(marks);
    if (isNaN(marksNum)) {
      setCheckResult('Please enter your valid marks percentage.');
      return;
    }

    if (marksNum >= 45) {
      setCheckResult('eligible');
    } else {
      setCheckResult('counselor-needed');
    }
  };

  const whatsappUrl = getWhatsAppUrl(getCourseWhatsAppMessage(course.name));

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#082B59] text-white p-5 flex items-start justify-between border-b border-amber-400/40 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-800 text-teal-200 text-xs font-semibold uppercase tracking-wider mb-2">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{course.category} • {course.level}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold leading-tight">
              {course.name} ({course.shortName})
            </h3>
            <p className="text-xs text-amber-300 mt-1">
              Eligibility & Academic Criterion Overview
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onClose();
            }}
            className="flex-shrink-0 text-white/90 hover:text-white p-2 sm:p-2.5 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 transition-all cursor-pointer relative z-30 focus:outline-none focus:ring-2 focus:ring-amber-400 ml-3"
            aria-label="Close modal"
            title="Close (Esc)"
          >
            <X className="w-6 h-6 pointer-events-none" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                <Clock className="w-3 h-3 text-teal-600" />
                Duration
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{course.duration}</p>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-teal-600" />
                Degree Level
              </span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 mt-0.5">{course.level}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase">Available Modes</span>
              <p className="text-xs sm:text-sm font-bold text-teal-700 mt-0.5">
                {course.modes.join(', ')}
              </p>
            </div>
            {course.admissionCriteria && (
              <div className="col-span-2 sm:col-span-3 pt-2.5 mt-1 border-t border-slate-200 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-600 uppercase flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  Admission / Selection Process:
                </span>
                <span className="text-xs font-bold text-emerald-800 bg-white px-2.5 py-1 rounded-md border border-emerald-300 shadow-sm">
                  {course.admissionCriteria}
                </span>
              </div>
            )}
          </div>

          {/* Official Eligibility Requirement */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Prescribed Eligibility Criteria
            </h4>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-sm text-slate-800 leading-relaxed font-medium">
              {course.eligibility}
            </div>
          </div>

          {/* Regulatory Advisory */}
          {course.regulatoryNote && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-wider text-[11px] text-amber-800">
                  Regulatory & Verification Disclosure
                </p>
                <p className="leading-relaxed">{course.regulatoryNote}</p>
              </div>
            </div>
          )}

          {/* Interactive Quick Self-Check Form */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Quick Eligibility Verification Assistant
            </h4>
            <form onSubmit={handleSelfCheck} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Your Highest Qualification
                  </label>
                  <select
                    value={qual}
                    onChange={(e) => setQual(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                    required
                  >
                    <option value="">Select Qualification</option>
                    <option value="10th">Class 10th (Matriculation)</option>
                    <option value="12th-arts">12th Arts / Humanities</option>
                    <option value="12th-comm">12th Commerce</option>
                    <option value="12th-sci-pcm">12th Science (PCM)</option>
                    <option value="12th-sci-pcb">12th Science (PCB)</option>
                    <option value="diploma">Polytechnic / Diploma</option>
                    <option value="ug">Graduation Degree (BA/B.Sc/B.Com/BCA/BBA)</option>
                    <option value="pg">Post-Graduation Degree</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Aggregate Marks / Percentage (%)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 58"
                    min="30"
                    max="100"
                    value={marks}
                    onChange={(e) => setMarks(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-teal-600"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold rounded-lg transition-colors"
              >
                Evaluate My Eligibility
              </button>
            </form>

            {/* Check Results */}
            {checkResult === 'eligible' && (
              <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-lg text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Great news!</strong> Based on your scores, you appear prima facie eligible for <strong>{course.name}</strong>. Submit an enquiry for university matching.
                </span>
              </div>
            )}

            {checkResult === 'counselor-needed' && (
              <div className="p-3 bg-amber-100/70 border border-amber-300 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span>
                  Eligibility for this qualification may require specific category relaxations (e.g. SC/ST/OBC quotas) or open board pathways. Connect directly with our counsellor for an individual review.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              Close
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-sm transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire on WhatsApp</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onApply(course);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
          >
            <GraduationCap className="w-4 h-4 text-amber-400" />
            <span>Proceed to Admission Enquiry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
