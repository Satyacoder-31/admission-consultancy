import { SiteSettings } from '@/types';

export const siteConfig: SiteSettings = {
  businessName: 'SAHI RAAH CONSULTANCY',
  tagline: 'Your Future. Our Guidance.',
  phone: '8092911956',
  whatsapp: '8092911956',
  email: 'Sahiraahconsultancy@gmail.com',
  address: 'Kaurihar Chouk, Kaurihar Road, Raxaul – 845305, Bihar, India',
  activeSessions: ['2026-2027', '2027-2028'],
  defaultSession: '2026-2027',
  officeHours: 'Monday – Saturday: 9:30 AM to 7:00 PM (IST)',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8521799298495!2d84.8523497!3d26.9792019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399335a9f2430fa1%3A0x6b432168ec28a8d1!2sKaurihar%20Chowk%2C%20Raxaul%2C%20Bihar%20845305!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'
};

export const brandColors = {
  navy: '#082B59',
  royal: '#1355A5',
  teal: '#078C8A',
  gold: '#E6B437',
  offwhite: '#F8FAFC',
  charcoal: '#172033',
};

export const councilAffiliations = [
  {
    id: 'aicpmf',
    name: 'All India Council of Paramedical Faculty',
    shortName: 'AICPMF',
    category: 'Paramedical & Allied Health Science Council',
    logo: '/images/brand/aicpmf-logo.png',
    website: 'https://www.aicpmf.com',
    displayUrl: 'www.aicpmf.com',
    tagline: 'Autonomous Council for Paramedical & Health Science Education',
    description: 'Central council for health science and paramedical education established under Act 1882 and Section 20 Constitution of India, dedicated to standardizing allied health training, branch registrations, and student credentials across India.',
    recognition: 'Established Under Act 1882 & Constitution of India',
    location: 'Corporate: Kanpur, UP • Nangloi, New Delhi',
    featuredCourses: ['Diploma in Medical Lab Technology (DMLT)', 'Emergency Medical Technician', 'Radiology & Imaging', 'Allied Health Sciences']
  },
  {
    id: 'bayc',
    name: 'Bihar Acupressure Yoga College',
    shortName: 'BAYC Institute',
    category: 'Yoga, Acupressure & Alternative Medicine Institute',
    logo: '/images/brand/bayc-logo.png',
    website: 'https://www.bayc.in',
    displayUrl: 'www.bayc.in',
    tagline: 'Premier Acupressure, Yoga & Natural Therapeutics College',
    description: 'Pioneering educational institution in Patna, Bihar offering certified diploma, degree, and research programs in Acupressure therapy, Naturopathy, Yogic sciences, and drugless holistic healing.',
    recognition: 'Registered Alternative Therapy College & Research Center',
    location: 'Gandhi Setu Link Path, Patna – 800007, Bihar',
    featuredCourses: ['Certificate in Acupressure Therapy', 'Diploma in Yogic Science (DYS)', 'DNYS & Naturopathy Guidance', 'Acupressure Point Treatment Training']
  }
];
