import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-800">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block mb-1">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B59]">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Last Updated: Academic Session 2026–2027 • SAHI RAAH CONSULTANCY
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Information We Collect</h2>
            <p>
              When you submit an admission inquiry on the SAHI RAAH CONSULTANCY website or consult with our counsellors in Raxaul, we collect personal contact information including your full name, telephone number, WhatsApp number, email address, city/state, current educational qualifications, and course preferences.
            </p>
            <p className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-xs">
              <strong>Data Minimization Notice:</strong> We do NOT collect sensitive financial credentials, government passwords, or unnecessary personal documents through our website inquiry forms.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. How We Use Your Information</h2>
            <p>
              Your information is used strictly to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Evaluate your academic eligibility for desired courses and universities.</li>
              <li>Provide verified university fee structures, recognition details, and admission notifications.</li>
              <li>Facilitate telephone, WhatsApp, or in-person counselling at our Raxaul office.</li>
              <li>Assist with document preparation and university application submission.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Non-Disclosure & Data Protection</h2>
            <p>
              We value your privacy. SAHI RAAH CONSULTANCY does not sell, lease, or monetize student lead lists to third-party telemarketers or unauthorized agencies. Information is shared only with official university admissions departments when you explicitly proceed with an application.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Your Rights & Contact</h2>
            <p>
              You have the right to request modification or deletion of your contact details from our records at any time. For privacy inquiries, please contact:
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <p><strong>Business Name:</strong> {siteConfig.businessName}</p>
              <p><strong>Address:</strong> {siteConfig.address}</p>
              <p><strong>Email:</strong> {siteConfig.email}</p>
              <p><strong>Helpline:</strong> {siteConfig.phone}</p>
            </div>
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
