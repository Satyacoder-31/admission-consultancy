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
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.8521799298495!2d84.8523497!3d26.9792019!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399335a9f2430fa1%3A0x6b432168ec28a8d1!2sKaurihar%20Chowk%2C%20Raxaul%2C%20Bihar%20845305!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  googleMapsUrl: 'https://maps.app.goo.gl/nbti2tD4AMgATBuL7',
  socialLinks: {
    instagram: 'https://www.instagram.com/sahiraahconsultancy?mdxt=MTJ0YXAzZGp5cTJtdQ==',
    youtube: 'https://youtube.com/@sahiraahconsultancy?si=vw7zdvTVdjZmKYtD',
    facebook: 'https://www.facebook.com/share/1Ce1HJoUr1/',
    linkedin: 'https://www.linkedin.com/in/sahi-raah-178bb7444'
  }
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
    id: 'ugc',
    name: 'University Grants Commission',
    shortName: 'UGC Official',
    category: 'Apex Statutory Higher Education Commission of India',
    logo: '/images/brand/ugc-logo.png',
    websiteUrl: 'https://www.ugc.gov.in',
    tagline: 'Statutory Body Established by Govt. of India for University Standards',
    description: 'The University Grants Commission (UGC) is the statutory apex body enacted under the UGC Act 1956 by the Ministry of Education, Government of India. UGC maintains standards of teaching, research, and examinations across Central, State, Deemed, and Private universities in India, and notifies approved regular, online, and distance (DEB) institutions.',
    recognition: 'Statutory Body under Ministry of Education, Govt. of India (UGC Act 1956)',
    location: 'Bahadur Shah Zafar Marg, New Delhi – 110002, India',
    featuredCourses: ['Central & State Universities 2(f)/12(B) Directory', 'UGC-DEB Approved Distance & Online Degrees', 'National Equivalence & Qualification Recognition', 'Higher Education Research & Scholarships']
  },
  {
    id: 'cobse',
    name: 'Council of Boards of School Education in India',
    shortName: 'COBSE Official',
    category: 'Apex National Association of School Education Boards',
    logo: '/images/brand/cobse-logo.png',
    websiteUrl: 'https://www.cobse.org.in',
    tagline: 'National Association of Recognized Secondary & Senior Secondary Boards',
    description: 'The Council of Boards of School Education in India (COBSE) is the apex national body coordinating and confirming mutual recognition and equivalence among all authorized school education boards in India. COBSE membership guarantees pan-India validity of 10th (Matriculation) and 12th (Intermediate) certificates for higher studies, competitive exams, and government employment.',
    recognition: 'Apex National Organization of Recognized Boards in India',
    location: '6H, Bigjo’s Tower, A-8, Netaji Subhash Place, Pitampura, New Delhi – 110034',
    featuredCourses: ['Class 10th (Secondary) Board Equivalence', 'Class 12th (Senior Secondary) Board Recognition', 'Recognized Open Boards (BBOSE, BOSSE, TNSOS)', 'Pan-India Employment & Higher Education Validity']
  }
];

