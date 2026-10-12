'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '@/lib/utils';
import { X, Send, Sparkles, PhoneCall } from 'lucide-react';

// Authentic Official WhatsApp Logo SVG
function WhatsAppIcon({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.59 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.6L5.06 16.29C4.24 14.98 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.95 7.42C8.74 7.42 8.39 7.5 8.1 7.81C7.81 8.12 7 8.88 7 10.42C7 11.96 8.13 13.44 8.28 13.65C8.44 13.86 10.46 17.17 13.67 18.42C16.34 19.45 16.89 19.25 17.48 19.19C18.06 19.14 19.36 18.42 19.63 17.66C19.89 16.9 19.89 16.24 19.81 16.11C19.74 15.98 19.53 15.9 19.22 15.75C18.91 15.59 17.38 14.84 17.09 14.74C16.81 14.64 16.6 14.58 16.4 14.89C16.19 15.2 15.59 15.9 15.41 16.11C15.23 16.31 15.05 16.34 14.74 16.18C14.43 16.03 13.44 15.7 12.26 14.65C11.35 13.84 10.73 12.83 10.55 12.52C10.37 12.21 10.53 12.04 10.69 11.89C10.83 11.75 11 11.52 11.16 11.34C11.31 11.16 11.36 11.03 11.47 10.82C11.57 10.62 11.52 10.44 11.44 10.28C11.36 10.13 10.74 8.6 10.48 7.99C10.23 7.39 9.98 7.47 9.79 7.46C9.61 7.46 9.4 7.42 9.19 7.42H8.95Z" />
    </svg>
  );
}

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    'I want admission guidance for Session 2026-2027.',
    'Please guide me regarding Regular College Admissions.',
    'Need details on Distance & Online Degree options.',
    'Guidance needed for Class 10th / 12th Board exams.',
  ];

  const handleSend = (text: string) => {
    const url = getWhatsAppUrl(text || getGeneralWhatsAppMessage());
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <aside
      aria-label="WhatsApp Admission Assistance"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-auto"
    >
      {/* ============================================================== */}
      {/* MOBILE VIEW (< sm): ONLY the circular WhatsApp logo.           */}
      {/* Strictly 48px round button, never goes out of the screen.       */}
      {/* ============================================================== */}
      <a
        href={getWhatsAppUrl(getGeneralWhatsAppMessage())}
        target="_blank"
        rel="noopener noreferrer"
        className="sm:hidden relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-emerald-500/50 active:scale-95 transition-all duration-200"
        aria-label="Direct WhatsApp Chat with SAHI RAAH CONSULTANCY"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border-2 border-white" />
        </span>
        <WhatsAppIcon className="w-6 h-6 fill-white" />
      </a>

      {/* ============================================================== */}
      {/* DESKTOP VIEW (>= sm): Expandable Card + "WhatsApp Guidance"     */}
      {/* ============================================================== */}
      <div className="hidden sm:flex flex-col items-end">
        {isOpen && (
          <div className="mb-3 w-88 md:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300 max-h-[82vh]">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-4 text-white flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-lg shadow-sm">
                    SR
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-800" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm leading-tight truncate">SAHI RAAH CONSULTANCY</h4>
                  <p className="text-[11px] text-emerald-100 flex items-center gap-1 truncate">
                    <Sparkles className="w-3 h-3 flex-shrink-0" />
                    Official Admission Helpline
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-black/10 transition-colors flex-shrink-0 ml-1 cursor-pointer"
                aria-label="Close WhatsApp chat card"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 bg-slate-50 space-y-3 overflow-y-auto flex-1 text-xs">
              <div className="bg-white p-3 rounded-2xl rounded-tl-sm text-xs text-slate-800 shadow-sm border border-slate-100 space-y-1">
                <p className="font-bold text-emerald-800">Namaste! 🙏</p>
                <p className="leading-relaxed">Welcome to <strong>SAHI RAAH CONSULTANCY</strong> (Raxaul).</p>
                <p className="text-slate-600 leading-relaxed">
                  How can our admission counsellors assist you today? Select a quick topic or type your query below.
                </p>
              </div>

              {/* Quick topics */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Quick Inquiries:
                </p>
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="w-full text-left text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 p-2.5 rounded-xl border border-slate-200 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                  >
                    <span className="leading-snug break-words flex-1 pr-1">{prompt}</span>
                    <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                  </button>
                ))}
              </div>

              {/* Custom Input */}
              <div className="pt-1.5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your question..."
                    value={customMsg}
                    onChange={(e) => setCustomMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend(customMsg);
                    }}
                    className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
                  />
                  <button
                    onClick={() => handleSend(customMsg)}
                    className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-xl shadow-sm transition-transform active:scale-95 flex-shrink-0 cursor-pointer"
                    title="Send to WhatsApp"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Call fallback */}
            <div className="bg-slate-100 px-4 py-2.5 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200 flex-shrink-0">
              <span>Direct Call Available:</span>
              <a
                href={`tel:${siteConfig.phone}`}
                className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{siteConfig.phone}</span>
              </a>
            </div>
          </div>
        )}

        {/* Desktop Trigger Button with Icon + Label */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          aria-label="Chat on WhatsApp with SAHI RAAH CONSULTANCY"
          aria-expanded={isOpen}
        >
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border-2 border-white" />
          </span>
          <WhatsAppIcon className="w-5 h-5 fill-white flex-shrink-0" />
          <span className="text-sm font-bold tracking-tight pr-0.5">
            WhatsApp Guidance
          </span>
        </button>
      </div>
    </aside>
  );
}
