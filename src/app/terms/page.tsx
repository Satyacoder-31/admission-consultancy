import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-800">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Service Terms
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B59]">
            Terms & Conditions
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Applicable for Academic Sessions 2026–2027 & 2027–2028
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Nature of Services</h2>
            <p>
              SAHI RAAH CONSULTANCY operates as an independent educational counselling and guidance facilitator located in Raxaul, Bihar. Our services encompass course eligibility assessment, university information dissemination, document compilation guidance, and application assistance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Institutional Independence & Final Decisions</h2>
            <p>
              Final admission determinations, cut-offs, fee adjustments, examination patterns, and syllabus updates remain the sole prerogative of the respective universities or educational boards. SAHI RAAH CONSULTANCY does not issue degrees, diplomas, or certificates.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Accurate Information by Applicants</h2>
            <p>
              Students and guardians are required to supply authentic educational credentials (marksheets, transfer certificates, photo IDs). Submission of forged, fabricated, or invalid documentation will result in immediate termination of guidance services and potential university disqualification.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. University Fee Payments</h2>
            <p>
              All formal tuition and examination fees are paid directly to the nominated bank accounts or official payment portals of the respective educational institutions. SAHI RAAH CONSULTANCY provides guidance on fee schedules but cannot alter university fee policies.
            </p>
          </section>
        </div>

        <div className="pt-6 border-t border-slate-200">
          <Link href="/" className="text-xs font-bold text-[#082B59] hover:underline">
            ← Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