export const recognizedBoards = [
  {
    id: 'bbose',
    name: 'Bihar Board of Open Schooling & Examination (BBOSE)',
    shortName: 'BBOSE Bihar',
    nativeName: 'बिहार मुक्त विद्यालयी शिक्षण एवं परीक्षा बोर्ड',
    category: 'State Govt. Autonomous Open Schooling Board',
    logo: '/images/boards/bbose.png',
    badge: 'Govt. of Bihar Autonomous Board',
    tagline: 'मुक्त शिक्षा • सर्वत्र शिक्षा (Universal Education Across Bihar)',
    description: 'Autonomous open schooling organisation established under the Department of Education, Government of Bihar. Recognized by COBSE, Government of India, and Association of Indian Universities (AIU). Equivalent to other recognized regular boards for university admissions and central/state government employment.',
    recognition: 'Dept. of Education, Govt. of Bihar & Member of COBSE',
    location: 'Chanakya National Law University Campus, Nyaya Nagar, Mithapur, Patna – 800001',
    levels: ['Class 10th (Secondary)', 'Class 12th (Senior Secondary - Science, Arts, Commerce)'],
    features: [
      'COBSE & AIU recognized board credentials',
      'Transfer of Credit (TOC) for prior board subjects',
      'Valid for NEET, JEE, CUET & Government Exams',
      'Special support for dropouts & failed students'
    ]
  },
  {
    id: 'bosse',
    name: 'Board of Open Schooling & Skill Education (BOSSE)',
    shortName: 'B.O.S.S.E. Sikkim',
    category: 'Statutory State Board for Open & Skill Schooling',
    logo: '/images/boards/bosse.png',
    badge: 'State Legislative Act Board',
    tagline: 'Empowering Learners through Flexible & Skill-Oriented Education',
    description: 'Statutory open school board established by the Government of Sikkim under Act No. 14 of 2020. Recognized by AIU, NIOS, Pharmacy Council of India (PCI), and Indian universities. Offers flexible secondary, senior secondary, and vocational education pathways.',
    recognition: 'Established by Govt. of Sikkim Act No. 14 of 2020 & AIU Member',
    location: 'NH-10, Near Singtam, East Sikkim – 737134, Sikkim',
    levels: ['Class 10th (Secondary)', 'Class 12th (Senior Secondary)', 'Vocational & Skill Diplomas'],
    features: [
      'National recognition by AIU & Pharmacy Council of India',
      'Dual enrolment & flexible exam schedule options',
      'Integrated skill & vocational certification',
      'On-demand examination facility'
    ]
  },
  {
    id: 'tnsos',
    name: 'Tamil Nadu Open Board (TNSOS)',
    shortName: 'TNSOS Open Board',
    category: 'State Open Board for Universal Schooling',
    logo: '/images/boards/tnsos.png',
    badge: 'Open Schooling Initiative',
    tagline: 'Education For All • Equal Opportunity in Higher Education',
    description: 'Open schooling educational board designed to make secondary and senior secondary education universally accessible across India. Ideal for working candidates, distance learners, and school dropouts seeking legitimate 10th & 12th certification.',
    recognition: 'Autonomous Open Schooling Board • Universal Literacy Framework',
    location: 'Tamil Nadu, India',
    levels: ['Class 10th (Secondary)', 'Class 12th (Senior Secondary - Science, Commerce, Arts)'],
    features: [
      'Stream choices across Science, Commerce & Humanities',
      'Flexible study mode for working adults & gap students',
      'Transparent verification of marksheets & certificates',
      'Legitimate pathway for degree and diploma admissions'
    ]
  },
  {
    id: 'jamia-urdu',
    name: 'Jamia Urdu Aligarh',
    shortName: 'Jamia Urdu Aligarh',
    nativeName: 'جامعہ اردو علی گڑھ',
    category: 'Historic Recognized Autonomous Educational Board (Est. 1920)',
    logo: '/images/boards/jamia-urdu.png',
    badge: 'Centenary Board (Est. 1920)',
    tagline: 'Century-Old Heritage of Educational Excellence',
    description: 'Founded in 1920, Jamia Urdu Aligarh is a premier educational institution recognized as a Minority Educational Institution under Article 30 of the Constitution of India. Adeeb (10th) and Adeeb-e-Mahir (12th) certificates are recognized by NCMEI, Govt. of India, and prominent universities nationwide.',
    recognition: 'Established 1920 • Recognized by NCMEI, Govt. of India & Universities',
    location: 'Medical College Road, Aligarh – 202002, Uttar Pradesh',
    levels: ['Adeeb (High School / 10th Equivalent)', 'Adeeb-e-Mahir (Intermediate / 12th Equivalent)', 'Moallim-e-Urdu'],
    features: [
      '100+ Years historic educational legacy since 1920',
      'Recognized for higher studies in universities across India',
      'Adeeb & Adeeb-e-Mahir standard curriculum',
      'Simple candidate registration & verification framework'
    ]
  }
];

