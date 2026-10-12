import { siteConfig } from '@/data/siteConfig';

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function validateIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  // Exactly 10 digits starting with 6, 7, 8, or 9
  return /^[6-9]\d{9}$/.test(cleaned);
}

export function getWhatsAppUrl(message: string, phone: string = siteConfig.whatsapp): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const internationalPhone = cleanPhone.startsWith('91') && cleanPhone.length > 10 ? cleanPhone : `91${cleanPhone}`;
  return `https://wa.me/${internationalPhone}?text=${encodeURIComponent(message)}`;
}

export function getGeneralWhatsAppMessage(): string {
  return `Hello SAHI RAAH CONSULTANCY, I would like guidance regarding admission for Academic Session 2026-2027. Please share the available courses, eligibility requirements, fees, and admission process.`;
}

export function getCourseWhatsAppMessage(courseName: string): string {
  return `Hello SAHI RAAH CONSULTANCY, I am interested in admission guidance for ${courseName}. Please share details about eligible universities, duration, fee structure, and the admission process.`;
}

export function getUniversityWhatsAppMessage(universityName: string): string {
  return `Hello SAHI RAAH CONSULTANCY, I would like admission details for ${universityName}. Please share the available approved courses, recognition status, and fee details.`;
}

export function formatIndianPhone(phone: string): string {
  const clean = phone.replace(/\D/g, '');
  if (clean.length === 10) {
    return `+91 ${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return phone;
}
