'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { initialCourses } from '@/data/courses';
import CourseCard from '@/components/CourseCard';
import EligibilityModal from '@/components/EligibilityModal';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import AffiliatedCouncils from '@/components/AffiliatedCouncils';
import { Course, CourseCategory, CourseLevel, StudyMode } from '@/types';
import { Search, Filter, BookOpen, Sparkles, ArrowRight } from 'lucide-react';

export default function CoursesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');

  // Modals
  const [eligibilityCourse, setEligibilityCourse] = useState<Course | null>(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCourse, setEnquiryCourse] = useState<Course | null>(null);

  const categories = [
    'All',
    'Arts, Commerce & Science',
    'Management',
    'Engineering & Technology',
    'Computer Applications',
    'Paramedical & Allied Health',
    'Nursing',
    'Pharmacy',
    'Education & Teaching',
    'Legal Studies & Law',
    'Library & Information Science',
    'Medical, Wellness & Research',
    'Vocational & Skill Development',
    'Agriculture & Applied Sciences',
    'School-Level Education'
  ];

  const levels = ['All', 'UG', 'PG', 'Diploma', 'Certificate', 'Doctorate', 'Vocational', 'School'];
  const modes = ['All', 'Regular', 'Distance', 'Online', 'Open Board'];

  const filtered = useMemo(() => {
    return initialCourses.filter((course) => {
      const matchSearch =
        course.name.toLowerCase().includes(search.toLowerCase()) ||
        course.shortName.toLowerCase().includes(search.toLowerCase()) ||
        course.description.toLowerCase().includes(search.toLowerCase()) ||
        course.keySubjects.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchCategory =
        selectedCategory === 'All' || course.category === selectedCategory;

      const matchLevel =
        selectedLevel === 'All' || course.level === selectedLevel;

      const matchMode =
        selectedMode === 'All' || course.modes.includes(selectedMode as StudyMode);

      return matchSearch && matchCategory && matchLevel && matchMode;
    });
  }, [search, selectedCategory, selectedLevel, selectedMode]);

  const handleOpenEnquiry = (course: Course) => {
    setEnquiryCourse(course);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Complete Academic Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            All Courses & Degrees
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Discover 50+ verified programmes across Arts, Commerce, Science, Engineering, Paramedical & Allied Health, Nursing, Pharmacy, B.Ed & Education, Vocational B.Voc, and School Boards.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Filter Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6 mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by course name, short code, or keyword (e.g. MBA, B.Tech, BNYS)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/20"
              />
            </div>

            {/* Level */}
            <div className="md:col-span-3">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                {levels.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl === 'All' ? 'All Degree Levels' : `${lvl} Level`}
                  </option>
                ))}
              </select>
            </div>

            {/* Mode */}
            <div className="md:col-span-3">
              <select
                value={selectedMode}
                onChange={(e) => setSelectedMode(e.target.value)}
                className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                {modes.map((m) => (
                  <option key={m} value={m}>
                    {m === 'All' ? 'All Study Modes' : `${m} Mode`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#082B59] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Active summary */}
          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>
              Showing <strong>{filtered.length}</strong> of {initialCourses.length} courses
            </span>
            {(search || selectedCategory !== 'All' || selectedLevel !== 'All' || selectedMode !== 'All') && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                  setSelectedMode('All');
                }}
                className="text-xs font-bold text-[#082B59] hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No courses match your criteria</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or filter selections. Our counsellors can also match courses manually.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onCheckEligibility={(c) => setEligibilityCourse(c)}
                onApply={(c) => handleOpenEnquiry(c)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Statutory Regulatory Commissions & School Boards (UGC & COBSE) */}
      <div className="mt-16">
        <AffiliatedCouncils onOpenEnquiry={() => { setEnquiryCourse(null); setEnquiryModalOpen(true); }} />
      </div>

      {/* Modals */}
      <EligibilityModal
        course={eligibilityCourse}
        onClose={() => setEligibilityCourse(null)}
        onApply={(c) => handleOpenEnquiry(c)}
      />

      <EnquiryFormModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        initialCourse={enquiryCourse}
      />
    </div>
  );
}
