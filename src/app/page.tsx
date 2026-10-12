'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/Hero';
import EducationModesPreview from '@/components/EducationModesPreview';
import ProcessTimeline from '@/components/ProcessTimeline';
import CourseCard from '@/components/CourseCard';
import UniversityCard from '@/components/UniversityCard';
import EligibilityModal from '@/components/EligibilityModal';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import ScrollReveal, { SlideImageRightToLeft } from '@/components/ScrollReveal';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';
import { initialFaqs } from '@/data/faqs';
import { siteConfig } from '@/data/siteConfig';
import { formatIndianPhone, getWhatsAppUrl, getGeneralWhatsAppMessage } from '@/lib/utils';
import { Course, University, CourseCategory } from '@/types';
import { 
  Search, 
  Sparkles, 
  ChevronRight, 
  Building2, 
  BookOpen, 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  ArrowRight,
  GraduationCap,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function HomePage() {
  // Modal states
  const [selectedCourseForEligibility, setSelectedCourseForEligibility] = useState<Course | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryInitialCourse, setEnquiryInitialCourse] = useState<Course | null>(null);
  const [enquiryInitialUniversity, setEnquiryInitialUniversity] = useState<University | null>(null);

  // Course Filter state
  const [courseSearch, setCourseSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');

  // University Filter state
  const [uniSearch, setUniSearch] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');

  // FAQ Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      const matchSearch =
        course.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.shortName.toLowerCase().includes(courseSearch.toLowerCase()) ||
        course.description.toLowerCase().includes(courseSearch.toLowerCase());
      
      const matchCat =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchMode =
        selectedMode === 'All' || course.modes.includes(selectedMode as any);

      return matchSearch && matchCat && matchMode;
    });
  }, [courseSearch, selectedCategory, selectedMode]);

  // Filtered universities
  const filteredUniversities = useMemo(() => {
    return initialUniversities.filter((uni) => {
      const matchSearch =
        uni.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
        uni.shortName.toLowerCase().includes(uniSearch.toLowerCase()) ||
        uni.location.toLowerCase().includes(uniSearch.toLowerCase());

      const matchState =
        selectedState === 'All' || uni.state === selectedState;

      return matchSearch && matchState;
    });
  }, [uniSearch, selectedState]);

  // Unique university states
  const statesList = useMemo(() => {
    const list = Array.from(new Set(initialUniversities.map((u) => u.state)));
    return ['All', ...list];
  }, []);

  const courseCategories = [
    'All',
    'Arts, Commerce & Science',
    'Management',
    'Engineering & Technology',
    'Computer Applications',
    'Library & Information Science',
    'Medical, Wellness & Research',
    'School-Level Education'
  ];

  const handleOpenEnquiryForCourse = (course: Course) => {
    setEnquiryInitialCourse(course);
    setEnquiryInitialUniversity(null);
    setEnquiryModalOpen(true);
  };

  const handleOpenEnquiryForUni = (uni: University) => {
    setEnquiryInitialUniversity(uni);
    setEnquiryInitialCourse(null);
    setEnquiryModalOpen(true);
  };

  const handleGeneralEnquiry = () => {
    setEnquiryInitialCourse(null);
    setEnquiryInitialUniversity(null);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-full overflow-x-hidden">
      {/* 1. Cinematic Hero Section */}
      <Hero onOpenEnquiry={handleGeneralEnquiry} />

      {/* 2. Three Distinct Education Modes (Regular, Distance/Online, School Boards) */}
      <EducationModesPreview onOpenEnquiry={handleGeneralEnquiry} />

      {/* 3. Interactive Courses Directory Section */}
      <section id="courses-directory" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Searchable Course Directory</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Explore All Academic Programmes
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Browse verified degrees across undergraduate, postgraduate, engineering, medical wellness, and diploma streams.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B59] hover:text-[#1355A5] transition-colors"
            >
              <span>View Full Directory (21+ Courses)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Search & Filter Bar */}
          <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-8 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Search Input */}
              <div className="md:col-span-8 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search course by name, code or keyword (e.g. B.Tech, MBA, BNYS, BCA, 10th)..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B59]/20"
                />
              </div>

              {/* Study Mode Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
                >
                  <option value="All">All Study Modes (Regular & Distance)</option>
                  <option value="Regular">Regular (On-Campus)</option>
                  <option value="Distance">Distance Mode</option>
                  <option value="Online">Online Degree</option>
                  <option value="Open Board">Open Board Stream</option>
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {courseCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#082B59] text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Course Cards Grid */}
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm font-medium">No courses match your active search filters.</p>
              <button
                onClick={() => {
                  setCourseSearch('');
                  setSelectedCategory('All');
                  setSelectedMode('All');
                }}
                className="mt-3 text-xs font-bold text-[#082B59] hover:underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.slice(0, 9).map((course, idx) => (
                <ScrollReveal key={course.id} delay={idx * 0.05} direction="up">
                  <CourseCard
                    course={course}
                    onCheckEligibility={(c) => setSelectedCourseForEligibility(c)}
                    onApply={(c) => handleOpenEnquiryForCourse(c)}
                  />
                </ScrollReveal>
              ))}
            </div>
          )}

          {filteredCourses.length > 9 && (
            <div className="mt-10 text-center">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold text-white bg-[#082B59] hover:bg-[#1355A5] shadow-lg transition-transform active:scale-95"
              >
                <span>Browse All {initialCourses.length} Courses in Directory</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 4. University Directory Section */}
      <section id="universities-directory" className="py-16 md:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>15 Institutions from Official Poster</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                Partner Institutions & University Directory
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Explore institutions featured in our official directory. We verify statutory enactments and regulatory compliance for every academic session.
              </p>
            </div>

            <Link
              href="/universities"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B59] hover:text-[#1355A5] transition-colors"
            >
              <span>View All 15 Universities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Poster Showcase Preview Banner */}
          <div className="mb-10 bg-white rounded-2xl border-2 border-slate-200 p-4 sm:p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">
                Official Directory Reference
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                Recognized Institutions Across India
              </h3>
              <p className="text-xs text-slate-600 max-w-xl">
                All 15 universities below are sourced directly from our verified institutional poster. We guide students according to each university’s specific statutory approvals and current UGC/council regulations.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/universities"
                className="px-5 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold shadow-md transition-colors whitespace-nowrap"
              >
                Explore Full Profiles
              </Link>
            </div>
          </div>

          {/* Search & State Filter */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-8 flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search university by name or state (e.g. NEFTU, ISBM, Sikkim, MP)..."
                value={uniSearch}
                onChange={(e) => setUniSearch(e.target.value)}
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2 rounded-xl border border-slate-300 focus:outline-none"
              />
            </div>

            <div className="w-full sm:w-60">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-xs sm:text-sm py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                {statesList.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All States' : st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* University Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUniversities.slice(0, 9).map((uni, idx) => (
              <SlideImageRightToLeft key={uni.id} delay={idx * 0.06}>
                <UniversityCard
                  university={uni}
                  onApply={(u) => handleOpenEnquiryForUni(u)}
                />
              </SlideImageRightToLeft>
            ))}
          </div>

          {filteredUniversities.length > 9 && (
            <div className="mt-10 text-center">
              <Link
                href="/universities"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-md transition-transform active:scale-95"
              >
                <span>View All 15 Universities</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* 5. Interactive 5-Step Admission Guidance Journey */}
      <ProcessTimeline onOpenEnquiry={handleGeneralEnquiry} />

      {/* 6. About Us Section */}
      <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>About SAHI RAAH CONSULTANCY</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Guiding Students Towards the Right Academic Future.
              </h2>

              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                SAHI RAAH CONSULTANCY helps students explore educational opportunities, understand course options, and navigate the admission process with greater clarity. Our goal is to make educational information easier to understand and help students identify suitable academic pathways based on their qualifications, interests, and career goals.
              </p>

              {/* 4 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <h4 className="text-xs font-bold text-[#082B59] uppercase tracking-wider">
                    Our Mission
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    To deliver transparent, verified, and accessible higher education counselling to every student across Raxaul, Champaran, and neighboring border regions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                  <h4 className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    Our Approach
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Fact-based institutional matching, transparent regulatory disclosures, and personal guidance from registration to university enrolment.
                  </p>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Why Students Seek Our Guidance:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Personalized Course Counselling</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>University & Programme Verification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#082B59]" />
                    <span>Admission Documentation Assistance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Support Throughout the Entire Journey</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold transition-all shadow-md"
                >
                  <span>Read Full About Us</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <button
                  onClick={handleGeneralEnquiry}
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all"
                >
                  Book Free In-Person Counselling
                </button>
              </div>
            </div>

            {/* Right Visual / Office Card (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <SlideImageRightToLeft delay={0.15}>
                <div className="bg-[#051D3C] text-white p-6 sm:p-8 rounded-3xl border-2 border-amber-400/40 shadow-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white p-1 border-2 border-amber-400 overflow-hidden flex-shrink-0">
                    <Image
                      src="/images/brand/logo.jpg"
                      alt="SAHI RAAH Brand Logo"
                      width={48}
                      height={48}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold uppercase">SAHI RAAH CONSULTANCY</h3>
                    <p className="text-xs text-amber-300 font-medium">Your Future. Our Guidance.</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10 space-y-3 text-xs text-slate-300">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      {siteConfig.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                    <a href={`tel:${siteConfig.phone}`} className="text-amber-300 font-bold hover:underline">
                      {formatIndianPhone(siteConfig.phone)}
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>{siteConfig.officeHours}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href={getWhatsAppUrl(getGeneralWhatsAppMessage())}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp Directly</span>
                  </a>
                </div>
              </div>
            </SlideImageRightToLeft>
          </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions Preview */}
      <section id="faqs" className="py-16 md:py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transparent answers regarding admission eligibility, university recognitions, and fees.
            </p>
          </div>

          <div className="space-y-3">
            {initialFaqs.slice(0, 6).map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all bg-slate-50/60"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#082B59] transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-teal-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faqs"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#082B59] hover:underline"
            >
              <span>View All Frequently Asked Questions & Regulatory FAQs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Verified Location & Map Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Visit Our Physical Office
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Walk In for One-on-One Counselling in Raxaul
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Parents and students are welcome to visit our counseling center at Kaurihar Chouk, Raxaul. Bring your previous marksheets for direct spot eligibility evaluation.
              </p>

              <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">{siteConfig.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>Helpline / WhatsApp: <strong>{siteConfig.phone}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-600 flex-shrink-0" />
                  <span>Email: {siteConfig.email}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="px-5 py-2.5 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold shadow-md transition-colors"
                >
                  Call Now: {siteConfig.phone}
                </a>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                >
                  Get Route Directions
                </Link>
              </div>
            </div>

            {/* Google Maps Embed / Card */}
            <div className="lg:col-span-7 h-80 sm:h-96 rounded-3xl overflow-hidden border-2 border-slate-200 shadow-md relative bg-slate-200">
              <iframe
                title="SAHI RAAH CONSULTANCY Location Map - Kaurihar Chouk, Raxaul"
                src={siteConfig.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 text-[11px] font-semibold text-slate-800 shadow">
                📍 Kaurihar Chouk, Raxaul (Bihar)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <EligibilityModal
        course={selectedCourseForEligibility}
        onClose={() => setSelectedCourseForEligibility(null)}
        onApply={(course) => handleOpenEnquiryForCourse(course)}
      />

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialCourse={enquiryInitialCourse}
        initialUniversity={enquiryInitialUniversity}
      />
    </div>
  );
}
