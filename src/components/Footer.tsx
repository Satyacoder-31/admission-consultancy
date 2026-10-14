'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { getStoredSettings } from '@/lib/storage';
import { formatIndianPhone } from '@/lib/utils';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  Clock,
  Sparkles 
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
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

  // Hide the public website footer on admin pages
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="bg-[#051D3C] text-slate-300 pt-16 pb-8 border-t-2 border-amber-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info (2 columns) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full bg-white p-1 border-2 border-amber-400/80 shadow-lg overflow-hidden flex-shrink-0">
                <Image
                  src="/images/brand/logo.jpg"
                  alt="SAHI RAAH CONSULTANCY Logo"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight text-white uppercase leading-tight">
                  SAHI RAAH
                </h3>
                <p className="text-xs font-bold tracking-[0.2em] text-teal-300 uppercase">
                  CONSULTANCY
                </p>
                <p className="text-xs text-amber-300/90 italic font-medium">
                  Your Future. Our Guidance.
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed pr-4">
              Career counselling and university admission support centre based in Raxaul, Bihar. 
              Helping students secure admission to top UGC-approved and NAAC-accredited universities 
              across regular, online, and distance-learning programmes.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Admissions Guidance for Sessions 2026–2027 & 2027–2028</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-400 pl-2">
              Explore
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span>All Courses</span>
                </Link>
              </li>
              <li>
                <Link href="/universities" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span>Universities Directory</span>
                </Link>
              </li>
              <li>
                <Link href="/admission-process" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span>Admission Process</span>
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-teal-400" />
                  <span>Frequently Asked Questions</span>
                </Link>
              </li>
              <li>
                <Link href="/enquiry" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 font-semibold text-amber-300">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Online Admission Enquiry</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Education Modes */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-teal-400 pl-2">
              Education Pathways
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/regular-education" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Regular Universities</span>
                </Link>
              </li>
              <li>
                <Link href="/distance-online-education" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Distance & Online Degrees</span>
                </Link>
              </li>
              <li>
                <Link href="/school-guidance" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Class 10th & 12th Boards</span>
                </Link>
              </li>
              <li>
                <Link href="/vocational-courses" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Vocational Programs (B.Voc / M.Voc)</span>
                </Link>
              </li>
              <li>
                <Link href="/#bscc-scheme" className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-amber-300 font-semibold">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bihar Student Credit Card (BSCC)</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>B.Tech & Polytechnic</span>
                </Link>
              </li>
              <li>
                <Link href="/courses#medical" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>BNYS & DNYS Naturopathy</span>
                </Link>
              </li>
              <li>
                <Link href="/courses#management" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>BBA & MBA Programs</span>
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                  <span>Paramedical & Allied Health</span>
                </Link>
              </li>
              <li>
                <a 
                  href="https://www.ugc.gov.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-teal-300 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>UGC Official Portal (Higher Education)</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://www.cobse.org.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-300 transition-colors flex items-center gap-1.5 text-teal-300 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>COBSE Portal (School Boards Recognition)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-400 pl-2">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                <address className="not-italic text-xs leading-relaxed">
                  {settings.address}
                </address>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href={`tel:${settings.phone}`} className="text-white hover:text-amber-300 font-semibold text-xs transition-colors">
                  {formatIndianPhone(settings.phone)}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-xs hover:text-amber-300 transition-colors break-all">
                  {settings.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  {settings.officeHours}
                </span>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:text-white font-medium underline"
                >
                  <span>View Google Map & Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Official Statutory Verification Portals Strip (UGC & COBSE) */}
        <div className="py-6 border-b border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-4">
            <div>
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
                Official Statutory Recognition & Verification Portals
              </span>
              <h5 className="text-sm font-extrabold text-white">
                Apex Higher Education Commission & National School Boards Council
              </h5>
            </div>
            <span className="text-xs text-slate-400">
              Direct verification portals for university degrees & school board equivalencies
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UGC Portal Link Card */}
            <a
              href="https://www.ugc.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/60 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white p-1 border border-blue-400 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/brand/ugc-logo.png"
                    alt="UGC Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    University Grants Commission (UGC)
                  </h6>
                  <p className="text-[11px] text-teal-300 font-medium">
                    www.ugc.gov.in • Apex Higher Education Authority of India
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-300 flex-shrink-0 transition-colors" />
            </a>

            {/* COBSE Portal Link Card */}
            <a
              href="https://www.cobse.org.in"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-amber-400/60 transition-all flex items-center justify-between gap-3 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white p-1 border border-amber-400 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/brand/cobse-logo.png"
                    alt="COBSE Logo"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h6 className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                    Council of Boards of School Education in India (COBSE)
                  </h6>
                  <p className="text-[11px] text-teal-300 font-medium">
                    www.cobse.org.in • Apex National School Boards Association
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-300 flex-shrink-0 transition-colors" />
            </a>
          </div>
        </div>

        {/* Regulatory Disclosure & Legal Notice */}
        <div className="py-6 border-b border-white/10 text-xs text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-semibold uppercase tracking-wider text-[11px]">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Transparency & Statutory Advisory</span>
          </div>
          <p>
            <strong>SAHI RAAH CONSULTANCY</strong> is an educational guidance and career counselling facilitator operating from Raxaul, Bihar, India. 
            We provide prospective applicants with institutional information, eligibility clarification, and application support. 
            We do not grant diplomas or degrees, conduct examinations, or guarantee admission, academic results, or employment. 
            All admissions, course approvals, curriculum schedules, and fee structures are solely subject to the statutory enactments and official notifications of the respective universities, boards, and regulatory councils (including UGC, AICTE, and State Councils).
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>
              &copy; 2026 SAHI RAAH CONSULTANCY. All Rights Reserved. Raxaul, Bihar – 845305.
            </p>
            <div className="flex items-center gap-2 text-slate-400">
              <span className="hidden sm:inline">•</span>
              <button
                onClick={toggleLanguage}
                className="hover:text-amber-300 text-teal-300 font-semibold transition-colors cursor-pointer"
                title="Change Language"
              >
                🌐 {language === 'en' ? 'हिन्दी' : 'English'}
              </button>
              <span>•</span>
              <button
                onClick={toggleTheme}
                className="hover:text-amber-300 text-amber-300 font-semibold transition-colors cursor-pointer"
                title="Toggle Dark / Light Mode"
              >
                {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Regulatory Disclaimer
            </Link>
            <span>•</span>
            <Link href="/admin" className="text-slate-500 hover:text-amber-300 transition-colors">
              Admin CMS
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
