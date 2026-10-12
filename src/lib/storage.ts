import { AdmissionEnquiry, Course, University, SiteSettings } from '@/types';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';
import { siteConfig } from '@/data/siteConfig';

const COURSES_KEY = 'sr_courses_data';
const UNIVERSITIES_KEY = 'sr_universities_data';
const ENQUIRIES_KEY = 'sr_enquiries_data';
const SETTINGS_KEY = 'sr_settings_data';

const sampleEnquiries: AdmissionEnquiry[] = [
  {
    id: 'enq-101',
    studentName: 'Rahul Kumar Sah',
    mobileNumber: '9876543210',
    whatsappNumber: '9876543210',
    email: 'rahul.sah@example.com',
    state: 'Bihar',
    city: 'Raxaul',
    highestQualification: '12th Science (PCM)',
    yearOfPassing: '2025',
    interestedCourse: 'Bachelor of Technology (B.Tech)',
    preferredUniversity: 'Dr. A.P.J. Abdul Kalam University',
    preferredMode: 'Regular',
    budget: '₹80,000/yr',
    admissionSession: '2026-2027',
    questions: 'Interested in Computer Science Engineering. Need hostel facility details.',
    status: 'New',
    createdAt: '2026-10-12T10:30:00.000Z'
  },
  {
    id: 'enq-102',
    studentName: 'Priya Kumari',
    mobileNumber: '9123456780',
    whatsappNumber: '9123456780',
    email: 'priya.k@example.com',
    state: 'Bihar',
    city: 'Motihari',
    highestQualification: 'B.Com',
    yearOfPassing: '2024',
    interestedCourse: 'Master of Business Administration (MBA)',
    preferredUniversity: 'ISBM University',
    preferredMode: 'Online',
    budget: '₹50,000/yr',
    admissionSession: '2026-2027',
    questions: 'Currently working in accounts. Need flexible online examination schedule.',
    status: 'Contacted',
    counselorNotes: ['Spoke on call on Oct 12. Sent MBA syllabus on WhatsApp.'],
    createdAt: '2026-10-11T14:15:00.000Z'
  },
  {
    id: 'enq-103',
    studentName: 'Amit Verma',
    mobileNumber: '9811223344',
    whatsappNumber: '9811223344',
    email: 'amit.verma@example.com',
    state: 'Bihar',
    city: 'Bettiah',
    highestQualification: '12th Biology (PCB)',
    yearOfPassing: '2025',
    interestedCourse: 'BNYS (Bachelor of Naturopathy & Yogic Sciences)',
    preferredUniversity: 'Saveetha Amaravati University',
    preferredMode: 'Regular',
    admissionSession: '2026-2027',
    questions: 'Want to know clinical hospital training and AYUSH registration norms.',
    status: 'Follow-Up',
    counselorNotes: ['Scheduled for in-person counseling at Raxaul office.'],
    createdAt: '2026-10-10T11:00:00.000Z'
  }
];

export function getStoredCourses(): Course[] {
  if (typeof window === 'undefined') return initialCourses;
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    return raw ? JSON.parse(raw) : initialCourses;
  } catch {
    return initialCourses;
  }
}

export function saveStoredCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  } catch (e) {
    console.error('Failed to save courses to localStorage', e);
  }
}

export function getStoredUniversities(): University[] {
  if (typeof window === 'undefined') return initialUniversities;
  try {
    const raw = localStorage.getItem(UNIVERSITIES_KEY);
    return raw ? JSON.parse(raw) : initialUniversities;
  } catch {
    return initialUniversities;
  }
}

export function saveStoredUniversities(unis: University[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(UNIVERSITIES_KEY, JSON.stringify(unis));
  } catch (e) {
    console.error('Failed to save universities to localStorage', e);
  }
}

export function getStoredEnquiries(): AdmissionEnquiry[] {
  if (typeof window === 'undefined') return sampleEnquiries;
  try {
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(sampleEnquiries));
      return sampleEnquiries;
    }
    return JSON.parse(raw);
  } catch {
    return sampleEnquiries;
  }
}

export function saveStoredEnquiries(enquiries: AdmissionEnquiry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
  } catch (e) {
    console.error('Failed to save enquiries to localStorage', e);
  }
}

export function addEnquiry(enquiry: Omit<AdmissionEnquiry, 'id' | 'status' | 'createdAt'>): AdmissionEnquiry {
  const all = getStoredEnquiries();
  const created: AdmissionEnquiry = {
    ...enquiry,
    id: `enq-${Date.now().toString().slice(-6)}`,
    status: 'New',
    createdAt: new Date().toISOString()
  };
  const updated = [created, ...all];
  saveStoredEnquiries(updated);
  return created;
}

export function getStoredSettings(): SiteSettings {
  if (typeof window === 'undefined') return siteConfig;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    return raw ? JSON.parse(raw) : siteConfig;
  } catch {
    return siteConfig;
  }
}

export function saveStoredSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}
