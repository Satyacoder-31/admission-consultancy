import { AdmissionEnquiry, Course, University, SiteSettings } from '@/types';
import { initialCourses } from '@/data/courses';
import { initialUniversities, sortUniversitiesByPriority } from '@/data/universities';
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
    email: 'rahul.sah@gmail.com',
    state: 'Bihar',
    city: 'Raxaul',
    highestQualification: '12th Science (PCM)',
    yearOfPassing: '2025',
    interestedCourse: 'Bachelor of Technology (B.Tech Computer Science)',
    preferredUniversity: 'Jaipur National University',
    preferredMode: 'Regular',
    budget: '₹75,000/yr',
    admissionSession: '2026-2027',
    questions: 'Interested in CSE with AI specialization. Need hostel & Bihar Student Credit Card (BSCC) guidance.',
    status: 'New',
    priority: 'Urgent',
    followUpDate: '2026-10-15',
    source: 'Website Form',
    createdAt: '2026-10-14T18:30:00.000Z'
  },
  {
    id: 'enq-102',
    studentName: 'Anjali Sharma',
    mobileNumber: '9123456780',
    whatsappNumber: '9123456780',
    email: 'anjali.nursing@gmail.com',
    state: 'Bihar',
    city: 'Motihari',
    highestQualification: '12th Biology (PCB - 72%)',
    yearOfPassing: '2025',
    interestedCourse: 'B.Sc Nursing (4 Years)',
    preferredUniversity: 'Desh Bhagat University',
    preferredMode: 'Regular',
    budget: '₹90,000/yr',
    admissionSession: '2026-2027',
    questions: 'Need INC approval verification and clinical hospital attachment information.',
    status: 'Follow-Up',
    priority: 'High',
    followUpDate: '2026-10-16',
    source: 'WhatsApp',
    counselorNotes: [
      '14 Oct: Sent INC recognition certificate and college prospectus on WhatsApp.',
      '14 Oct: Candidate visited Kaurihar Chouk desk with father. Reviewing fee payment schedule.'
    ],
    createdAt: '2026-10-13T14:15:00.000Z'
  },
  {
    id: 'enq-103',
    studentName: 'Vikramaditya Prasad',
    mobileNumber: '9811223344',
    whatsappNumber: '9811223344',
    email: 'vikram.agri@gmail.com',
    state: 'Bihar',
    city: 'Bettiah (West Champaran)',
    highestQualification: 'B.Sc Agriculture (Hons.)',
    yearOfPassing: '2024',
    interestedCourse: 'M.Sc Agriculture in Agronomy',
    preferredUniversity: 'Vivekananda Global University',
    preferredMode: 'Regular',
    budget: '₹60,000/yr',
    admissionSession: '2026-2027',
    questions: 'Interested in Master thesis research fields and ICAR compliance.',
    status: 'Contacted',
    priority: 'Normal',
    followUpDate: '2026-10-17',
    source: 'Website Form',
    counselorNotes: ['13 Oct: Explained Agronomy specialization and farm research labs.'],
    createdAt: '2026-10-12T11:00:00.000Z'
  },
  {
    id: 'enq-104',
    studentName: 'Md. Tariq Anwar',
    mobileNumber: '9431876543',
    whatsappNumber: '9431876543',
    email: 'tariq.physio@gmail.com',
    state: 'Bihar',
    city: 'Raxaul',
    highestQualification: '10+2 Intermediate (PCB)',
    yearOfPassing: '2025',
    interestedCourse: 'Diploma in Physiotherapy (DPT)',
    preferredUniversity: 'Sanskriti University',
    preferredMode: 'Regular',
    budget: '₹45,000/yr',
    admissionSession: '2026-2027',
    questions: 'Want lateral entry into BPT after completing 2 years DPT.',
    status: 'New',
    priority: 'High',
    followUpDate: '2026-10-15',
    source: 'Walk-In Office',
    createdAt: '2026-10-14T09:20:00.000Z'
  },
  {
    id: 'enq-105',
    studentName: 'Pooja Pandey',
    mobileNumber: '9934112233',
    whatsappNumber: '9934112233',
    email: 'pooja.pandey@yahoo.com',
    state: 'Bihar',
    city: 'Sitamarhi',
    highestQualification: 'B.A (English Hons.)',
    yearOfPassing: '2023',
    interestedCourse: 'Bachelor of Education (B.Ed)',
    preferredUniversity: 'Subharti University',
    preferredMode: 'Regular',
    budget: '₹55,000/yr',
    admissionSession: '2026-2027',
    questions: 'Checking NCTE approval and Bihar Teacher Recruitment Examination (TRE) eligibility.',
    status: 'Converted',
    priority: 'Normal',
    source: 'Phone Call',
    counselorNotes: [
      '11 Oct: Verified NCTE code and state validity.',
      '14 Oct: Admission seat confirmed. Bonafide issued for student records.'
    ],
    createdAt: '2026-10-10T16:45:00.000Z'
  },
  {
    id: 'enq-106',
    studentName: 'Suresh Yadav',
    mobileNumber: '9835445566',
    whatsappNumber: '9835445566',
    email: 'suresh.yadav@gmail.com',
    state: 'Bihar',
    city: 'Raxaul (Nepal Border)',
    highestQualification: '12th Science (PCB)',
    yearOfPassing: '2024',
    interestedCourse: 'D.Pharma (Ayurveda)',
    preferredUniversity: 'Desh Bhagat University',
    preferredMode: 'Regular',
    budget: '₹50,000/yr',
    admissionSession: '2026-2027',
    questions: 'Need pharmacy council licensing information and retail medicine dispensary permissions.',
    status: 'Follow-Up',
    priority: 'High',
    followUpDate: '2026-10-16',
    source: 'WhatsApp',
    counselorNotes: ['12 Oct: Sent State Pharmacy Council registration guidelines.'],
    createdAt: '2026-10-13T10:10:00.000Z'
  }
];

