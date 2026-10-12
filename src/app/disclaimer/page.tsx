import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function DisclaimerPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-slate-800">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider block mb-1">
            Statutory Transparency & Ethics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#082B59]">
            Regulatory Disclaimer & Transparency Notice
          </h1>
          <p className="text-xs text-slate-500 mt-2">
            Applicable for SAHI RAAH CONSULTANCY • Raxaul, Bihar, India
          </p>
        </div>

        {/* Prominent High-Level Notice */}
        <div className="p-6 bg-amber-50 rounded-2xl border-2 border-amber-300 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-black text-sm uppercase tracking-wide">
            <ShieldAlert className="w-5 h-5 text-amber-600" />
            <span>Core Ethical Statement</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-semibold">
            SAHI RAAH CONSULTANCY categorically does NOT guarantee admissions, degrees, job placements, government recruitments, or examination passes. All admissions are processed through lawful institutional frameworks, subject strictly to the statutory enactment and approval of the respective university.
          </p>
        </div>

        <div className="space-y-6 text-sm leading-relaxed text-slate-700">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">1. Role as an Educational Guidance Agency</h2>
            <p>
              SAHI RAAH CONSULTANCY operates as an independent educational consultancy that helps candidates discover educational choices, evaluate minimum eligibility, understand fee structures, and navigate the application process. We are NOT a university, autonomous degree-granting college, or examination board.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">2. Statutory Verification Requirements</h2>
            <p>
              Before publishing or counselling prospective applicants regarding any university:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
              <li>
                <strong>State Private Universities:</strong> We verify the university’s establishment under the respective State Legislative Act and UGC Section 2(f) notification.
              </li>
              <li>
                <strong>Technical Degrees (B.Tech / M.Tech / Diploma):</strong> Technical courses require AICTE / university statutory compliance. We explicitly alert candidates against fraudulent distance-engineering programmes.
              </li>
              <li>
                <strong>Naturopathy & Medical (BNYS / DNYS):</strong> BNYS is a full-time clinical medical qualification regulated under State/National Ayush frameworks. Degrees cannot be completed via distance learning.
              </li>
              <li>
                <strong>Doctoral Programmes (PhD):</strong> UGC regulations mandate regular coursework and active faculty supervision. PhD via distance mode is unlawful under UGC regulations.
              </li>
              <li>
                <strong>Open Schooling & Boards (10th / 12th):</strong> Guidance is provided only for recognized boards (e.g. NIOS / State Open Boards). We do not conduct examinations, issue certificates, or guarantee pass percentages.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">3. Verification Status Labels</h2>
            <p>
              On our website, universities and programmes labelled with <em>&quot;Verification Required&quot;</em> indicate that students must verify current session regulatory approvals, territorial jurisdiction, and specific course clearances with our counsellors prior to initiating payments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900">4. Institutional Discretion & Rule Changes</h2>
            <p>
              Universities and government regulatory bodies reserve the right to revise syllabi, modify fee schedules, alter examination dates, or amend eligibility thresholds without prior notice to consultancies. SAHI RAAH CONSULTANCY is not liable for statutory policy changes instituted by government regulators.
            </p>
          </section>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
          <p>
            For questions regarding regulatory notifications, please visit our counseling center at <strong>{siteConfig.address}</strong> or contact <strong>{siteConfig.phone}</strong>.
          </p>
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
