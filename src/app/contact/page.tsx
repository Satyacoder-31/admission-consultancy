'use client';

import React, { useState, useEffect } from 'react';
import { siteConfig } from '@/data/siteConfig';
import { getStoredSettings } from '@/lib/storage';
import { formatIndianPhone, getWhatsAppUrl, getGeneralWhatsAppMessage } from '@/lib/utils';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2,
  ExternalLink,
  Sparkles,
  Navigation,
  Share2
} from 'lucide-react';
import GoogleMapsCard from '@/components/GoogleMapsCard';
import { OFFICIAL_SOCIAL_LINKS, GOOGLE_MAPS_URL, GoogleMapsIcon } from '@/components/SocialIcons';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [settings, setSettings] = useState(siteConfig);

  useEffect(() => {
    setSettings(getStoredSettings());
    const handleSync = () => setSettings(getStoredSettings());
    window.addEventListener('storage', handleSync);
    window.addEventListener('sr_data_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('sr_data_updated', handleSync);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    // Send query to WhatsApp or store
    const msg = `Hello SAHI RAAH CONSULTANCY,\n*Contact Form Submission*\nName: ${name}\nPhone: ${phone}\nQuery: ${query || 'Need general admission details'}`;
    window.open(getWhatsAppUrl(msg, settings.whatsapp), '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* Top Banner */}
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>Kaurihar Chouk, Raxaul, Bihar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Contact SAHI RAAH CONSULTANCY
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Reach out for personalized college counselling, fee clarifications, or visit our counseling office in Raxaul.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Contact Card (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
            <div>
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wider block">
                Official Business Information
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {settings.businessName}
              </h2>
              <p className="text-xs text-amber-600 font-bold tracking-wider uppercase">
                {settings.tagline}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <MapPin className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <strong className="block text-slate-900 font-bold">Office Address:</strong>
                    <a
                      href={settings.googleMapsUrl || GOOGLE_MAPS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-700 hover:underline"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Maps</span>
                    </a>
                  </div>
                  <a
                    href={settings.googleMapsUrl || GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="not-italic leading-relaxed text-slate-600 hover:text-blue-700 transition-colors block"
                    title="View office location on Google Maps"
                  >
                    {settings.address}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Phone className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">Direct Helpline / WhatsApp:</strong>
                  <a
                    href={`tel:${settings.phone}`}
                    className="text-[#082B59] font-bold text-sm hover:underline"
                  >
                    {formatIndianPhone(settings.phone)}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Mail className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">Email Inquiries:</strong>
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-[#082B59] hover:underline break-all"
                  >
                    {settings.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                <Clock className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold mb-0.5">Official Working Hours:</strong>
                  <p className="text-slate-600">{settings.officeHours}</p>
                </div>
              </div>
            </div>

            {/* Quick Contact Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${settings.phone}`}
                className="py-3 px-4 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href={getWhatsAppUrl(getGeneralWhatsAppMessage(), settings.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Official Social Media Channels (Instagram, YouTube, Facebook, LinkedIn) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-amber-50/40 border border-slate-200 space-y-3">
              <div>
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                  Connect & Follow Online
                </span>
                <h3 className="text-sm font-extrabold text-slate-900">
                  Official Social Media Channels
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Follow for official admission updates, campus guides, notifications, and spot counselling alerts.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {OFFICIAL_SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all group"
                      title={`Visit ${item.name} (${item.handle})`}
                    >
                      <span className={`p-1.5 rounded-lg ${item.badgeBg} flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs`}>
                        <Icon className="w-3.5 h-3.5" />
                      </span>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-slate-800 group-hover:text-amber-600 transition-colors truncate">
                          {item.name}
                        </span>
                        <span className="block text-[10px] text-slate-400 truncate">
                          {item.handle}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Direct Message Form & Map (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-4">
              <h3 className="text-xl font-bold text-slate-900">
                Send Us a Direct Message
              </h3>
              <p className="text-xs text-slate-500">
                Fill out the quick form below and connect directly with an admission advisor.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900">Message Forwarded!</h4>
                  <p className="text-xs text-slate-600">
                    Your inquiry has been opened on WhatsApp. Our counsellor will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramesh Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#082B59]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 8092911956"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#082B59]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Query or Preferred Course
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g. I want admission guidance for B.Tech CSE or Class 12th open board..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-[#082B59]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Query to Admission Desk</span>
                  </button>
                </form>
              )}
            </div>

            {/* Interactive Google Map UI Card */}
            <GoogleMapsCard embedUrl={settings.googleMapsEmbedUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
