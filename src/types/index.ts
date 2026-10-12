export type CourseCategory = 
  | 'Arts, Commerce & Science'
  | 'Management'
  | 'Engineering & Technology'
  | 'Computer Applications'
  | 'Library & Information Science'
  | 'Medical, Wellness & Research'
  | 'School-Level Education';

export type CourseLevel = 'UG' | 'PG' | 'Diploma' | 'Doctorate' | 'School';

export type StudyMode = 'Regular' | 'Distance' | 'Online' | 'Open Board';

export type VerificationStatus = 'Verified' | 'Verification Required' | 'Institutional Review';

export interface Course {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  category: CourseCategory;
  level: CourseLevel;
  duration: string;
  eligibility: string;
  modes: StudyMode[];
  description: string;
  careerProspects: string[];
  keySubjects: string[];
  approxFeePerYear?: string;
  regulatoryNote?: string;
  popular?: boolean;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  location: string;
  state: string;
  logo: string;
  established?: string;
  type: 'Private University' | 'State Private University' | 'Autonomous Institution' | 'Skill University';
  verificationStatus: VerificationStatus;
  accreditationNote: string;
  modesOffered: StudyMode[];
  availableCourseIds: string[];
  campusFeatures: string[];
  summary: string;
  address: string;
  websiteNote?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Follow-Up' | 'Converted' | 'Closed';

export interface AdmissionEnquiry {
  id: string;
  studentName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email?: string;
  state: string;
  city: string;
  highestQualification: string;
  yearOfPassing: string;
  interestedCourse: string;
  preferredUniversity?: string;
  preferredMode: 'Regular' | 'Distance' | 'Online' | 'Open Board';
  budget?: string;
  admissionSession: string;
  questions?: string;
  status: LeadStatus;
  counselorNotes?: string[];
  createdAt: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  activeSessions: string[];
  defaultSession: string;
  officeHours: string;
  googleMapsEmbedUrl: string;
}
