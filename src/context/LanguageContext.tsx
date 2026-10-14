'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export const translations: Translations = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.about': { en: 'About Us', hi: 'हमारे बारे में' },
  'nav.universities': { en: 'Universities', hi: 'विश्वविद्यालय' },
  'nav.courses': { en: 'Courses', hi: 'कोर्स सूची' },
  'nav.vocational': { en: 'Vocational Programs', hi: 'व्यावसायिक कोर्स' },
  'nav.process': { en: 'Admission Process', hi: 'प्रवेश प्रक्रिया' },
  'nav.faqs': { en: 'FAQs', hi: 'सामान्य प्रश्न' },
  'nav.contact': { en: 'Contact', hi: 'संपर्क करें' },

  // Top Announcement Bar
  'top.admissions': {
    en: 'Admissions Open: Session 2026–2027 & 2027–2028',
    hi: 'प्रवेश प्रारंभ: शैक्षणिक सत्र 2026–2027 एवं 2027–2028'
  },
  'top.bscc': {
    en: 'Bihar Student Credit Card (BSCC) Scheme',
    hi: 'बिहार स्टूडेंट क्रेडिट कार्ड (BSCC) योजना'
  },
  'top.counseling': {
    en: 'Counseling Active Today',
    hi: 'काउंसलिंग आज जारी है'
  },
  'top.admin': { en: 'Admin', hi: 'एडमिन' },

  // Buttons & CTAs
  'cta.applyNow': { en: 'Apply Now', hi: 'अभी आवेदन करें' },
  'cta.applyGuidance': { en: 'Apply for Admission Guidance', hi: 'प्रवेश परामर्श के लिए आवेदन करें' },
  'cta.whatsapp': { en: 'Ask on WhatsApp', hi: 'व्हाट्सएप पर पूछें' },
  'cta.callUs': { en: 'Call Us', hi: 'कॉल करें' },
  'cta.verifyEligibility': { en: 'Verify My Eligibility', hi: 'अपनी पात्रता जांचें' },
  'cta.exploreCourses': { en: 'Explore All Courses', hi: 'सभी कोर्स देखें' },
  'cta.viewUniversities': { en: 'View Universities', hi: 'विश्वविद्यालय देखें' },
  'cta.downloadBrochure': { en: 'Download Prospectus', hi: 'विवरणिका डाउनलोड करें' },
  'cta.freeCounseling': { en: 'Book Free Counseling', hi: 'निःशुल्क काउंसलिंग बुक करें' },
  'cta.submit': { en: 'Submit Details', hi: 'विवरण जमा करें' },
  'cta.submitting': { en: 'Submitting...', hi: 'जमा हो रहा है...' },
  'cta.close': { en: 'Close', hi: 'बंद करें' },

  // Theme & Language
  'theme.dark': { en: 'Dark Mode', hi: 'डार्क मोड' },
  'theme.light': { en: 'Light Mode', hi: 'लाइट मोड' },
  'lang.current': { en: 'English', hi: 'हिन्दी' },
  'lang.switch': { en: 'हिन्दी', hi: 'English' },

  // Common Section Titles
  'sec.popularCourses': { en: 'Popular Degree & Diploma Courses', hi: 'लोकप्रिय डिग्री और डिप्लोमा पाठ्यक्रम' },
  'sec.partnerUnis': { en: 'UGC Approved Partner Universities', hi: 'UGC मान्यता प्राप्त सहयोगी विश्वविद्यालय' },
  'sec.whyChoose': { en: 'Why Choose SAHI RAAH?', hi: 'सही राह क्यों चुनें?' },
  'sec.officeRaxaul': { en: 'Our Centre in Raxaul', hi: 'हमारा रक्सौल केंद्र' },
  'sec.address': { 
    en: 'Kaurihar Chouk, Kaurihar Road, Raxaul, East Champaran, Bihar – 845305', 
    hi: 'कौड़िहार चौक, कौड़िहार रोड, रक्सौल, पूर्वी चंपारण, बिहार – 845305' 
  },
  'sec.tagline': {
    en: 'Your Future. Our Guidance.',
    hi: 'आपका भविष्य। हमारा मार्गदर्शन।'
  },
  'sec.aboutSummary': {
    en: 'SAHI RAAH is a premier career counselling and university admission support centre helping students secure admissions in UGC-approved and NAAC-accredited universities across India.',
    hi: 'सही राह (SAHI RAAH) एक प्रमुख करियर काउंसलिंग और विश्वविद्यालय प्रवेश सहायता केंद्र है जो विद्यार्थियों को भारत के शीर्ष UGC-मान्यता प्राप्त विश्वविद्यालयों में सही प्रवेश दिलाने में सहायता करता है।'
  }
};

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('sahiraah_lang') as Language | null;
    if (saved === 'en' || saved === 'hi') {
      setLanguageState(saved);
      document.documentElement.lang = saved;
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('sahiraah_lang', lang);
    document.documentElement.lang = lang;
  };

  const toggleLanguage = () => {
    const next = language === 'en' ? 'hi' : 'en';
    setLanguage(next);
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key]) {
      return translations[key][language] || translations[key].en || fallback || key;
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
