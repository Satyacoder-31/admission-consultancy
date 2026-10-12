'use client';

import React from 'react';
import { Course } from '@/types';
import { getCourseWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils';
import { 
  GraduationCap, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

interface CourseCardProps {
  course: Course;
  onCheckEligibility: (course: Course) => void;
  onApply: (course: Course) => void;
}

export default function CourseCard({ course, onCheckEligibility, onApply }: CourseCardProps) {
  const whatsappUrl = getWhatsAppUrl(getCourseWhatsAppMessage(course.name));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      {/* Top Header Strip */}
      <div className="p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
            {course.category}
          </span>
          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-[#082B59] text-amber-300 shadow-sm">
            {course.shortName}
          </span>
        </div>

        <Link href={`/courses/${course.slug}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1355A5] transition-colors leading-snug line-clamp-2">
            {course.name}
          </h3>
        </Link>

        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
          {course.description}
        </p>
      </div>

      {/* Middle Specs */}
      <div className="px-5 py-3 border-y border-slate-100 bg-slate-50/70 space-y-2 text-xs">
        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-1.5 font-medium text-[11px] text-slate-500">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            Duration:
          </span>
          <span className="font-semibold text-slate-800">{course.duration}</span>
        </div>

        <div className="flex items-center justify-between text-slate-600">
          <span className="flex items-center gap-1.5 font-medium text-[11px] text-slate-500">
            <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
            Qualification:
          </span>
          <span className="font-semibold text-slate-800">{course.level}</span>
        </div>

        {/* Study Modes Pill List */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-medium text-slate-500">Study Modes:</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {course.modes.map((mode) => (
              <span
                key={mode}
                className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-slate-700 border border-slate-200"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        {course.regulatoryNote && (
          <div className="mt-2 pt-2 border-t border-slate-200/80 flex items-start gap-1.5 text-[10px] text-amber-800">
            <ShieldAlert className="w-3 h-3 text-amber-600 flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{course.regulatoryNote}</span>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="p-4 bg-white flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onCheckEligibility(course)}
            className="w-full inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-xs font-semibold text-[#082B59] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Check Eligibility</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-xs font-semibold text-white bg-[#25D366] hover:bg-[#20ba59] transition-transform active:scale-95 shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        <button
          onClick={() => onApply(course)}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all"
        >
          <span>Get Admission Guidance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
