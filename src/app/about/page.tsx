import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/data/siteConfig';
import { formatIndianPhone } from '@/lib/utils';
import { 
  Sparkles, 
  Target, 
  Compass, 
  ShieldCheck, 
  Users, 
  MapPin, 
  Phone, 
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import AffiliatedCouncils from '@/components/AffiliatedCouncils';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | SAHI RAAH CONSULTANCY — Raxaul, Bihar',
  description: 'Guiding students towards the right academic future. Learn about SAHI RAAH CONSULTANCY, our transparent approach, and personalized admission guidance in Raxaul.'
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Page Header */}
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Educational Facilitation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Guiding Students Towards the Right Academic Future
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-4 leading-relaxed">
            SAHI RAAH CONSULTANCY helps students explore educational opportunities, understand course options, and navigate the admission process with greater clarity.
          </p>
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Branding Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl bg-white p-4 shadow-2xl border-4 border-amber-400/50 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/brand/logo.jpg"
                  alt="Official SAHI RAAH CONSULTANCY Brand Identity"
                  width={260}
                  height={260}
                  className="w-full h-full object-contain rounded-2xl"
                  priority
                />
              </div>

              <div className="mt-6 text-center">
                <h3 className="text-lg font-black text-[#082B59] uppercase tracking-wide">
                  SAHI RAAH CONSULTANCY
                </h3>
                <p className="text-xs font-bold text-amber-600 tracking-widest uppercase">
                  Your Future. Our Guidance.
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Kaurihar Chouk, Raxaul (Bihar) – 845305
                </p>
              </div>
            </div>

            {/* Narrative Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Our Foundation & Philosophy
              </h2>

              <p>
                Navigating the complex landscape of higher education can often feel daunting for students and parents. With numerous universities, diverse study modes (Regular, Distance, Online), and strict statutory regulations, obtaining clear, verified, and unbiased advice is paramount.
              </p>

              <p>
                <strong>SAHI RAAH CONSULTANCY</strong> was established to bridge this information gap. Located strategically at Kaurihar Chouk in Raxaul, Bihar, our center provides personal, accessible academic counselling to students across North Bihar, East Champaran, and the Indo-Nepal border region.
              </p>

              <p>
                Our goal is to make educational information easier to understand and help students identify suitable academic pathways based on their qualifications, interests, and career goals.
              </p>

              <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-xs sm:text-sm text-teal-900 space-y-2">
                <div className="flex items-center gap-2 font-bold text-teal-800">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Our Ethical Guidance Commitment</span>
                </div>
                <p>
                  We believe in 100% transparency. We verify course eligibility, statutory recognition (UGC, AICTE, Ayush, etc.), and study mode rules before recommending an institution. We never fabricate placement guarantees, rankings, or pass rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Approach Cards */}
      <section className="py-16 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#082B59] text-amber-300 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                To empower every student with accurate, reliable, and verified academic guidance. We strive to demystify college admissions so that every applicant can make informed educational decisions without falling prey to misleading claims or unverified credentials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-700 text-white flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Our Approach</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We combine personalized discovery interviews, qualification verification, transparent institution comparisons, structured document preparation, and steady follow-up throughout the university enrollment cycle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recognized Councils & Collaborations (AICPMF & BAYC) */}
      <AffiliatedCouncils />

      {/* Why Students Seek Our Guidance */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Students Seek Our Guidance
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Four fundamental pillars that define our service standard in Raxaul.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                01
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Personalized Course Counselling
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                One-on-one evaluations matched to your marks, subject preferences, and long-term career aspirations.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#082B59] text-white flex items-center justify-center font-bold">
                02
              </div>
              <h4 className="text-base font-bold text-slate-900">
                University & Programme Information
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unbiased, accurate details regarding university enactments, fee structures, and study modes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold">
                03
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Admission Documentation Assistance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete checklist assistance for marksheets, migration certificates, category concessions, and forms.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                04
              </div>
              <h4 className="text-base font-bold text-slate-900">
                Support Throughout Application
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Continuous guidance until official university enrollment numbers and fee receipts are received.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-14 p-8 rounded-3xl bg-[#082B59] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold">Ready to Discuss Your Academic Path?</h3>
              <p className="text-xs text-slate-200 mt-1">
                Admissions guidance is open for Sessions 2026–2027 & 2027–2028.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${siteConfig.phone}`}
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 text-xs font-bold hover:bg-slate-100 transition-colors"
              >
                Call: {formatIndianPhone(siteConfig.phone)}
              </a>
              <Link
                href="/enquiry"
                className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md"
              >
                Start Online Enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
