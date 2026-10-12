'use client';

import React, { useState } from 'react';
import ProcessTimeline from '@/components/ProcessTimeline';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import { Sparkles, FileCheck, CheckCircle2 } from 'lucide-react';

export default function AdmissionProcessPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Step-by-Step Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Our 5-Step Admission Process
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Understand how our counsellors evaluate your eligibility, compare institutions, prepare documentation, and support your university application.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <ProcessTimeline onOpenEnquiry={() => setEnquiryOpen(true)} />
      </div>

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
      />
    </div>
  );
}
