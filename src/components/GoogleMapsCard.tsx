'use client';

import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  ExternalLink, 
  Share2, 
  Check, 
  Clock, 
  Phone,
  Sparkles
} from 'lucide-react';
import { GOOGLE_MAPS_URL, GoogleMapsIcon } from './SocialIcons';

interface GoogleMapsCardProps {
  embedUrl?: string;
  className?: string;
  showDetails?: boolean;
}

export default function GoogleMapsCard({
  embedUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8521799298495!2d84.8523497!3d26.9792019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399335a9f2430fa1%3A0x6b432168ec28a8d1!2sKaurihar%20Chowk%2C%20Raxaul%2C%20Bihar%20845305!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  className = '',
  showDetails = true
}: GoogleMapsCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(GOOGLE_MAPS_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl flex flex-col ${className}`}>
      {/* Top Google Maps UI Header Bar */}
      <div className="bg-gradient-to-r from-[#082B59] to-[#0D386E] text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow flex-shrink-0">
            <GoogleMapsIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Official Google Maps Location
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h4 className="text-sm font-extrabold text-white leading-tight">
              SAHI RAAH CONSULTANCY • Raxaul
            </h4>
          </div>
        </div>

        {/* Action Button: Open in Google Maps */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95 group"
          title="Open in Google Maps Application"
        >
          <Navigation className="w-3.5 h-3.5 text-blue-600 group-hover:rotate-12 transition-transform" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-slate-400" />
        </a>
      </div>

      {/* Interactive Map Embed Container */}
      <div className="relative w-full h-72 sm:h-80 md:h-96 bg-slate-200 dark:bg-slate-800">
        <iframe
          title="SAHI RAAH CONSULTANCY Official Google Map"
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        />

        {/* Floating Verified Pin Card on Map */}
        <div className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl max-w-[280px] sm:max-w-xs transition-all pointer-events-auto">
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-900/50 flex items-center justify-center flex-shrink-0 text-teal-600 dark:text-teal-400 mt-0.5">
              <MapPin className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-900 dark:text-white leading-tight">
                Kaurihar Chouk, Kaurihar Road
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Raxaul – 845305, Bihar, India
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                  <Clock className="w-2.5 h-2.5" />
                  <span>Open 9:30 AM – 7:00 PM</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Quick Navigate Pill */}
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
        >
          <Navigation className="w-4 h-4 fill-white" />
          <span>Get Live Directions</span>
        </a>
      </div>

      {/* Bottom Information & Control Bar */}
      {showDetails && (
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400 flex-shrink-0" />
              <span className="font-semibold">Kaurihar Chouk, Kaurihar Road, Raxaul – 845305, Bihar</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Near Nepal border transit route. Direct walk-in counselling available Monday through Saturday.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors cursor-pointer"
              title="Copy Google Maps URL"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Share Location</span>
                </>
              )}
            </button>

            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold shadow transition-colors"
            >
              <span>View Full Map</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