export function getStoredCourses(): Course[] {
  if (typeof window === 'undefined') return initialCourses;
  try {
    const raw = localStorage.getItem(COURSES_KEY);
    if (!raw) {
      localStorage.setItem(COURSES_KEY, JSON.stringify(initialCourses));
      return initialCourses;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const existingIds = new Set(parsed.map((p: Course) => p.id));
      const missingInitial = initialCourses.filter(ic => !existingIds.has(ic.id));
      if (missingInitial.length > 0) {
        const merged = [...parsed, ...missingInitial];
        localStorage.setItem(COURSES_KEY, JSON.stringify(merged));
        return merged;
      }
      return parsed;
    }
    return initialCourses;
  } catch {
    return initialCourses;
  }
}

export function saveStoredCourses(courses: Course[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
    window.dispatchEvent(new CustomEvent('sr_data_updated', { detail: { type: 'courses', data: courses } }));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to save courses to localStorage', e);
  }
}

export function getStoredUniversities(): University[] {
  if (typeof window === 'undefined') return initialUniversities;
  try {
    const raw = localStorage.getItem(UNIVERSITIES_KEY);
    if (!raw) {
      const sortedInit = sortUniversitiesByPriority(initialUniversities);
      localStorage.setItem(UNIVERSITIES_KEY, JSON.stringify(sortedInit));
      return sortedInit;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Deduplicate by ID, slug, and name while preserving admin overrides and priority ordering
      const seenIds = new Set<string>();
      const seenNames = new Set<string>();
      const seenSlugs = new Set<string>();
      const cleanList: University[] = [];

      // 1. Process initialUniversities first, merging any admin overrides if present
      for (const iu of initialUniversities) {
        const normName = iu.name.toLowerCase().trim();
        const normSlug = (iu.slug || '').toLowerCase().trim();
        const matchingParsed = parsed.find(
          (p: any) =>
            p &&
            (p.id === iu.id ||
              (p.slug && p.slug.toLowerCase().trim() === normSlug) ||
              (p.name && p.name.toLowerCase().trim() === normName))
        );

        let merged: University;
        if (matchingParsed) {
          // Keep user's custom edits, but if priorityOrder wasn't customized, preserve canonical priorityOrder
          merged = {
            ...iu,
            ...matchingParsed,
            isPriority: matchingParsed.isPriority !== undefined ? matchingParsed.isPriority : iu.isPriority,
            priorityOrder: matchingParsed.priorityOrder !== undefined ? matchingParsed.priorityOrder : iu.priorityOrder
          };
        } else {
          merged = iu;
        }

        cleanList.push(merged);
        seenIds.add(merged.id);
        seenNames.add(merged.name.toLowerCase().trim());
        seenSlugs.add(merged.slug.toLowerCase().trim());
      }

      // 2. Append any custom admin-created universities not already in initialUniversities
      for (const p of parsed) {
        if (!p || !p.id || !p.name) continue;
        const normName = p.name.toLowerCase().trim();
        const normSlug = (p.slug || '').toLowerCase().trim();
        if (!seenIds.has(p.id) && !seenNames.has(normName) && !seenSlugs.has(normSlug)) {
          cleanList.push(p);
          seenIds.add(p.id);
          seenNames.add(normName);
          seenSlugs.add(normSlug);
        }
      }

      const sorted = sortUniversitiesByPriority(cleanList);
      localStorage.setItem(UNIVERSITIES_KEY, JSON.stringify(sorted));
      return sorted;
    }
    return sortUniversitiesByPriority(initialUniversities);
  } catch {
    return sortUniversitiesByPriority(initialUniversities);
  }
}

export function saveStoredUniversities(unis: University[]): void {
  if (typeof window === 'undefined') return;
  try {
    const sorted = sortUniversitiesByPriority(unis);
    localStorage.setItem(UNIVERSITIES_KEY, JSON.stringify(sorted));
    window.dispatchEvent(new CustomEvent('sr_data_updated', { detail: { type: 'universities', data: sorted } }));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to save universities to localStorage', e);
  }
}

export function setUniversityPriority(id: string, isPriority: boolean, priorityOrder?: number): University[] {
  const unis = getStoredUniversities();
  const updated = unis.map((u) => {
    if (u.id === id) {
      return {
        ...u,
        isPriority,
        priorityOrder: isPriority ? (priorityOrder ?? 1) : undefined
      };
    }
    return u;
  });
  const sorted = sortUniversitiesByPriority(updated);
  saveStoredUniversities(sorted);
  return sorted;
}

export function getStoredEnquiries(): AdmissionEnquiry[] {
  if (typeof window === 'undefined') return sampleEnquiries;
  try {
    const raw = localStorage.getItem(ENQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(sampleEnquiries));
      return sampleEnquiries;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : sampleEnquiries;
  } catch {
    return sampleEnquiries;
  }
}

export function saveStoredEnquiries(enquiries: AdmissionEnquiry[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ENQUIRIES_KEY, JSON.stringify(enquiries));
    window.dispatchEvent(new CustomEvent('sr_data_updated', { detail: { type: 'enquiries', data: enquiries } }));
    window.dispatchEvent(new Event('storage'));
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
    priority: enquiry.priority || 'Normal',
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
    if (!raw) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(siteConfig));
      return siteConfig;
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? { ...siteConfig, ...parsed } : siteConfig;
  } catch {
    return siteConfig;
  }
}

export function saveStoredSettings(settings: SiteSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('sr_data_updated', { detail: { type: 'settings', data: settings } }));
    window.dispatchEvent(new Event('storage'));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}
