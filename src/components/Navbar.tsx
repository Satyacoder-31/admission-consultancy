'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/siteConfig';
import { formatIndianPhone } from '@/lib/utils';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Menu, 
  X, 
  GraduationCap, 
  ChevronRight, 
  Sparkles,
  Lock
} from 'lucide-react';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Universities', href: '/universities' },
  { name: 'Courses', href: '/courses' },
  { name: 'Admission Process', href: '/admission-process' },
  { name: 'FAQs', href: '/faqs' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top verified alert bar / contact bar */}
      <div className="bg-[#051D3C] text-slate-200 text-xs py-2 px-4 border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-amber-300 font-semibold tracking-wide">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              Admissions Open: Session 2026–2027 & 2027–2028
            </span>
            <span className="text-slate-400">|</span>
            <a 
              href={`tel:${siteConfig.phone}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-teal-400" />
              <span>{formatIndianPhone(siteConfig.phone)}</span>
            </a>
            <span className="text-slate-400">|</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Kaurihar Chouk, Raxaul, Bihar</span>
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-900/60 text-teal-200 text-[11px] font-medium border border-teal-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Counseling Active Today
            </span>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-300 transition-colors"
              title="Counsellor / Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#082B59]/95 backdrop-blur-md shadow-xl py-3 border-b border-amber-400/20'
            : 'bg-[#082B59] py-4 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-11 h-11 md:w-13 md:h-13 rounded-full bg-white p-1 shadow-md border-2 border-amber-400/80 group-hover:scale-105 transition-transform overflow-hidden flex-shrink-0">
              <Image
                src="/images/brand/logo.jpg"
                alt="SAHI RAAH CONSULTANCY Logo"
                width={52}
                height={52}
                className="w-full h-full object-contain rounded-full"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-extrabold tracking-tight text-white leading-tight group-hover:text-amber-300 transition-colors">
                SAHI RAAH
              </span>
              <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-teal-300 uppercase leading-none">
                CONSULTANCY
              </span>
              <span className="text-[9px] text-slate-300 italic hidden sm:inline-block leading-tight mt-0.5">
                Your Future. Our Guidance.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-amber-300 bg-white/10 shadow-sm font-semibold'
                      : 'text-slate-100 hover:text-amber-300 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/enquiry"
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-lg hover:shadow-amber-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all border border-amber-300"
            >
              <Sparkles className="w-4 h-4 text-slate-900" />
              <span>Apply Now</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/enquiry"
              className="inline-flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors"
            >
              Apply
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#051D3C] border-b border-amber-400/30 shadow-2xl px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1 mb-4">
            {NAV_LINKS.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                    active
                      ? 'bg-amber-400/20 text-amber-300 font-bold'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-3">
            <div className="flex flex-col gap-1.5 text-xs text-slate-300 px-3">
              <div className="flex items-center gap-2 text-amber-300 font-semibold">
                <Calendar className="w-3.5 h-3.5" />
                <span>Session: 2026–2027 Admission Guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Kaurihar Chouk, Kaurihar Road, Raxaul</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${siteConfig.phone}`}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-teal-800/60 text-teal-200 text-xs font-semibold border border-teal-500/30"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Us</span>
              </a>
              <Link
                href="/enquiry"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold shadow-md"
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Apply Now</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
