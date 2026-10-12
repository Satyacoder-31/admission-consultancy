export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Admissions' | 'Modes of Study' | 'Verification & Legitimacy' | 'Fees & Documents';
}

export const initialFaqs: FAQItem[] = [
  {
    category: 'General',
    question: 'What is the role of SAHI RAAH CONSULTANCY in the admission process?',
    answer: 'SAHI RAAH CONSULTANCY is a professional educational guidance and career counselling organisation located in Raxaul, Bihar. Our role is to help students explore verified courses, understand eligibility criteria, compare institutions, navigate documentation requirements, and submit legitimate admission applications. We do NOT replace the university admission board, nor do we issue academic credentials.'
  },
  {
    category: 'Verification & Legitimacy',
    question: 'How do you verify whether a university or degree is recognized?',
    answer: 'We adhere to a strict verification protocol. Before recommending an institution, our counsellors cross-reference its statutory enactment, UGC listing, and applicable professional regulatory approvals (such as AICTE for engineering, NCTE for teacher training, Ayush/State councils for naturopathy, and UGC-DEB for distance learning). If a course or mode is pending verification, we explicitly label it as "Verification Required".'
  },
  {
    category: 'Admissions',
    question: 'Can SAHI RAAH CONSULTANCY guarantee admission or job placement?',
    answer: 'No. As an ethical consultancy, we categorically NEVER guarantee admission, examination results, degrees, or government jobs. Final admission decisions rest exclusively with the respective university or educational board based on eligibility, documentation, and prevailing guidelines.'
  },
  {
    category: 'Modes of Study',
    question: 'What is the difference between Regular, Distance, and Online modes of study?',
    answer: 'Regular education involves daily physical campus attendance, laboratory sessions, and direct faculty interactions. Distance education provides self-instructional material and weekend contact sessions, suitable for learners needing flexibility. Online education is delivered via digital Learning Management Systems (LMS) with recorded/live video lectures. Note: Certain professional programmes (e.g. B.Tech, M.Tech, BNYS, PhD) are legally mandated by regulators to be pursued strictly in regular mode.'
  },
  {
    category: 'Modes of Study',
    question: 'Can working professionals complete their graduation through Distance or Online mode?',
    answer: 'Yes! Working professionals, defence personnel, and individuals who could not pursue regular college can enrol in UGC-DEB approved Distance or Online UG and PG degrees (such as BA, B.Com, BBA, MA, M.Com, MCA) that offer flexible study schedules.'
  },
  {
    category: 'Fees & Documents',
    question: 'What documents are required to start the admission guidance process?',
    answer: 'Standard documentation includes: (1) 10th Marksheet & Passing Certificate, (2) 12th Marksheet & Certificate (for UG/Diploma), (3) Graduation Marksheets & Degree (for PG/PGDCA), (4) Government Photo ID proof (Aadhaar Card), (5) Passport-size photographs, and (6) Migration or Transfer Certificate from the previous institution.'
  },
  {
    category: 'Fees & Documents',
    question: 'How are university tuition fees paid?',
    answer: 'Tuition and examination fees are paid directly to the respective university’s official bank account or university fee portal via demand draft or official online payment gateways. SAHI RAAH CONSULTANCY ensures transparent fee breakdowns and provides official university receipts.'
  },
  {
    category: 'Admissions',
    question: 'Can students from Nepal or outside Bihar get admission guidance in Raxaul?',
    answer: 'Yes! Raxaul is a prime border gateway to Nepal and North Bihar. We regularly assist students from Raxaul, Motihari, Bettiah, Birgunj, Kathmandu, and across India looking for verified educational opportunities in leading Indian universities.'
  },
  {
    category: 'Admissions',
    question: 'What is the current academic session for admission?',
    answer: 'We are currently assisting students for Academic Session 2026-2027 admissions, with advance registrations and lateral entry guidance open for upcoming cycles (including 2027-2028 where applicable).'
  }
];
