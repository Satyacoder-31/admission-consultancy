'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  getStoredCourses, 
  saveStoredCourses, 
  getStoredUniversities, 
  saveStoredUniversities, 
  getStoredEnquiries, 
  saveStoredEnquiries,
  getStoredSettings, 
  saveStoredSettings,
  addEnquiry
} from '@/lib/storage';
import { Course, University, AdmissionEnquiry, LeadStatus, VerificationStatus, CourseCategory, StudyMode } from '@/types';
import { siteConfig } from '@/data/siteConfig';
import { formatIndianPhone, getWhatsAppUrl } from '@/lib/utils';
import { 
  Users, 
  BookOpen, 
  Building2, 
  Settings, 
  LogOut, 
  Download, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  ExternalLink,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  UserPlus,
  FileText,
  Eye,
  Send,
  Clock,
  Filter,
  Layers,
  ListChecks,
  CheckCircle2,
  X,
  CreditCard,
  MapPin,
  GraduationCap,
  Printer,
  FileCheck
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'courses' | 'universities' | 'toolkit' | 'settings'>('overview');

  // Main Data States
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [settings, setSettings] = useState(siteConfig);

  // Filters for Leads CRM
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [streamFilter, setStreamFilter] = useState<string>('All');

  // Filters for Courses
  const [courseSearch, setCourseSearch] = useState('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<string>('All');

  // Filters for Universities
  const [uniSearch, setUniSearch] = useState('');
  const [uniStateFilter, setUniStateFilter] = useState<string>('All');

  // Modals
  const [selectedEnquiry, setSelectedEnquiry] = useState<AdmissionEnquiry | null>(null);
  const [walkInModalOpen, setWalkInModalOpen] = useState(false);
  const [whatsAppModalLead, setWhatsAppModalLead] = useState<AdmissionEnquiry | null>(null);
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [editingUni, setEditingUni] = useState<University | null>(null);

  // University Form State
  const [uniForm, setUniForm] = useState({
    name: '',
    shortName: '',
    location: '',
    state: 'Bihar',
    logo: '/images/hero-admission-1.jpg',
    established: '2015',
    type: 'State Private University' as University['type'],
    verificationStatus: 'Verified' as VerificationStatus,
    accreditationNote: 'UGC Approved Section 2(f)',
    summary: '',
    address: '',
    websiteNote: '',
    modesOffered: ['Regular', 'Distance'] as StudyMode[],
    availableCourseIds: [] as string[]
  });

  // New Walk-in Lead Form State
  const [newLeadForm, setNewLeadForm] = useState({
    studentName: '',
    mobileNumber: '',
    whatsappNumber: '',
    email: '',
    city: 'Raxaul',
    state: 'Bihar',
    highestQualification: '12th Science',
    yearOfPassing: '2025',
    interestedCourse: 'Diploma in Physiotherapy (DPT)',
    preferredUniversity: 'Jaipur National University',
    preferredMode: 'Regular' as const,
    budget: '₹50,000/yr',
    admissionSession: '2026-2027',
    priority: 'Normal' as const,
    questions: '',
    source: 'Walk-In Office'
  });

  // Course Form State
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    name: '',
    shortName: '',
    category: 'Paramedical & Allied Health',
    level: 'Diploma',
    duration: '2 Years',
    eligibility: '',
    approxFeePerYear: '₹40,000/yr',
    description: '',
    modes: ['Regular']
  });

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('sr_admin_auth');
    if (!auth) {
      router.push('/admin');
      return;
    }

    setEnquiries(getStoredEnquiries());
    setCourses(getStoredCourses());
    setUniversities(getStoredUniversities());
    setSettings(getStoredSettings());

    const handleSync = () => {
      setEnquiries(getStoredEnquiries());
      setCourses(getStoredCourses());
      setUniversities(getStoredUniversities());
      setSettings(getStoredSettings());
    };

    window.addEventListener('storage', handleSync);
    window.addEventListener('sr_data_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('sr_data_updated', handleSync);
    };
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('sr_admin_auth');
    sessionStorage.removeItem('sr_admin_token');
    router.push('/admin');
  };

  // Lead Actions
  const handleUpdateLeadStatus = (id: string, newStatus: LeadStatus) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    setEnquiries(updated);
    saveStoredEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    showToast(`Lead status updated to ${newStatus}`);
  };

  const handleUpdatePriority = (id: string, newPriority: 'Urgent' | 'High' | 'Normal') => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, priority: newPriority } : enq
    );
    setEnquiries(updated);
    saveStoredEnquiries(updated);
    showToast(`Priority tagged as ${newPriority}`);
  };

  const handleAddNote = (id: string, noteText?: string) => {
    const note = noteText || prompt('Enter counsellor interaction note:');
    if (!note || !note.trim()) return;

    const timeString = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });

    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        const notes = enq.counselorNotes || [];
        return {
          ...enq,
          counselorNotes: [...notes, `${timeString}: ${note.trim()}`]
        };
      }
      return enq;
    });

    setEnquiries(updated);
    saveStoredEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      const notes = selectedEnquiry.counselorNotes || [];
      setSelectedEnquiry({
        ...selectedEnquiry,
        counselorNotes: [...notes, `${timeString}: ${note.trim()}`]
      });
    }
    showToast('Counsellor note logged');
  };

  const MANDATORY_DOCS = [
    '10th Matriculation Marksheet & Passing Certificate',
    '12th Intermediate Marksheet & Migration / TC',
    'Aadhaar Card (Student + Parent)',
    'Residential / Domicile Certificate (Bihar Government)',
    'Bank Account Passbook with IFSC',
    'Passport Size Photographs (6 Copies)'
  ];

  const handleToggleDocument = (id: string, docName: string) => {
    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        const currentDocs = enq.verifiedDocuments || [];
        const newDocs = currentDocs.includes(docName)
          ? currentDocs.filter((d) => d !== docName)
          : [...currentDocs, docName];
        return {
          ...enq,
          verifiedDocuments: newDocs
        };
      }
      return enq;
    });

    setEnquiries(updated);
    saveStoredEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      const currentDocs = selectedEnquiry.verifiedDocuments || [];
      const newDocs = currentDocs.includes(docName)
        ? currentDocs.filter((d) => d !== docName)
        : [...currentDocs, docName];
      setSelectedEnquiry({
        ...selectedEnquiry,
        verifiedDocuments: newDocs
      });
    }
  };

  const handlePrintDossierReceipt = (enq: AdmissionEnquiry) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const docs = enq.verifiedDocuments || [];
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Admission Document Receipt - ${enq.studentName}</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #1e293b; line-height: 1.5; }
            .header { border-bottom: 2px solid #082B59; padding-bottom: 15px; margin-bottom: 20px; text-align: center; }
            .title { font-size: 20px; font-weight: 800; color: #082B59; margin: 0; text-transform: uppercase; }
            .subtitle { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
            .badge { display: inline-block; padding: 4px 10px; background: #e0f2fe; color: #0369a1; border-radius: 9999px; font-size: 11px; font-weight: bold; margin-top: 6px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; font-size: 13px; }
            .grid div { background: #f8fafc; padding: 8px 12px; border-radius: 6px; border: 1px solid #e2e8f0; }
            .label { font-size: 10px; color: #64748b; text-transform: uppercase; font-weight: bold; display: block; }
            .value { font-weight: 700; color: #0f172a; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
            .table th, .table td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
            .table th { background: #082B59; color: white; }
            .status-rec { color: #15803d; font-weight: bold; }
            .status-pen { color: #b45309; font-weight: bold; }
            .footer { margin-top: 40px; display: flex; justify-content: space-between; font-size: 12px; padding-top: 20px; border-top: 1px dashed #cbd5e1; }
            .sig { text-align: center; width: 180px; }
            .sig-line { border-top: 1px solid #0f172a; margin-top: 40px; padding-top: 4px; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">SAHI RAAH CONSULTANCY</h1>
            <p class="subtitle">Kaurihar Chouk, Near Railway Crossing, Raxaul (East Champaran), Bihar • Helpline: 8092911956</p>
            <div class="badge">Official Admission File Document Receipt & Audit Slip</div>
          </div>
          <div class="grid">
            <div><span class="label">Candidate Name:</span><span class="value">${enq.studentName}</span></div>
            <div><span class="label">Application / Ref ID:</span><span class="value">${enq.id}</span></div>
            <div><span class="label">Course & Mode:</span><span class="value">${enq.interestedCourse} (${enq.preferredMode})</span></div>
            <div><span class="label">Registered Phone:</span><span class="value">${enq.mobileNumber}</span></div>
            <div><span class="label">Preferred University:</span><span class="value">${enq.preferredUniversity || 'University Directory Matching'}</span></div>
            <div><span class="label">Date of Verification:</span><span class="value">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
          </div>
          <h3 style="font-size: 14px; margin: 15px 0 5px 0;">Document Audit Status (${docs.length}/6 Collected)</h3>
          <table class="table">
            <thead><tr><th>#</th><th>Document Name</th><th>Status</th><th>Notes</th></tr></thead>
            <tbody>
              ${MANDATORY_DOCS.map((doc, i) => {
                const received = docs.includes(doc);
                return `<tr>
                  <td>${i + 1}</td>
                  <td><strong>${doc}</strong></td>
                  <td class="${received ? 'status-rec' : 'status-pen'}">${received ? '✓ RECEIVED & VERIFIED' : '⏳ PENDING SUBMISSION'}</td>
                  <td>${received ? 'Self-attested copy on file' : 'To be submitted before final admission'}</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
          <div class="footer">
            <div class="sig"><div class="sig-line">Candidate / Parent Signature</div></div>
            <div class="sig"><div class="sig-line">Authorized Counsellor Seal & Sign</div></div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handlePrintBlankChecklist = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Student Admission File Document Checklist - Blank</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; padding: 30px; color: #1e293b; line-height: 1.5; }
            .header { border-bottom: 2px solid #082B59; padding-bottom: 12px; margin-bottom: 20px; text-align: center; }
            .title { font-size: 20px; font-weight: 800; color: #082B59; margin: 0; text-transform: uppercase; }
            .subtitle { font-size: 12px; color: #64748b; margin: 4px 0 0 0; }
            .box { border: 1px solid #cbd5e1; padding: 12px; border-radius: 6px; margin-bottom: 20px; }
            .fields { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 13px; }
            .line { border-bottom: 1px dashed #94a3b8; height: 20px; margin-top: 4px; }
            .table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 13px; }
            .table th, .table td { border: 1px solid #94a3b8; padding: 10px 12px; text-align: left; }
            .table th { background: #082B59; color: white; }
            .checkbox { width: 22px; height: 22px; border: 2px solid #082B59; display: inline-block; border-radius: 4px; }
            .footer { margin-top: 50px; display: flex; justify-content: space-between; font-size: 12px; }
            .sig { text-align: center; width: 200px; }
            .sig-line { border-top: 1px solid #0f172a; margin-top: 40px; padding-top: 4px; font-size: 11px; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">SAHI RAAH CONSULTANCY</h1>
            <p class="subtitle">Kaurihar Chouk, Near Railway Crossing, Raxaul (East Champaran), Bihar • Helpline: 8092911956</p>
            <h2 style="font-size: 14px; margin: 6px 0 0 0; color: #b45309;">Candidate Admission Folder — Document Verification Checklist</h2>
          </div>
          <div class="box">
            <div class="fields">
              <div>Student Full Name: <div class="line"></div></div>
              <div>Contact Mobile No.: <div class="line"></div></div>
              <div>Course Enrolled: <div class="line"></div></div>
              <div>Allotted University: <div class="line"></div></div>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr><th style="width: 50px;">Verify</th><th>Mandatory Document Name</th><th>Copies / Type</th><th>Verification Remarks</th></tr>
            </thead>
            <tbody>
              ${MANDATORY_DOCS.map((doc, i) => `<tr>
                <td style="text-align: center;"><div class="checkbox"></div></td>
                <td><strong>${doc}</strong></td>
                <td>Original + 2 Xerox</td>
                <td></td>
              </tr>`).join('')}
            </tbody>
          </table>
          <div class="footer">
            <div class="sig"><div class="sig-line">Student / Parent Signature</div></div>
            <div class="sig"><div class="sig-line">Verifying Counsellor Seal & Sign</div></div>
          </div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
      </html>
    `;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  const handleDeleteLead = (id: string) => {
    if (!confirm('Are you sure you want to remove this lead record?')) return;
    const updated = enquiries.filter((e) => e.id !== id);
    setEnquiries(updated);
    saveStoredEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry(null);
    }
    showToast('Lead record removed');
  };

  // Walk-in Candidate Submission
  const handleSaveWalkInLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.studentName || !newLeadForm.mobileNumber) {
      alert('Please provide student name and mobile number');
      return;
    }

    const created = addEnquiry({
      studentName: newLeadForm.studentName,
      mobileNumber: newLeadForm.mobileNumber,
      whatsappNumber: newLeadForm.whatsappNumber || newLeadForm.mobileNumber,
      email: newLeadForm.email,
      city: newLeadForm.city,
      state: newLeadForm.state,
      highestQualification: newLeadForm.highestQualification,
      yearOfPassing: newLeadForm.yearOfPassing,
      interestedCourse: newLeadForm.interestedCourse,
      preferredUniversity: newLeadForm.preferredUniversity,
      preferredMode: newLeadForm.preferredMode,
      budget: newLeadForm.budget,
      admissionSession: newLeadForm.admissionSession,
      priority: newLeadForm.priority,
      questions: newLeadForm.questions,
      source: 'Walk-In Office',
      counselorNotes: [`${new Date().toLocaleDateString('en-IN')}: Candidate visited Kaurihar Chouk Raxaul centre.`]
    });

    setEnquiries([created, ...enquiries]);
    setWalkInModalOpen(false);
    setNewLeadForm({
      studentName: '',
      mobileNumber: '',
      whatsappNumber: '',
      email: '',
      city: 'Raxaul',
      state: 'Bihar',
      highestQualification: '12th Science',
      yearOfPassing: '2025',
      interestedCourse: 'Diploma in Physiotherapy (DPT)',
      preferredUniversity: 'Jaipur National University',
      preferredMode: 'Regular',
      budget: '₹50,000/yr',
      admissionSession: '2026-2027',
      priority: 'Normal',
      questions: '',
      source: 'Walk-In Office'
    });
    showToast('Walk-in candidate registered successfully!');
  };

  // Course Management Save
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.name || !courseForm.shortName) {
      alert('Course name and short code are required.');
      return;
    }

    if (editingCourse) {
      const updated = courses.map((c) =>
        c.id === editingCourse.id ? ({ ...c, ...courseForm } as Course) : c
      );
      setCourses(updated);
      saveStoredCourses(updated);
      showToast(`Updated course ${courseForm.name}`);
    } else {
      const newCourse: Course = {
        id: `c-custom-${Date.now()}`,
        slug: (courseForm.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: courseForm.name || '',
        shortName: courseForm.shortName || '',
        category: courseForm.category as CourseCategory || 'Arts, Commerce & Science',
        level: courseForm.level || 'UG',
        duration: courseForm.duration || '3 Years',
        eligibility: courseForm.eligibility || '10+2 from recognized board',
        modes: courseForm.modes || ['Regular'],
        description: courseForm.description || `Specialized course guidance for ${courseForm.name}.`,
        approxFeePerYear: courseForm.approxFeePerYear || 'Variable',
        careerProspects: ['Corporate Careers', 'Public Sector & Higher Studies'],
        keySubjects: ['Core Discipline Modules', 'Practical Training'],
        popular: true
      };
      const updated = [newCourse, ...courses];
      setCourses(updated);
      saveStoredCourses(updated);
      showToast(`Added new course ${newCourse.name}`);
    }

    setCourseModalOpen(false);
    setEditingCourse(null);
  };

  // University Management Handlers
  const handleOpenAddUni = () => {
    setEditingUni(null);
    setUniForm({
      name: '',
      shortName: '',
      location: '',
      state: 'Bihar',
      logo: '/images/hero-admission-1.jpg',
      established: '2015',
      type: 'State Private University',
      verificationStatus: 'Verified',
      accreditationNote: 'UGC Approved Section 2(f)',
      summary: '',
      address: '',
      websiteNote: '',
      modesOffered: ['Regular', 'Distance'],
      availableCourseIds: courses.slice(0, 4).map((c) => c.id)
    });
    setUniModalOpen(true);
  };

  const handleOpenEditUni = (u: University) => {
    setEditingUni(u);
    setUniForm({
      name: u.name,
      shortName: u.shortName,
      location: u.location,
      state: u.state,
      logo: u.logo || '/images/hero-admission-1.jpg',
      established: u.established || '2015',
      type: u.type,
      verificationStatus: u.verificationStatus,
      accreditationNote: u.accreditationNote,
      summary: u.summary,
      address: u.address,
      websiteNote: u.websiteNote || '',
      modesOffered: u.modesOffered || ['Regular'],
      availableCourseIds: u.availableCourseIds || []
    });
    setUniModalOpen(true);
  };

  const handleDeleteUni = (id: string, name: string) => {
    if (!confirm(`Are you sure you want to remove ${name} from partner universities?`)) return;
    const updated = universities.filter((u) => u.id !== id);
    setUniversities(updated);
    saveStoredUniversities(updated);
    showToast(`Removed ${name} from partner institutions`);
  };

  const handleSaveUni = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uniForm.name.trim()) return;

    if (editingUni) {
      const updated = universities.map((u) => {
        if (u.id === editingUni.id) {
          return {
            ...u,
            ...uniForm,
            slug: u.slug || uniForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          };
        }
        return u;
      });
      setUniversities(updated);
      saveStoredUniversities(updated);
      showToast(`Updated ${uniForm.name} successfully`);
    } else {
      const slug = uniForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const newUni: University = {
        id: `uni-${Date.now().toString().slice(-6)}`,
        slug: slug || `uni-${Date.now()}`,
        name: uniForm.name,
        shortName: uniForm.shortName || uniForm.name.slice(0, 8),
        location: uniForm.location || `${uniForm.state}, India`,
        state: uniForm.state,
        logo: uniForm.logo || '/images/hero-admission-1.jpg',
        established: uniForm.established,
        type: uniForm.type,
        verificationStatus: uniForm.verificationStatus,
        accreditationNote: uniForm.accreditationNote || 'UGC Approved',
        summary: uniForm.summary || `${uniForm.name} is a partner university offering accredited degree programs.`,
        address: uniForm.address || `${uniForm.location}, ${uniForm.state}`,
        websiteNote: uniForm.websiteNote,
        modesOffered: uniForm.modesOffered.length > 0 ? uniForm.modesOffered : ['Regular'],
        availableCourseIds: uniForm.availableCourseIds.length > 0 ? uniForm.availableCourseIds : courses.slice(0, 3).map((c) => c.id),
        campusFeatures: ['Modern Academic Campus', 'Digital Library', 'Hostel Facilities', 'Career Placement Cell']
      };
      const updated = [newUni, ...universities];
      setUniversities(updated);
      saveStoredUniversities(updated);
      showToast(`Added ${newUni.name} to university directory`);
    }

    setUniModalOpen(false);
  };

  // CSV Export
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      alert('No enquiries to export.');
      return;
    }

    const headers = [
      'Enquiry ID',
      'Date',
      'Student Name',
      'Mobile Number',
      'WhatsApp Number',
      'Email',
      'State',
      'City',
      'Highest Qualification',
      'Year of Passing',
      'Interested Course',
      'Preferred University',
      'Study Mode',
      'Budget',
      'Session',
      'Lead Status',
      'Priority',
      'Source',
      'Questions',
      'Counsellor Notes'
    ];

    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleDateString('en-IN'),
      `"${(e.studentName || '').replace(/"/g, '""')}"`,
      `"${e.mobileNumber}"`,
      `"${e.whatsappNumber || ''}"`,
      `"${e.email || ''}"`,
      `"${e.state}"`,
      `"${e.city}"`,
      `"${e.highestQualification}"`,
      `"${e.yearOfPassing}"`,
      `"${(e.interestedCourse || '').replace(/"/g, '""')}"`,
      `"${e.preferredUniversity || ''}"`,
      `"${e.preferredMode}"`,
      `"${e.budget || ''}"`,
      `"${e.admissionSession}"`,
      `"${e.status}"`,
      `"${e.priority || 'Normal'}"`,
      `"${e.source || 'Website'}"`,
      `"${(e.questions || '').replace(/"/g, '""')}"`,
      `"${(e.counselorNotes?.join(' | ') || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sahi_raah_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Student leads exported to CSV!');
  };

  // KPI Calculations
  const stats = useMemo(() => {
    const total = enquiries.length;
    const newLeads = enquiries.filter((e) => e.status === 'New').length;
    const contacted = enquiries.filter((e) => e.status === 'Contacted').length;
    const followUp = enquiries.filter((e) => e.status === 'Follow-Up').length;
    const converted = enquiries.filter((e) => e.status === 'Converted').length;
    const closed = enquiries.filter((e) => e.status === 'Closed').length;
    const conversionRate = total > 0 ? Math.round((converted / total) * 100) : 0;
    const urgentCount = enquiries.filter((e) => e.priority === 'Urgent' || e.priority === 'High').length;

    // Stream distribution counts
    const paramedicalCount = enquiries.filter((e) => /physio|dpt|mpt|bpt|dmlt|bmlt|paramedical/i.test(e.interestedCourse)).length;
    const nursingCount = enquiries.filter((e) => /nursing|gnm|anm/i.test(e.interestedCourse)).length;
    const pharmacyCount = enquiries.filter((e) => /pharma/i.test(e.interestedCourse)).length;
    const agricultureCount = enquiries.filter((e) => /agri|agronomy/i.test(e.interestedCourse)).length;
    const techCount = enquiries.filter((e) => /tech|bca|mca|engineering|diploma/i.test(e.interestedCourse)).length;
    const mgmtCount = enquiries.filter((e) => /mba|bba|management/i.test(e.interestedCourse)).length;
    const teachingCount = enquiries.filter((e) => /b\.ed|d\.el\.ed|education/i.test(e.interestedCourse)).length;

    return {
      total,
      newLeads,
      contacted,
      followUp,
      converted,
      closed,
      conversionRate,
      urgentCount,
      streams: {
        paramedicalCount,
        nursingCount,
        pharmacyCount,
        agricultureCount,
        techCount,
        mgmtCount,
        teachingCount
      }
    };
  }, [enquiries]);

  // Filtered Leads
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchSearch =
        e.studentName.toLowerCase().includes(leadSearch.toLowerCase()) ||
        e.mobileNumber.includes(leadSearch) ||
        e.interestedCourse.toLowerCase().includes(leadSearch.toLowerCase()) ||
        e.city.toLowerCase().includes(leadSearch.toLowerCase());

      const matchStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchPriority = priorityFilter === 'All' || e.priority === priorityFilter;
      const matchStream =
        streamFilter === 'All' ||
        e.interestedCourse.toLowerCase().includes(streamFilter.toLowerCase());

      return matchSearch && matchStatus && matchPriority && matchStream;
    });
  }, [enquiries, leadSearch, statusFilter, priorityFilter, streamFilter]);

  // Filtered Courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
        c.shortName.toLowerCase().includes(courseSearch.toLowerCase()) ||
        c.duration.toLowerCase().includes(courseSearch.toLowerCase());

      const matchCat = courseCategoryFilter === 'All' || c.category === courseCategoryFilter;
      return matchSearch && matchCat;
    });
  }, [courses, courseSearch, courseCategoryFilter]);

  // Filtered Universities
  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(uniSearch.toLowerCase()) ||
        u.shortName.toLowerCase().includes(uniSearch.toLowerCase()) ||
        u.location.toLowerCase().includes(uniSearch.toLowerCase());

      const matchState = uniStateFilter === 'All' || u.state === uniStateFilter;
      return matchSearch && matchState;
    });
  }, [universities, uniSearch, uniStateFilter]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Header & Executive Navigation Bar */}
      <header className="bg-[#051D3C] text-white px-4 sm:px-6 py-3 border-b border-amber-400/30 sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-white p-1 border-2 border-amber-400 overflow-hidden flex-shrink-0">
              <Image
                src="/images/brand/logo.jpg"
                alt="SAHI RAAH Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-base font-black tracking-wide text-white uppercase">
                  SAHI RAAH
                </h1>
                <span className="text-[10px] font-black bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-2 py-0.5 rounded-full shadow-sm">
                  Executive CMS 2.0
                </span>
              </div>
              <p className="text-[11px] text-teal-300 font-medium hidden sm:block">
                Counsellor Desk & Admission Control Center • Kaurihar Chouk, Raxaul
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Quick Register Walk-In Button */}
            <button
              onClick={() => setWalkInModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-amber-500 text-slate-950 text-xs font-bold shadow-md transition-all cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>+ Register Walk-In</span>
            </button>

            {/* Live Website Link */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium border border-white/20 transition-colors"
              title="Open Public Website"
            >
              <span className="hidden sm:inline">Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-300" />
            </Link>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold border border-red-500/30 transition-colors cursor-pointer"
              title="Logout from Admin Panel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-16 right-6 z-50 bg-[#082B59] text-amber-300 px-4 py-2.5 rounded-xl border border-amber-400/50 shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Primary Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Overview & Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'leads'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-teal-400" />
            <span>Student Leads CRM ({enquiries.length})</span>
            {stats.newLeads > 0 && (
              <span className="ml-1 bg-amber-400 text-slate-950 px-1.5 py-0.2 rounded-full text-[10px] font-black">
                {stats.newLeads}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'courses'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>Courses Directory ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'universities'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4 text-emerald-400" />
            <span>Partner Universities ({universities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('toolkit')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'toolkit'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ListChecks className="w-4 h-4 text-purple-400" />
            <span>BSCC & Counsellor Toolkit</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'settings'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Centre Settings</span>
          </button>
        </div>

        {/* ============================================================== */}
        {/* TAB 1: OVERVIEW & ANALYTICS                                    */}
        {/* ============================================================== */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top KPI Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Inquiries</span>
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900">{stats.total}</div>
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Session 2026–2028 Pipeline</span>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-amber-300 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-amber-50/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">New Inquiries (Inbox)</span>
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-amber-600">{stats.newLeads}</div>
                <div className="mt-2 text-xs text-amber-800 font-medium">
                  {stats.newLeads > 0 ? '⚠️ Immediate callback needed' : 'All leads contacted!'}
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Follow-Ups</span>
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-purple-700">{stats.followUp + stats.contacted}</div>
                <div className="mt-2 text-xs text-slate-500 font-medium">
                  {stats.urgentCount} high priority cases
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm relative overflow-hidden bg-gradient-to-br from-white to-emerald-50/40">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Converted / Enrolled</span>
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-600">{stats.converted}</div>
                <div className="mt-2 flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span>Conversion Rate:</span>
                  <span className="bg-emerald-200 px-2 py-0.5 rounded text-[11px]">{stats.conversionRate}%</span>
                </div>
              </div>
            </div>

            {/* Pipeline Funnel & Stream Demand Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Lead Funnel (7 cols) */}
              <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-teal-600" />
                      <span>Admission Funnel Pipeline</span>
                    </h3>
                    <p className="text-xs text-slate-500">Live candidate stages from inquiry to seat confirmation</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">Total: {stats.total} Leads</span>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-blue-900">1. New Inquiries</span>
                      <span className="text-slate-600">{stats.newLeads} leads ({stats.total > 0 ? Math.round((stats.newLeads / stats.total) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.total > 0 ? (stats.newLeads / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-yellow-900">2. Contacted / Counseling Scheduled</span>
                      <span className="text-slate-600">{stats.contacted} leads ({stats.total > 0 ? Math.round((stats.contacted / stats.total) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-amber-400 h-full rounded-full transition-all duration-500" style={{ width: `${stats.total > 0 ? (stats.contacted / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-purple-900">3. In Active Follow-Up & Document Verification</span>
                      <span className="text-slate-600">{stats.followUp} leads ({stats.total > 0 ? Math.round((stats.followUp / stats.total) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.total > 0 ? (stats.followUp / stats.total) * 100 : 0}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-emerald-900">4. Converted / Seat Booked</span>
                      <span className="text-emerald-700 font-extrabold">{stats.converted} confirmed ({stats.conversionRate}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${stats.conversionRate}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <span>💡 Tip: Contact leads within 30 minutes of inquiry for maximum conversion in Champaran.</span>
                  <button onClick={() => setActiveTab('leads')} className="text-teal-700 font-bold hover:underline">
                    View Leads Table →
                  </button>
                </div>
              </div>

              {/* Right: Stream-Wise Demand Breakdown (5 cols) */}
              <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>Course Discipline Demand</span>
                  </h3>
                  <p className="text-xs text-slate-500">Student interest breakdown across faculties</p>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                      <span className="font-semibold text-slate-800">Paramedical & Physiotherapy (DPT/BPT/MPT)</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.streams.paramedicalCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="font-semibold text-slate-800">Nursing (B.Sc, GNM, ANM, M.Sc)</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.streams.nursingCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span className="font-semibold text-slate-800">Pharmacy & Ayurveda (B.Pharm/D.Pharm)</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.streams.pharmacyCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-lime-600" />
                      <span className="font-semibold text-slate-800">Agriculture & Agronomy (B.Sc / M.Sc)</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.streams.agricultureCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      <span className="font-semibold text-slate-800">Engineering & Technology (B.Tech / Poly)</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.streams.techCount}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                      <span className="font-semibold text-slate-800">Education & Teaching (B.Ed / D.El.Ed)</span>
                    </div>
                    <span className="font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">{stats.streams.teachingCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Today: Urgent Follow-Ups */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>Priority Leads Requiring Immediate Counsellor Action</span>
                  </h3>
                  <p className="text-xs text-slate-500">Candidates with Urgent or High priority status</p>
                </div>
                <button
                  onClick={() => setWalkInModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-sm cursor-pointer"
                >
                  + Add Walk-In Student
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {enquiries.filter((e) => (e.priority === 'Urgent' || e.priority === 'High') && e.status !== 'Closed').length === 0 ? (
                  <div className="col-span-full p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2 opacity-80" />
                    <p className="text-xs font-bold text-slate-700">No Urgent or High Priority Leads Pending</p>
                    <p className="text-[11px] text-slate-500 mt-1 max-w-md mx-auto">
                      All new student enquiries default to Normal priority. You can escalate any lead to High or Urgent from the Student Leads CRM tab below.
                    </p>
                  </div>
                ) : (
                  enquiries
                    .filter((e) => (e.priority === 'Urgent' || e.priority === 'High') && e.status !== 'Closed')
                    .slice(0, 6)
                    .map((lead) => (
                      <div
                        key={lead.id}
                        className="p-4 rounded-2xl border border-slate-200 hover:border-amber-400 bg-slate-50/70 hover:bg-white transition-all space-y-3"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-bold text-sm text-slate-900">{lead.studentName}</h4>
                            <span className="text-[11px] text-slate-500 block">📍 {lead.city}, {lead.state}</span>
                          </div>
                          <span
                            className={`text-[10px] font-black px-2 py-0.5 rounded-full uppercase ${
                              lead.priority === 'Urgent'
                                ? 'bg-red-100 text-red-700 border border-red-300'
                                : 'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}
                          >
                            {lead.priority || 'Normal'}
                          </span>
                        </div>

                        <div className="text-xs font-medium text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200">
                          <span className="text-slate-400 block text-[10px] uppercase font-bold">Interested In:</span>
                          <span className="font-bold text-[#082B59]">{lead.interestedCourse}</span>
                          <span className="block text-[11px] text-teal-700 mt-0.5">Preferred: {lead.preferredUniversity || 'Open for Guidance'}</span>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-xs">
                          <a
                            href={`tel:${lead.mobileNumber}`}
                            className="flex items-center gap-1 text-teal-700 font-bold hover:underline"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>{lead.mobileNumber}</span>
                          </a>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setWhatsAppModalLead(lead)}
                              className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors cursor-pointer"
                              title="Quick WhatsApp message"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setSelectedEnquiry(lead)}
                              className="p-1.5 rounded-lg bg-[#082B59] text-white hover:bg-[#1355A5] transition-colors cursor-pointer"
                              title="View Full Profile"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: STUDENT LEADS CRM                                      */}
        {/* ============================================================== */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Filter & Search Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="relative w-full md:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search candidate name, mobile, course, city..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                  <button
                    onClick={() => setWalkInModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>+ Register Walk-In</span>
                  </button>

                  <button
                    onClick={handleExportCSV}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export CSV ({filteredEnquiries.length})</span>
                  </button>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
                <span className="text-slate-500 font-bold flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  <span>Status:</span>
                </span>
                {['All', 'New', 'Contacted', 'Follow-Up', 'Converted', 'Closed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      statusFilter === st
                        ? 'bg-[#082B59] text-amber-300 shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st} {st !== 'All' ? `(${enquiries.filter((e) => e.status === st).length})` : `(${enquiries.length})`}
                  </button>
                ))}

                <span className="text-slate-300 mx-1">|</span>

                <span className="text-slate-500 font-bold">Priority:</span>
                {['All', 'Urgent', 'High', 'Normal'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriorityFilter(p)}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      priorityFilter === p
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#051D3C] text-white font-bold">
                      <th className="p-3.5">Candidate Details</th>
                      <th className="p-3.5">Contact & Location</th>
                      <th className="p-3.5">Academic Background</th>
                      <th className="p-3.5">Interested Course & Mode</th>
                      <th className="p-3.5">Session / Source</th>
                      <th className="p-3.5">Status & Priority</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-10 text-center text-slate-400 space-y-2">
                          <Users className="w-8 h-8 text-slate-300 mx-auto" />
                          <p className="font-semibold text-slate-500">No student leads match your filter.</p>
                          <button
                            onClick={() => {
                              setLeadSearch('');
                              setStatusFilter('All');
                              setPriorityFilter('All');
                            }}
                            className="text-xs text-teal-700 font-bold hover:underline cursor-pointer"
                          >
                            Reset filters
                          </button>
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-amber-50/30 transition-colors">
                          {/* Student Details */}
                          <td className="p-3.5 align-top">
                            <span className="font-black text-slate-900 text-sm block">{enq.studentName}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">ID: {enq.id}</span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </td>

                          {/* Contact & Location */}
                          <td className="p-3.5 align-top space-y-1">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <Phone className="w-3.5 h-3.5 text-teal-600" />
                              <a href={`tel:${enq.mobileNumber}`} className="hover:underline">
                                {formatIndianPhone(enq.mobileNumber)}
                              </a>
                            </div>
                            <span className="text-[11px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              <span>{enq.city}, {enq.state}</span>
                            </span>
                            {enq.email && (
                              <span className="text-[10px] text-slate-400 block truncate max-w-[140px]">
                                {enq.email}
                              </span>
                            )}
                          </td>

                          {/* Academic Background */}
                          <td className="p-3.5 align-top">
                            <span className="font-bold text-slate-800 block">
                              {enq.highestQualification}
                            </span>
                            <span className="text-[11px] text-slate-500 block">
                              Passout: {enq.yearOfPassing}
                            </span>
                          </td>

                          {/* Course & Mode */}
                          <td className="p-3.5 align-top">
                            <span className="font-bold text-[#082B59] block">
                              {enq.interestedCourse}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 inline-block mt-0.5 font-semibold">
                              {enq.preferredMode}
                            </span>
                            {enq.preferredUniversity && (
                              <span className="text-[10px] text-slate-500 block mt-0.5 truncate max-w-[160px]">
                                Uni: {enq.preferredUniversity}
                              </span>
                            )}
                          </td>

                          {/* Session & Source */}
                          <td className="p-3.5 align-top space-y-1">
                            <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-[10px] block w-fit">
                              {enq.admissionSession}
                            </span>
                            <span className="text-[10px] text-slate-400 block">
                              Src: {enq.source || 'Website'}
                            </span>
                          </td>

                          {/* Status & Priority */}
                          <td className="p-3.5 align-top space-y-1.5">
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateLeadStatus(enq.id, e.target.value as LeadStatus)}
                              className={`text-[11px] font-bold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                                enq.status === 'New'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : enq.status === 'Contacted'
                                  ? 'bg-yellow-50 text-yellow-800 border-yellow-200'
                                  : enq.status === 'Follow-Up'
                                  ? 'bg-purple-50 text-purple-800 border-purple-200'
                                  : enq.status === 'Converted'
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : 'bg-slate-100 text-slate-600 border-slate-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Follow-Up">Follow-Up</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                            </select>

                            <select
                              value={enq.priority || 'Normal'}
                              onChange={(e) => handleUpdatePriority(enq.id, e.target.value as any)}
                              className={`text-[10px] font-bold py-0.5 px-2 rounded block border cursor-pointer ${
                                enq.priority === 'Urgent'
                                  ? 'bg-red-50 text-red-700 border-red-300'
                                  : enq.priority === 'High'
                                  ? 'bg-amber-50 text-amber-800 border-amber-300'
                                  : 'bg-slate-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              <option value="Urgent">🚨 Urgent</option>
                              <option value="High">⚡ High</option>
                              <option value="Normal">Normal</option>
                            </select>
                          </td>

                          {/* Action Buttons */}
                          <td className="p-3.5 align-top text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* WhatsApp Smart Action */}
                              <button
                                onClick={() => setWhatsAppModalLead(enq)}
                                className="p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-transform active:scale-95 shadow-sm cursor-pointer"
                                title="Send WhatsApp Message"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </button>

                              {/* Call Action */}
                              <a
                                href={`tel:${enq.mobileNumber}`}
                                className="p-1.5 rounded-lg bg-teal-600 text-white hover:bg-teal-700 transition-transform active:scale-95 shadow-sm cursor-pointer"
                                title="Call Student"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>

                              {/* View Full Profile */}
                              <button
                                onClick={() => setSelectedEnquiry(enq)}
                                className="p-1.5 rounded-lg bg-[#082B59] text-white hover:bg-[#1355A5] transition-colors cursor-pointer"
                                title="View Full Dossier"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              {/* Add Note Button */}
                              <button
                                onClick={() => handleAddNote(enq.id)}
                                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                                title="Add Interaction Note"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete Lead */}
                              <button
                                onClick={() => handleDeleteLead(enq.id)}
                                className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                                title="Delete Lead"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: COURSES INVENTORY                                       */}
        {/* ============================================================== */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Programmes & Courses Directory ({courses.length})</span>
                </h3>
                <p className="text-xs text-slate-500">Manage academic disciplines, durations, fee ranges, and approvals</p>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search course or short code..."
                    value={courseSearch}
                    onChange={(e) => setCourseSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setEditingCourse(null);
                    setCourseForm({
                      name: '',
                      shortName: '',
                      category: 'Paramedical & Allied Health',
                      level: 'Diploma',
                      duration: '2 Years',
                      eligibility: '',
                      approxFeePerYear: '₹40,000/yr',
                      description: '',
                      modes: ['Regular']
                    });
                    setCourseModalOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold shadow-sm whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add New Course</span>
                </button>
              </div>
            </div>

            {/* Courses Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((c) => (
                <div
                  key={c.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                        {c.category}
                      </span>
                      <span className="text-xs font-black text-[#082B59] bg-amber-300 px-2 py-0.5 rounded-md shadow-sm">
                        {c.shortName}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{c.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{c.description}</p>

                    <div className="text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1 text-slate-700">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Duration:</span>
                        <span className="font-bold text-slate-800">{c.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Level & Modes:</span>
                        <span className="font-bold text-slate-800">{c.level} • {c.modes.join(', ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Approx. Fee:</span>
                        <span className="font-bold text-emerald-700">{c.approxFeePerYear || 'Variable'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                    <button
                      onClick={() => {
                        setEditingCourse(c);
                        setCourseForm(c);
                        setCourseModalOpen(true);
                      }}
                      className="text-teal-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Course</span>
                    </button>

                    <Link
                      href={`/courses/${c.slug}`}
                      target="_blank"
                      className="text-slate-500 hover:text-[#082B59] flex items-center gap-1 font-semibold"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: PARTNER UNIVERSITIES MATRIX                             */}
        {/* ============================================================== */}
        {activeTab === 'universities' && (
          <div className="space-y-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Partner Universities Matrix ({universities.length})</span>
                </h3>
                <p className="text-xs text-slate-500">Direct university partnerships, statutory approvals, and state affiliations</p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search university or state..."
                    value={uniSearch}
                    onChange={(e) => setUniSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>

                <button
                  onClick={handleOpenAddUni}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Add Partner University</span>
                </button>
              </div>
            </div>

            {/* Universities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUniversities.map((u) => (
                <div
                  key={u.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <select
                        value={u.verificationStatus}
                        onChange={(e) => {
                          const val = e.target.value as VerificationStatus;
                          const updated = universities.map((x) =>
                            x.id === u.id ? { ...x, verificationStatus: val } : x
                          );
                          setUniversities(updated);
                          saveStoredUniversities(updated);
                          showToast(`${u.name} status updated to ${val}`);
                        }}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded border focus:outline-none cursor-pointer ${
                          u.verificationStatus === 'Verified'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-amber-50 text-amber-900 border-amber-300'
                        }`}
                      >
                        <option value="Verified">Verified</option>
                        <option value="Verification Required">Verification Required</option>
                        <option value="Institutional Review">Institutional Review</option>
                      </select>
                      <span className="text-[11px] font-semibold text-slate-500">📍 {u.state}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900 leading-snug">{u.name}</h4>
                    <p className="text-xs text-slate-500">{u.location}</p>

                    <div className="text-[11px] text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1">
                      <p className="font-medium line-clamp-2">{u.accreditationNote}</p>
                      <div className="pt-1 flex items-center justify-between font-bold text-[#082B59]">
                        <span>Courses Available:</span>
                        <span className="bg-white px-2 py-0.5 rounded border border-slate-200">{u.availableCourseIds?.length || 0} Programmes</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleOpenEditUni(u)}
                        className="text-teal-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDeleteUni(u.id, u.name)}
                        className="text-red-600 hover:text-red-800 font-bold hover:underline cursor-pointer flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>

                    <Link
                      href={`/universities/${u.slug}`}
                      target="_blank"
                      className="text-slate-500 hover:text-[#082B59] flex items-center gap-1 font-semibold"
                    >
                      <span>Preview</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: BSCC & COUNSELLOR TOOLKIT                               */}
        {/* ============================================================== */}
        {activeTab === 'toolkit' && (
          <div className="space-y-6">
            {/* BSCC Guide Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-300 shadow-sm space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400 flex items-center justify-center text-amber-700 font-black">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Bihar Student Credit Card (BSCC) Scheme — Counsellor Execution Guide
                  </h3>
                  <p className="text-xs text-slate-500">
                    Official facilitation procedure for students of East Champaran, Motihari, and Raxaul
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                  <h4 className="font-bold text-amber-900 text-sm">1. Candidate Eligibility</h4>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li>Resident of Bihar with Awasiya Praman Patra</li>
                    <li>Passed 12th Intermediate / Diploma</li>
                    <li>Age between 18 and 25 years</li>
                    <li>Eligible up to ₹4,00,000 education loan</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-2">
                  <h4 className="font-bold text-teal-900 text-sm">2. University Qualification</h4>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li>UGC recognized university</li>
                    <li>NAAC Accredited Grade &lsquo;A&rsquo; or State University</li>
                    <li>NIRF ranked or statutory council approved</li>
                    <li>Bonafide Certificate on official letterhead</li>
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-2">
                  <h4 className="font-bold text-blue-900 text-sm">3. DRCC Processing Steps</h4>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li>Apply on MNSSBY official portal (7 Nischay)</li>
                    <li>Visit DRCC Motihari (East Champaran)</li>
                    <li>Document physical verification</li>
                    <li>TPA verification & bank disbursement</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Document Checklist for Student File */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Student Admission File Document Checklist</span>
                  </h3>
                  <button
                    onClick={handlePrintBlankChecklist}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                    title="Print blank checklist form for physical candidate folders"
                  >
                    <Printer className="w-3.5 h-3.5 text-slate-600" />
                    <span>Print Blank Form</span>
                  </button>
                </div>
                <div className="space-y-2 text-xs text-slate-700">
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>10th Matriculation Marksheet & Passing Certificate</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>12th Intermediate Marksheet, Admit Card & Migration</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>Aadhaar Card (Student + Parent / Co-Applicant)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>Residential / Domicile Certificate (Bihar Government)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>Bank Account Passbook with IFSC (Applicant & Parent)</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                    <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                    <span>Passport size photographs (6 Copies)</span>
                  </label>
                </div>
              </div>

              {/* Statutory Verification Portals Quick Access */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-500" />
                  <span>Official Statutory Verification Portals</span>
                </h3>
                <div className="space-y-2 text-xs">
                  <a
                    href="https://www.ugc.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-800 transition-colors"
                  >
                    <span>University Grants Commission (UGC) 2(f)/12(B) Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://www.cobse.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-800 transition-colors"
                  >
                    <span>Council of Boards of School Education (COBSE) Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://www.indiannursingcouncil.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-800 transition-colors"
                  >
                    <span>Indian Nursing Council (INC) Approved Institutions</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://www.pci.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-800 transition-colors"
                  >
                    <span>Pharmacy Council of India (PCI) Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>

                  <a
                    href="https://ncte.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 font-semibold text-slate-800 transition-colors"
                  >
                    <span>National Council for Teacher Education (NCTE - B.Ed/D.El.Ed)</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: CENTRE & SETTINGS                                       */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-black text-slate-900">Centre Profile & Configuration</h3>
              <p className="text-xs text-slate-500">Update helpline, WhatsApp link, address, and admission cycles</p>
            </div>

            <div className="space-y-4 text-xs font-semibold text-slate-700">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Consultancy Brand Title
                </label>
                <input
                  type="text"
                  value={settings.businessName}
                  onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Primary Helpline Number (Calling)
                </label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official WhatsApp Contact Number
                </label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Physical Office Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Office Working Hours
                </label>
                <input
                  type="text"
                  value={settings.officeHours}
                  onChange={(e) => setSettings({ ...settings, officeHours: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                onClick={() => {
                  saveStoredSettings(settings);
                  showToast('Centre settings successfully updated!');
                }}
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold transition-all shadow-md cursor-pointer"
              >
                Save Centre Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================== */}
      {/* MODAL 1: CANDIDATE FULL PROFILE DOSSIER                        */}
      {/* ============================================================== */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-300 space-y-5 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Candidate Admission Dossier</span>
                <h3 className="text-xl font-black text-slate-900">{selectedEnquiry.studentName}</h3>
                <span className="text-xs text-slate-500">ID: {selectedEnquiry.id} • Registered {new Date(selectedEnquiry.createdAt).toLocaleDateString('en-IN')}</span>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Phone / Mobile:</span>
                <a href={`tel:${selectedEnquiry.mobileNumber}`} className="font-bold text-teal-700 hover:underline">
                  {formatIndianPhone(selectedEnquiry.mobileNumber)}
                </a>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">City & State:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.city}, {selectedEnquiry.state}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Prior Qualification:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.highestQualification} ({selectedEnquiry.yearOfPassing})</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Interested Course:</span>
                <span className="font-bold text-[#082B59]">{selectedEnquiry.interestedCourse}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Study Mode & Session:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.preferredMode} • {selectedEnquiry.admissionSession}</span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block text-[10px] uppercase">Preferred University:</span>
                <span className="font-bold text-slate-800">{selectedEnquiry.preferredUniversity || 'Open for Counselling'}</span>
              </div>
            </div>

            {selectedEnquiry.questions && (
              <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs">
                <span className="font-bold text-amber-900 block mb-0.5">Student Questions / Notes:</span>
                <p className="text-slate-700">{selectedEnquiry.questions}</p>
              </div>
            )}

            {/* Student Document Verification Checklist & Receipt */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-800 flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-600" />
                    <span>Admission Documents Collected & Verified</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {(selectedEnquiry.verifiedDocuments || []).length} of {MANDATORY_DOCS.length} documents verified on file
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handlePrintDossierReceipt(selectedEnquiry)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 shadow-sm transition-colors cursor-pointer"
                  title="Print official document submission receipt for candidate"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print Receipt</span>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{
                    width: `${((selectedEnquiry.verifiedDocuments || []).length / MANDATORY_DOCS.length) * 100}%`
                  }}
                />
              </div>

              {/* Checklist items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {MANDATORY_DOCS.map((doc) => {
                  const isChecked = (selectedEnquiry.verifiedDocuments || []).includes(doc);
                  return (
                    <label
                      key={doc}
                      onClick={() => handleToggleDocument(selectedEnquiry.id, doc)}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-colors ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-900 font-semibold'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}} // handled by label onClick
                        className="rounded text-emerald-600 focus:ring-emerald-500 pointer-events-none"
                      />
                      <span className="truncate">{doc}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Counsellor Notes Timeline */}
            <div className="space-y-2">
              <span className="font-bold text-xs text-slate-800 block">Counsellor Interaction History:</span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                {selectedEnquiry.counselorNotes && selectedEnquiry.counselorNotes.length > 0 ? (
                  selectedEnquiry.counselorNotes.map((nt, idx) => (
                    <div key={idx} className="text-slate-700 border-b border-slate-200/60 pb-1 last:border-0">
                      • {nt}
                    </div>
                  ))
                ) : (
                  <p className="text-slate-400 italic">No notes logged yet.</p>
                )}
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAddNote(selectedEnquiry.id)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  + Add Note
                </button>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleUpdateLeadStatus(selectedEnquiry.id, e.target.value as LeadStatus)}
                  className="text-xs font-bold py-1.5 px-3 rounded-xl border border-slate-300 bg-white cursor-pointer"
                >
                  <option value="New">Status: New</option>
                  <option value="Contacted">Status: Contacted</option>
                  <option value="Follow-Up">Status: Follow-Up</option>
                  <option value="Converted">Status: Converted</option>
                  <option value="Closed">Status: Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setWhatsAppModalLead(selectedEnquiry);
                    setSelectedEnquiry(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Send WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 2: REGISTER WALK-IN CANDIDATE FORM                       */}
      {/* ============================================================== */}
      {walkInModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-amber-300 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-500" />
                  <span>Register Walk-In Candidate</span>
                </h3>
                <p className="text-xs text-slate-500">Record physical visitor at Kaurihar Chouk Raxaul centre</p>
              </div>
              <button onClick={() => setWalkInModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveWalkInLead} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={newLeadForm.studentName}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, studentName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile"
                    value={newLeadForm.mobileNumber}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, mobileNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    placeholder="WhatsApp number"
                    value={newLeadForm.whatsappNumber}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, whatsappNumber: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / District</label>
                  <input
                    type="text"
                    placeholder="Raxaul / Motihari / Bettiah"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Highest Qualification</label>
                  <input
                    type="text"
                    placeholder="e.g. 12th Science (PCB)"
                    value={newLeadForm.highestQualification}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, highestQualification: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Year of Passing</label>
                  <input
                    type="text"
                    placeholder="2025"
                    value={newLeadForm.yearOfPassing}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, yearOfPassing: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Interested Course</label>
                <select
                  value={newLeadForm.interestedCourse}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, interestedCourse: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name} ({c.duration})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Study Mode</label>
                  <select
                    value={newLeadForm.preferredMode}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, preferredMode: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Regular">Regular Campus</option>
                    <option value="Distance">Distance Education</option>
                    <option value="Online">Online Degree</option>
                    <option value="Open Board">Open School Board (10th/12th)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lead Priority</label>
                  <select
                    value={newLeadForm.priority}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, priority: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Urgent">🚨 Urgent (Immediate Admission)</option>
                    <option value="High">⚡ High (Active Decision)</option>
                    <option value="Normal">Normal (Information Seeking)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Initial Counselling Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Record initial discussion, budget expectation, or credit card requirements..."
                  value={newLeadForm.questions}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, questions: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition-all shadow-md text-xs cursor-pointer"
              >
                Save & Register Candidate
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 3: SMART WHATSAPP MESSAGE TEMPLATES                      */}
      {/* ============================================================== */}
      {whatsAppModalLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-amber-300 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Send WhatsApp to {whatsAppModalLead.studentName}</span>
                </h3>
                <span className="text-xs text-slate-500">{whatsAppModalLead.mobileNumber} • {whatsAppModalLead.interestedCourse}</span>
              </div>
              <button onClick={() => setWhatsAppModalLead(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">Select a tailored official messaging template:</p>

            <div className="space-y-2 text-xs">
              <button
                onClick={() => {
                  const msg = `Hello ${whatsAppModalLead.studentName}, Greetings from SAHI RAAH CONSULTANCY, Raxaul! Regarding your enquiry for ${whatsAppModalLead.interestedCourse} (${whatsAppModalLead.admissionSession}): We have UGC & Council approved university seats available. Please reply to schedule your free counselling. Helpline: 8092911956.`;
                  window.open(getWhatsAppUrl(msg, whatsAppModalLead.whatsappNumber || whatsAppModalLead.mobileNumber), '_blank');
                  handleAddNote(whatsAppModalLead.id, 'Sent WhatsApp Template: Course Overview & Free Counselling');
                  setWhatsAppModalLead(null);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all font-medium text-slate-800 cursor-pointer"
              >
                <span className="font-bold text-[#082B59] block">1. Course Overview & Free Counselling Invitation</span>
                <span className="text-slate-500 text-[11px]">Introductory greetings, seat confirmation, and helpline contact.</span>
              </button>

              <button
                onClick={() => {
                  const msg = `Dear ${whatsAppModalLead.studentName}, for admission in ${whatsAppModalLead.interestedCourse}, here is the essential document checklist: 1) 10th & 12th Marksheet, 2) Aadhaar Card, 3) 6 Photos, 4) Residential Certificate (for Bihar Student Credit Card). Please share clear photos on this number for verification. — SAHI RAAH, Raxaul.`;
                  window.open(getWhatsAppUrl(msg, whatsAppModalLead.whatsappNumber || whatsAppModalLead.mobileNumber), '_blank');
                  handleAddNote(whatsAppModalLead.id, 'Sent WhatsApp Template: Document Verification Checklist');
                  setWhatsAppModalLead(null);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all font-medium text-slate-800 cursor-pointer"
              >
                <span className="font-bold text-teal-800 block">2. Document Checklist & Eligibility Verification</span>
                <span className="text-slate-500 text-[11px]">List of 10th/12th marksheets, Aadhaar, and photo requirements.</span>
              </button>

              <button
                onClick={() => {
                  const msg = `Hello ${whatsAppModalLead.studentName}, please visit our central admission guidance office at Kaurihar Chouk, Kaurihar Road, Raxaul (Bihar). Our senior educational counsellors will assist you with fee structure, scholarship, and bonafide documentation. Timing: 9:00 AM – 7:00 PM. Call: 8092911956.`;
                  window.open(getWhatsAppUrl(msg, whatsAppModalLead.whatsappNumber || whatsAppModalLead.mobileNumber), '_blank');
                  handleAddNote(whatsAppModalLead.id, 'Sent WhatsApp Template: Raxaul Office Visit Invitation');
                  setWhatsAppModalLead(null);
                }}
                className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 transition-all font-medium text-slate-800 cursor-pointer"
              >
                <span className="font-bold text-amber-800 block">3. In-Person Counselling at Kaurihar Chouk, Raxaul</span>
                <span className="text-slate-500 text-[11px]">Office location address, working hours, and counsellor helpline.</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 4: ADD / EDIT COURSE MODAL                               */}
      {/* ============================================================== */}
      {courseModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-amber-300 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingCourse ? `Edit ${editingCourse.name}` : 'Add New Programme'}
                </h3>
                <span className="text-xs text-slate-500">Configure academic degree details</span>
              </div>
              <button onClick={() => setCourseModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Course Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master of Physiotherapy (MPT)"
                  value={courseForm.name}
                  onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MPT"
                    value={courseForm.shortName}
                    onChange={(e) => setCourseForm({ ...courseForm, shortName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Years"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Paramedical & Allied Health">Paramedical & Allied Health</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Agriculture & Applied Sciences">Agriculture & Applied Sciences</option>
                    <option value="Engineering & Technology">Engineering & Technology</option>
                    <option value="Management">Management</option>
                    <option value="Education & Teaching">Education & Teaching</option>
                    <option value="Arts, Commerce & Science">Arts, Commerce & Science</option>
                    <option value="Vocational & Skill Development">Vocational & Skill</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Approx. Fee Per Year</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000/yr"
                    value={courseForm.approxFeePerYear}
                    onChange={(e) => setCourseForm({ ...courseForm, approxFeePerYear: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Prescribed Eligibility</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 10th / 12th Pass or BPT with 50% marks..."
                  value={courseForm.eligibility}
                  onChange={(e) => setCourseForm({ ...courseForm, eligibility: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 font-bold transition-all shadow-md text-xs cursor-pointer"
              >
                {editingCourse ? 'Save Changes' : 'Create Course'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* MODAL 5: ADD / EDIT UNIVERSITY MODAL                           */}
      {/* ============================================================== */}
      {uniModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-amber-300 space-y-4 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>{editingUni ? `Edit ${editingUni.name}` : 'Add New Partner University'}</span>
                </h3>
                <span className="text-xs text-slate-500">Configure university details, recognition & location</span>
              </div>
              <button onClick={() => setUniModalOpen(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUni} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">University Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex University"
                  value={uniForm.name}
                  onChange={(e) => setUniForm({ ...uniForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Short Name / Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. APEX"
                    value={uniForm.shortName}
                    onChange={(e) => setUniForm({ ...uniForm, shortName: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rajasthan / Bihar / UP"
                    value={uniForm.state}
                    onChange={(e) => setUniForm({ ...uniForm, state: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={uniForm.location}
                    onChange={(e) => setUniForm({ ...uniForm, location: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institution Type</label>
                  <select
                    value={uniForm.type}
                    onChange={(e) => setUniForm({ ...uniForm, type: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Private University">Private University</option>
                    <option value="State Private University">State Private University</option>
                    <option value="State University">State University</option>
                    <option value="Autonomous Institution">Autonomous Institution</option>
                    <option value="Skill University">Skill University</option>
                    <option value="State Open University">State Open University</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Verification Status</label>
                  <select
                    value={uniForm.verificationStatus}
                    onChange={(e) => setUniForm({ ...uniForm, verificationStatus: e.target.value as VerificationStatus })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Verification Required">Verification Required</option>
                    <option value="Institutional Review">Institutional Review</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Established Year</label>
                  <input
                    type="text"
                    placeholder="e.g. 2012"
                    value={uniForm.established}
                    onChange={(e) => setUniForm({ ...uniForm, established: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Statutory Approvals & Accreditation Note</label>
                <input
                  type="text"
                  placeholder="e.g. UGC Approved, NAAC 'A' Grade, PCI & BCI Approved"
                  value={uniForm.accreditationNote}
                  onChange={(e) => setUniForm({ ...uniForm, accreditationNote: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Summary / About the University</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Leading university offering recognized professional programs in healthcare, engineering and management."
                  value={uniForm.summary}
                  onChange={(e) => setUniForm({ ...uniForm, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Campus Address</label>
                <input
                  type="text"
                  placeholder="e.g. Jaipur-Agra National Highway, Rajasthan"
                  value={uniForm.address}
                  onChange={(e) => setUniForm({ ...uniForm, address: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Website Note / Verification URL</label>
                <input
                  type="text"
                  placeholder="e.g. Verified on UGC Portal: Section 2(f)"
                  value={uniForm.websiteNote}
                  onChange={(e) => setUniForm({ ...uniForm, websiteNote: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Assign Available Courses ({uniForm.availableCourseIds.length} Selected)
                </label>
                <div className="max-h-28 overflow-y-auto bg-slate-50 border border-slate-200 rounded-xl p-2 space-y-1">
                  {courses.map((c) => {
                    const isChecked = uniForm.availableCourseIds.includes(c.id);
                    return (
                      <label key={c.id} className="flex items-center gap-2 cursor-pointer hover:bg-white p-1 rounded">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setUniForm({
                                ...uniForm,
                                availableCourseIds: [...uniForm.availableCourseIds, c.id]
                              });
                            } else {
                              setUniForm({
                                ...uniForm,
                                availableCourseIds: uniForm.availableCourseIds.filter((id) => id !== c.id)
                              });
                            }
                          }}
                          className="rounded text-[#082B59] focus:ring-0 cursor-pointer"
                        />
                        <span className="text-[11px] text-slate-800">{c.name} ({c.shortName})</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 font-bold transition-all shadow-md text-xs cursor-pointer"
              >
                {editingUni ? 'Save Changes' : 'Create Partner University'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
