'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { initialFaqs } from '@/data/faqs';
import { Search, HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '@/lib/utils';

export default function FAQsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    'All',
    'General',
    'Admissions',
    'Modes of Study',
    'Verification & Legitimacy',
    'Fees & Documents'
  ];

  const filtered = useMemo(() => {
    return initialFaqs.filter((f) => {
      const matchSearch =
        f.question.toLowerCase().includes(search.toLowerCase()) ||
        f.answer.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === 'All' || f.category === selectedCategory;

      return matchSearch && matchCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Help Centre & Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Get clear, honest answers regarding university recognition, degree validity, admissions protocols, and fees.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        {/* Search & Category Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 mb-8 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search question or keyword (e.g. validity, regular vs distance, documents)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#082B59] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs list */}
        <div className="space-y-3">
          {filtered.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900 hover:text-[#082B59] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200">
                      {faq.category}
                    </span>
                    <span>{faq.question}</span>
                  </span>
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

        {/* Still have questions banner */}
        <div className="mt-12 p-8 bg-[#051D3C] rounded-3xl text-white text-center space-y-4">
          <h3 className="text-lg font-bold">Have a specific question about your situation?</h3>
          <p className="text-xs text-slate-300 max-w-md mx-auto">
            Our experienced counsellors are available to answer your individual admission queries via WhatsApp or phone.
          </p>
          <div className="flex justify-center gap-3">
            <a
              href={getWhatsAppUrl(getGeneralWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba59] transition-transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
