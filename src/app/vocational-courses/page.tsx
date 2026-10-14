'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';
import CourseCard from '@/components/CourseCard';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import EligibilityModal from '@/components/EligibilityModal';
import { Course, University } from '@/types';
import { 
  Sparkles, 
  Award, 
  Briefcase, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Clock, 
  HelpCircle, 
  ChevronDown,
  Building2,
  Cpu,
  Palette,
  Compass,
  Film,
  Building,
  Flame,
  PhoneCall
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

export default function VocationalCoursesPage() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedCourseForEnquiry, setSelectedCourseForEnquiry] = useState<Course | null>(null);
  const [eligibilityCourse, setEligibilityCourse] = useState<Course | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Vocational & Skill Aligned Courses
  const vocationalCourses = initialCourses.filter(
    (c) => c.category === 'Vocational & Skill Development' || c.level === 'Vocational' || c.id === 'c-bsc-animation' || c.id === 'c-bhm-hotel-mgmt' || c.id === 'c-fire-safety'
  );

  // Universities offering Vocational Programs
  const vocationalUniversities = initialUniversities.filter((u) =>
    u.availableCourseIds.some((cid) =>
      ['c-bvoc-fashion-interior', 'c-bvoc-software-dev', 'c-bvoc-tourism-hospitality', 'c-bvoc-graphic-multimedia', 'c-bsc-animation', 'c-bhm-hotel-mgmt', 'c-fire-safety'].includes(cid)
    )
  );

  const handleOpenEnquiry = (course?: Course) => {
    setSelectedCourseForEnquiry(course || null);
    setEnquiryOpen(true);
  };

  const handleOpenEligibility = (course: Course) => {
    setEligibilityCourse(course);
  };

  const TIERS = [
    {
      level: 'Certificate',
      duration: '6 Months',
      nsqf: 'NSQF Level 4',
      focus: 'Foundational practical trade skills and baseline employability.',
      color: 'from-amber-500 to-amber-600',
      badge: 'Entry Level'
    },
    {
      level: 'Diploma',
      duration: '1 Year',
      nsqf: 'NSQF Level 5',
      focus: 'Operational technician competence with laboratory studio workflows.',
      color: 'from-teal-500 to-teal-700',
      badge: 'Technician Level'
    },
    {
      level: 'Advance Diploma',
      duration: '2 Years',
      nsqf: 'NSQF Level 6',
      focus: 'Supervisory technical skills, complex systems, and team execution.',
      color: 'from-blue-600 to-indigo-700',
      badge: 'Supervisory Level'
    },
    {
      level: 'B.Voc Degree',
      duration: '3 Years',
      nsqf: 'NSQF Level 7',
      focus: 'Full UGC-recognized bachelor degree equivalent to BA/B.Sc/B.Tech for all govt jobs.',
      color: 'from-[#082B59] to-[#0D386E]',
      badge: 'Full Degree (UG)'
    },
    {
      level: 'M.Voc Degree',
      duration: '2 Years',
      nsqf: 'NSQF Level 8/9',
      focus: 'Master of Vocation for senior industrial management, R&D, and entrepreneurship.',
      color: 'from-purple-700 to-indigo-900',
      badge: 'Postgraduate (PG)'
    }
  ];

  const FAQS = [
    {
      q: 'What is B.Voc and is it recognized by UGC for Government Jobs & Competitive Exams?',
      a: 'Yes! Bachelor of Vocation (B.Voc) is a recognized undergraduate degree enacted under the University Grants Commission (UGC) and aligned with the National Skills Qualifications Framework (NSQF). UGC circulars explicitly confirm that B.Voc is treated on par with conventional degrees (BA, B.Sc, B.Com) for all competitive examinations including UPSC, BPSC, SSC, Banking (IBPS/SBI), Railways, and state civil services.'
    },
    {
      q: 'How does the Multi-Entry & Multi-Exit flexible tier system work?',
      a: 'Under the National Education Policy (NEP) and NSQF framework, students do not lose academic credits if they exit early: after 6 Months, candidates receive a Certificate; after 1 Year, a Diploma; after 2 Years, an Advance Diploma; and upon completing 3 Years, a full Bachelor of Vocation (B.Voc) Degree. You can also re-enter later to complete your degree.'
    },
    {
      q: 'Are students from Arts or Commerce streams eligible for Software Development or Interior Design B.Voc?',
      a: 'Yes. Vocational programs prioritize practical skills and industry aptitude over rigid stream restrictions. Any candidate passing 10+2 from a recognized central or state board (Arts, Science, or Commerce) is eligible for B.Voc in Software Development, Fashion & Interior Design, Multimedia, or Hospitality.'
    },
    {
      q: 'Which universities offer recognized Vocational & B.Voc degrees?',
      a: 'Leading institutions including Sikkim Skill University (SSU), Jaipur National University, Vivekananda Global University (VGU), Mata Tripura Sundari Open University, Desh Bhagat University, and Sanskriti University offer state legislature and UGC-aligned vocational degrees and diplomas.'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* 1. Hero Section */}
      <section className="bg-gradient-to-b from-[#082B59] via-[#0B3366] to-[#0D386E] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E6B437_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>NEP 2020 & NSQF Aligned Skill Programs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            Vocational & Skill Programs
          </h1>

          <div className="mt-4 inline-block px-4 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm md:text-base font-semibold text-amber-300">
            Certificate &nbsp;|&nbsp; Diploma &nbsp;|&nbsp; Advance Diploma &nbsp;|&nbsp; B.Voc &nbsp;|&nbsp; M.Voc
          </div>

          <p className="text-sm sm:text-base md:text-lg text-slate-200 mt-4 leading-relaxed max-w-2xl mx-auto">
            Practical, industry-integrated degree programs combining 60% hands-on skill training with 40% general academic knowledge. Graduate with real-world employability and UGC-recognized credentials.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenEnquiry()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
            >
              <span>Apply for Vocational Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=Hello%20SAHI%20RAAH%20CONSULTANCY%2C%20I%20am%20interested%20in%20Vocational%20Programs%20(B.Voc%20/%20Diploma).%20Please%20guide%20me.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs sm:text-sm font-bold shadow-lg transition-transform active:scale-95"
            >
              <span>Instant WhatsApp Guidance</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 space-y-12">
        {/* Multi-Exit Qualification Framework Bar */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                Flexible Multiple Entry & Exit Framework
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Progressive Skill Credentials
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              UGC & NSQF Endorsed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TIERS.map((tier, idx) => (
              <div 
                key={tier.level}
                className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-500">Tier 0{idx + 1}</span>
                    <span className="px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 text-[10px]">
                      {tier.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#082B59] transition-colors">
                    {tier.level}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-teal-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{tier.duration}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                    {tier.focus}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500 font-medium">
                  <span>{tier.nsqf}</span>
                  <Award className="w-3.5 h-3.5 text-amber-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Featured Vocational Degrees Directory */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-600" />
                <span>Industry-Aligned Tracks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Available Vocational & Applied Degree Specializations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                Explore specialized programs designed for modern industrial demand, creative technology, management, and technical safety.
              </p>
            </div>
            
            <button
              onClick={() => handleOpenEnquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold transition-all shadow-sm"
            >
              <span>Get Free Counselling</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vocationalCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onApply={(c) => handleOpenEnquiry(c)}
                onCheckEligibility={(c) => handleOpenEligibility(c)}
              />
            ))}
          </div>
        </div>

        {/* 4. Partner Universities with Vocational Offerings */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
                Institutional Directory
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Universities Offering Vocational Certifications & Degrees
              </h3>
            </div>
            <Link
              href="/universities"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B59] hover:text-[#1355A5]"
            >
              <span>View All Universities Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {vocationalUniversities.map((uni) => (
              <div 
                key={uni.id}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-all flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-white p-1 border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <img
                    src={uni.logo}
                    alt={uni.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {uni.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {uni.location}, {uni.state}
                  </p>
                  <span className="inline-block mt-1 text-[10px] font-semibold text-teal-700 px-2 py-0.5 rounded bg-teal-50 border border-teal-100">
                    {uni.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. FAQs Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
              Clear & Transparent Answers
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Frequently Asked Questions on Vocational Education
            </h3>
          </div>

          <div className="divide-y divide-slate-100 max-w-3xl mx-auto">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 hover:text-[#082B59] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Call to Action Banner */}
        <div className="bg-gradient-to-r from-[#082B59] via-[#0B3366] to-[#0D386E] rounded-3xl p-8 sm:p-10 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Need Guidance Choosing the Right Vocational Stream?
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 max-w-xl mx-auto leading-relaxed">
            Connect directly with our senior educational advisors at SAHI RAAH CONSULTANCY in Raxaul. We help you choose the best university and stream matching your career goals.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => handleOpenEnquiry()}
              className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition-all"
            >
              Submit Admission Enquiry
            </button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold transition-all"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>Call: {siteConfig.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialCourse={selectedCourseForEnquiry || undefined}
      />

      <EligibilityModal
        course={eligibilityCourse}
        onClose={() => setEligibilityCourse(null)}
        onApply={(c) => {
          setEligibilityCourse(null);
          handleOpenEnquiry(c);
        }}
      />
    </div>
  );
}
