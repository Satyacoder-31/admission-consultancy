'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { University } from '@/types';
import { getUniversityWhatsAppMessage, getWhatsAppUrl } from '@/lib/utils';
import { 
  MapPin, 
  ShieldAlert, 
  MessageCircle, 
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface UniversityCardProps {
  university: University;
  onApply: (university: University) => void;
}

export default function UniversityCard({ university, onApply }: UniversityCardProps) {
  const whatsappUrl = getWhatsAppUrl(getUniversityWhatsAppMessage(university.name));

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1">
      {/* Top Banner / Logo Area */}
      <div className="p-5 pb-3">
        {/* Verification Status Pill */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-300">
            <ShieldAlert className="w-3 h-3 text-amber-600" />
            <span>{university.verificationStatus}</span>
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            {university.type}
          </span>
        </div>

        {/* Logo Tile */}
        <div className="relative w-full h-28 bg-slate-50 rounded-xl border border-slate-100 p-2 flex items-center justify-center overflow-hidden mb-3 group-hover:bg-teal-50/30 transition-colors">
          <Image
            src={university.logo}
            alt={`${university.name} Official Logo Card`}
            width={240}
            height={110}
            className="w-full h-full object-contain filter group-hover:contrast-105 transition-all"
            onError={(e) => {
              // fallback if cropped image has an issue
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* University Name */}
        <Link href={`/universities/${university.slug}`}>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1355A5] transition-colors leading-snug line-clamp-2">
            {university.name}
          </h3>
        </Link>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1.5">
          <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
          <span className="font-medium text-slate-700">{university.location}, {university.state}</span>
        </div>

        <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
          {university.summary}
        </p>
      </div>

      {/* Middle Accreditation & Modes Info */}
      <div className="px-5 py-3 border-y border-slate-100 bg-slate-50/70 space-y-2 text-xs">
        <div className="flex items-start gap-1.5 text-[11px] text-slate-600">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <span className="line-clamp-2 leading-tight text-slate-600">
            {university.accreditationNote}
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] font-medium text-slate-500">Study Modes:</span>
          <div className="flex flex-wrap gap-1">
            {university.modesOffered.map((mode) => (
              <span
                key={mode}
                className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-white text-slate-700 border border-slate-200"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-4 bg-white flex flex-col gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Link
            href={`/universities/${university.slug}`}
            className="w-full inline-flex items-center justify-center gap-1 py-2 px-2.5 rounded-lg text-xs font-semibold text-[#082B59] bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>View Courses</span>
          </Link>

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
          onClick={() => onApply(university)}
          className="w-full inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm transition-all"
        >
          <span>Request Admission Guidance</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
