'use client';

import React from 'react';
import { 
  CreditCard, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  MessageCircle, 
  ExternalLink, 
  GraduationCap, 
  Coins, 
  FileCheck, 
  ShieldCheck 
} from 'lucide-react';
import { getWhatsAppUrl, getBsccWhatsAppMessage } from '@/lib/utils';
import ScrollReveal from '@/components/ScrollReveal';

interface BiharStudentCreditCardProps {
  onOpenEnquiry?: (customSubject?: string) => void;
}

export default function BiharStudentCreditCard({ onOpenEnquiry }: BiharStudentCreditCardProps) {
  const whatsappUrl = getWhatsAppUrl(getBsccWhatsAppMessage());

  return (
    <section id="bscc-scheme" className="py-16 md:py-24 bg-[#03152B] relative overflow-hidden text-white border-t-2 border-amber-400/40">
      {/* Decorative Golden / Emerald Glows */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-400/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up">
          {/* Top Header Badge */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-black uppercase tracking-wider shadow-md mb-4 border border-indigo-400/50">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>GOVERNMENT OF BIHAR SCHEME</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              Bihar Student Credit Card <span className="text-amber-400">(BSCC)</span>
            </h2>

            {/* Featured Quote from Scheme */}
            <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-amber-400/30 backdrop-blur-sm">
              <p className="text-base sm:text-lg md:text-xl font-bold text-amber-300 italic leading-snug">
                &ldquo;Financial problem किसी भी student के सपनों के बीच रुकावट नहीं बननी चाहिए।&rdquo;
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-200 mt-4 leading-relaxed font-normal">
              इसी उद्देश्य से बिहार सरकार ने <strong>2 अक्टूबर 2016</strong> को <strong>Mukhyamantri Nishchay Yuva Yojana</strong> के अंतर्गत <strong>Bihar Student Credit Card (BSCC) Scheme</strong> की शुरुआत की। इस योजना का उद्देश्य 12वीं के बाद उच्च शिक्षा प्राप्त करने वाले छात्रों को आर्थिक सहायता प्रदान करना है, ताकि वे <strong>Graduation</strong>, <strong>Post-Graduation</strong> या <strong>Professional Courses</strong> में बिना किसी आर्थिक परेशानी के admission ले सकें।
            </p>
          </div>
        </ScrollReveal>

        {/* 4 Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Card 1: 4 Lakhs Assistance */}
          <ScrollReveal delay={0.1} direction="up">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/40 group-hover:scale-110 transition-transform">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  Upto ₹4,00,000 Loan
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  बिहार सरकार द्वारा उच्च शिक्षा की ट्यूशन फीस, हॉस्टल, पुस्तकें व लैपटॉप/स्टेशनरी के लिए अधिकतम 4 लाख रुपये तक की वित्तीय सहायता।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>No Third-Party Collateral</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: 12th Pass Eligibility */}
          <ScrollReveal delay={0.2} direction="up">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-teal-400/20 text-teal-300 flex items-center justify-center border border-teal-400/40 group-hover:scale-110 transition-transform">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-300 transition-colors">
                  12वीं पास छात्रों हेतु
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  BSEB बिहार बोर्ड, BBOSE, CBSE या ICSE से 12वीं उत्तीर्ण बिहार के मूल निवासी छात्र इस योजना के लिए पूर्णतः पात्र हैं।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>General, OBC, SC & ST Eligible</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Minimal Interest */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-violet-400/20 text-violet-300 flex items-center justify-center border border-violet-400/40 group-hover:scale-110 transition-transform">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors">
                  मात्र 1% - 4% ब्याज दर
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  छात्राओं, दिव्यांग व ट्रांसजेंडर छात्रों के लिए मात्र 1% साधारण ब्याज, तथा छात्रों हेतु 4% ब्याज। कोर्स समाप्ति के 1 वर्ष बाद ही पुनर्भुगतान।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Moratorium Period Included</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: 40+ Approved Courses */}
          <ScrollReveal delay={0.4} direction="up">
            <div className="h-full rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/60 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 group">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-400/20 text-emerald-300 flex items-center justify-center border border-emerald-400/40 group-hover:scale-110 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  प्रमुख पाठ्यक्रम
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  B.Tech, B.Sc Nursing, GNM, B.Pharm, D.Pharm, BPT, BMLT, B.Ed, BCA, BBA, B.Voc तथा सामान्य स्नातक डिग्रियां शामिल।
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>NAAC / State Recognized Colleges</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* SAHI RAAH DRCC & Documentation Assistance Banner */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="rounded-3xl bg-gradient-to-r from-[#082B59] via-[#0B3975] to-[#082B59] border-2 border-amber-400/60 p-6 sm:p-8 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>SAHI RAAH CONSULTANCY • Raxaul Support Desk</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                BSCC Bonafide Certificate & DRCC Registration Help
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                हम छात्रों को BSCC-स्वीकृत कॉलेजों में <strong>Admission Confirmation</strong>, <strong>College Bonafide Certificate</strong>, <strong>Fee Structure Validation</strong>, और <strong>DRCC (District Registration and Counselling Centre)</strong> ऑनलाइन फॉर्म भरने की पूरी निःशुल्क मार्गदर्शन सेवा प्रदान करते हैं।
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-shrink-0">
              <button
                onClick={() => onOpenEnquiry && onOpenEnquiry('Bihar Student Credit Card (BSCC) Guidance')}
                className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-extrabold shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for BSCC Guidance</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-extrabold shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>

              <a
                href="https://www.7nishchay-yuvaupmission.bihar.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold border border-white/20 transition-colors flex items-center justify-center gap-1.5"
                title="Official Bihar Government MNSSBY Portal"
              >
                <span>Official MNSSBY Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
