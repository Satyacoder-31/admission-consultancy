'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { initialUniversities } from '@/data/universities';
import UniversityCard from '@/components/UniversityCard';
import EnquiryFormModal from '@/components/EnquiryFormModal';
import { University, VerificationStatus } from '@/types';
import { Search, Building2, ShieldAlert, Sparkles, Filter, ExternalLink } from 'lucide-react';

export default function UniversitiesPage() {
  const [search, setSearch] = useState('');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [selectedUni, setSelectedUni] = useState<University | null>(null);

  const states = useMemo(() => {
    const list = Array.from(new Set(initialUniversities.map((u) => u.state)));
    return ['All', ...list];
  }, []);

  const statuses = ['All', 'Verification Required', 'Verified'];

  const filtered = useMemo(() => {
    return initialUniversities.filter((uni) => {
      const matchSearch =
        uni.name.toLowerCase().includes(search.toLowerCase()) ||
        uni.shortName.toLowerCase().includes(search.toLowerCase()) ||
        uni.location.toLowerCase().includes(search.toLowerCase()) ||
        uni.summary.toLowerCase().includes(search.toLowerCase());

      const matchState =
        selectedState === 'All' || uni.state === selectedState;

      const matchStatus =
        selectedStatus === 'All' || uni.verificationStatus === selectedStatus;

      return matchSearch && matchState && matchStatus;
    });
  }, [search, selectedState, selectedStatus]);

  const handleApply = (uni: University) => {
    setSelectedUni(uni);
    setEnquiryOpen(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Institutional Directory</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            15 Leading Universities Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Authentic institution profiles extracted directly from our verified admissions poster, with session-based regulatory status.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Compliance Notice Banner */}
        <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-5 mb-8 shadow-sm text-xs text-amber-950 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold uppercase tracking-wider text-[11px] text-amber-900">
                Institutional Transparency & Regulatory Protocol
              </p>
              <p className="mt-0.5 leading-relaxed text-amber-900/90">
                Course availability, eligibility, recognition, and study modes vary by university. We do not automatically label all institutions as blanket UGC-approved or valid for government jobs without cross-verification against current statutory lists.
              </p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sm:p-6 mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search university by name, short code, state, or district..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/20"
              />
            </div>

            {/* State */}
            <div className="md:col-span-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                {states.map((st) => (
                  <option key={st} value={st}>
                    {st === 'All' ? 'All States (India)' : st}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="md:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full text-xs sm:text-sm py-2.5 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s === 'All' ? 'All Verification Statuses' : s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
            <span>
              Showing <strong>{filtered.length}</strong> of {initialUniversities.length} universities
            </span>
            {(search || selectedState !== 'All' || selectedStatus !== 'All') && (
              <button
                onClick={() => {
                  setSearch('');
                  setSelectedState('All');
                  setSelectedStatus('All');
                }}
                className="text-xs font-bold text-[#082B59] hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

        {/* University Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((uni) => (
            <UniversityCard
              key={uni.id}
              university={uni}
              onApply={(u) => handleApply(u)}
            />
          ))}
        </div>
      </div>

      <EnquiryFormModal
        isOpen={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        initialUniversity={selectedUni}
      />
    </div>
  );
}
