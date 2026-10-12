'use client';

import React, { useState } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { getWhatsAppUrl, getGeneralWhatsAppMessage } from '@/lib/utils';
import { MessageCircle, X, Send, Sparkles, PhoneCall } from 'lucide-react';

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
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end max-w-[calc(100vw-1.5rem)] pointer-events-auto">
      {/* Interactive WhatsApp Popover Card */}
      {isOpen && (
        <div className="mb-2.5 w-[calc(100vw-1.5rem)] max-w-[340px] sm:max-w-sm sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300 max-h-[82vh]">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-[#075E54] to-[#128C7E] p-3.5 sm:p-4 text-white flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-emerald-800 flex items-center justify-center font-bold text-base sm:text-lg shadow-sm">
                  SR
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-800" />
              </div>
              <div className="min-w-0">
                <h4 className="font-bold text-xs sm:text-sm leading-tight truncate">SAHI RAAH CONSULTANCY</h4>
                <p className="text-[10px] sm:text-[11px] text-emerald-100 flex items-center gap-1 truncate">
                  <Sparkles className="w-3 h-3 flex-shrink-0" />
                  Official Admission Helpline
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1.5 rounded-full hover:bg-black/10 transition-colors flex-shrink-0 ml-1"
              aria-label="Close WhatsApp chat card"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body (scrollable on mobile) */}
          <div className="p-3 sm:p-4 bg-slate-50 space-y-2.5 overflow-y-auto flex-1 text-xs">
            <div className="bg-white p-2.5 sm:p-3 rounded-2xl rounded-tl-sm text-[11px] sm:text-xs text-slate-800 shadow-sm border border-slate-100 space-y-1">
              <p className="font-bold text-emerald-800">Namaste! 🙏</p>
              <p className="leading-relaxed">Welcome to <strong>SAHI RAAH CONSULTANCY</strong> (Raxaul).</p>
              <p className="text-slate-600 leading-relaxed">
                How can our admission counsellors assist you today? Select a quick topic or type your query below.
              </p>
            </div>

            {/* Quick topics */}
            <div className="space-y-1.5">
              <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Inquiries:
              </p>
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="w-full text-left text-[11px] sm:text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 p-2 sm:p-2.5 rounded-xl border border-slate-200 transition-all flex items-center justify-between gap-2 group cursor-pointer"
                >
                  <span className="leading-snug break-words flex-1 pr-1">{prompt}</span>
                  <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 flex-shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-1.5">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <input
                  type="text"
                  placeholder="Type your question..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend(customMsg);
                  }}
                  className="flex-1 text-[11px] sm:text-xs px-2.5 py-2 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 bg-white"
                />
                <button
                  onClick={() => handleSend(customMsg)}
                  className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2 rounded-xl shadow-sm transition-transform active:scale-95 flex-shrink-0"
                  title="Send to WhatsApp"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Footer Call fallback */}
          <div className="bg-slate-100 px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-200 flex-shrink-0">
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

      {/* Floating Button with Mobile Safe Padding & Width */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 transform active:scale-95 max-w-[calc(100vw-1.5rem)] cursor-pointer"
        aria-label="Chat on WhatsApp with SAHI RAAH CONSULTANCY"
        aria-expanded={isOpen}
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3 sm:h-3.5 sm:w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500 border-2 border-white" />
        </span>
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white flex-shrink-0" />
        <span className="text-xs sm:text-sm font-bold tracking-tight truncate pr-0.5">
          WhatsApp Guidance
        </span>
      </button>
    </div>
  );
}
