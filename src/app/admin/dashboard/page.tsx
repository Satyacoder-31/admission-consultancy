'use client';

import React, { useState, useEffect } from 'react';
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
  saveStoredSettings
} from '@/lib/storage';
import { Course, University, AdmissionEnquiry, LeadStatus, VerificationStatus } from '@/types';
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
  ExternalLink
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();

  // Active Tab
  const [activeTab, setActiveTab] = useState<'leads' | 'courses' | 'universities' | 'settings'>('leads');

  // Data states
  const [enquiries, setEnquiries] = useState<AdmissionEnquiry[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [settings, setSettings] = useState(siteConfig);

  // Filter states for Leads
  const [leadSearch, setLeadSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Modals for Course & University
  const [courseModalOpen, setCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [uniModalOpen, setUniModalOpen] = useState(false);
  const [editingUni, setEditingUni] = useState<University | null>(null);

  // Toast / notification
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
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('sr_admin_auth');
    sessionStorage.removeItem('sr_admin_token');
    router.push('/admin');
  };

  // Lead actions
  const handleUpdateLeadStatus = (id: string, newStatus: LeadStatus) => {
    const updated = enquiries.map((enq) =>
      enq.id === id ? { ...enq, status: newStatus } : enq
    );
    setEnquiries(updated);
    saveStoredEnquiries(updated);
    showToast(`Lead status updated to ${newStatus}`);
  };

  const handleAddNote = (id: string) => {
    const note = prompt('Enter counsellor note:');
    if (!note || !note.trim()) return;

    const updated = enquiries.map((enq) => {
      if (enq.id === id) {
        const notes = enq.counselorNotes || [];
        return {
          ...enq,
          counselorNotes: [...notes, `${new Date().toLocaleDateString('en-IN')}: ${note.trim()}`]
        };
      }
      return enq;
    });
    setEnquiries(updated);
    saveStoredEnquiries(updated);
    showToast('Counsellor note recorded');
  };

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
      'Questions'
    ];

    const rows = enquiries.map((e) => [
      e.id,
      new Date(e.createdAt).toLocaleDateString('en-IN'),
      `"${e.studentName.replace(/"/g, '""')}"`,
      `"${e.mobileNumber}"`,
      `"${e.whatsappNumber || ''}"`,
      `"${e.email || ''}"`,
      `"${e.state}"`,
      `"${e.city}"`,
      `"${e.highestQualification}"`,
      `"${e.yearOfPassing}"`,
      `"${e.interestedCourse.replace(/"/g, '""')}"`,
      `"${e.preferredUniversity || ''}"`,
      `"${e.preferredMode}"`,
      `"${e.budget || ''}"`,
      `"${e.admissionSession}"`,
      `"${e.status}"`,
      `"${(e.questions || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `sahi_raah_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('CSV export downloaded successfully!');
  };

  // Filtered Leads
  const filteredEnquiries = enquiries.filter((e) => {
    const matchSearch =
      e.studentName.toLowerCase().includes(leadSearch.toLowerCase()) ||
      e.mobileNumber.includes(leadSearch) ||
      e.interestedCourse.toLowerCase().includes(leadSearch.toLowerCase()) ||
      e.city.toLowerCase().includes(leadSearch.toLowerCase());

    const matchStatus = statusFilter === 'All' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="bg-[#051D3C] text-white px-6 py-3 border-b border-amber-400/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full bg-white p-1 border border-amber-400 overflow-hidden">
            <Image
              src="/images/brand/logo.jpg"
              alt="Logo"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
            />
          </div>
          <div>
            <h1 className="text-base font-bold text-white tracking-wide">
              SAHI RAAH CONSULTANCY CMS
            </h1>
            <p className="text-[10px] text-amber-300 font-medium">
              Administrator & Counsellor Desk • Raxaul
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-300 transition-colors"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-900/60 hover:bg-red-800 text-red-200 text-xs font-semibold border border-red-500/30 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-16 right-6 z-50 bg-[#082B59] text-amber-300 px-4 py-2.5 rounded-xl border border-amber-400/50 shadow-2xl text-xs font-bold flex items-center gap-2 animate-in slide-in-from-top-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('leads')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Student Enquiries & Leads ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'courses'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Courses Directory ({courses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('universities')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'universities'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Universities ({universities.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-[#082B59] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Sessions & Settings</span>
          </button>
        </div>

        {/* TAB 1: Leads & Enquiries */}
        {activeTab === 'leads' && (
          <div className="space-y-4">
            {/* Filter & Export Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto flex-1">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search lead by name, phone, course or city..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-300 focus:outline-none"
                  />
                </div>

                <div className="w-full sm:w-auto">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto text-xs py-2 px-3 rounded-xl border border-slate-300 bg-white focus:outline-none"
                  >
                    <option value="All">All Statuses ({enquiries.length})</option>
                    <option value="New">New ({enquiries.filter((e) => e.status === 'New').length})</option>
                    <option value="Contacted">Contacted ({enquiries.filter((e) => e.status === 'Contacted').length})</option>
                    <option value="Follow-Up">Follow-Up ({enquiries.filter((e) => e.status === 'Follow-Up').length})</option>
                    <option value="Converted">Converted ({enquiries.filter((e) => e.status === 'Converted').length})</option>
                    <option value="Closed">Closed ({enquiries.filter((e) => e.status === 'Closed').length})</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleExportCSV}
                className="w-full md:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold shadow-sm transition-colors whitespace-nowrap cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Leads as CSV</span>
              </button>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                      <th className="p-3.5">Student Details</th>
                      <th className="p-3.5">Contact & Location</th>
                      <th className="p-3.5">Academic Background</th>
                      <th className="p-3.5">Interested Course & Mode</th>
                      <th className="p-3.5">Session</th>
                      <th className="p-3.5">Lead Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEnquiries.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No inquiries match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredEnquiries.map((enq) => (
                        <tr key={enq.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3.5 align-top">
                            <span className="font-bold text-slate-900 block">{enq.studentName}</span>
                            <span className="text-[10px] text-slate-400 block">ID: {enq.id}</span>
                            <span className="text-[10px] text-slate-500">
                              {new Date(enq.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </td>

                          <td className="p-3.5 align-top space-y-1">
                            <div className="flex items-center gap-1 text-slate-700 font-semibold">
                              <Phone className="w-3 h-3 text-teal-600" />
                              <a href={`tel:${enq.mobileNumber}`} className="hover:underline">
                                {formatIndianPhone(enq.mobileNumber)}
                              </a>
                            </div>
                            <span className="text-[10px] text-slate-500 block">
                              📍 {enq.city}, {enq.state}
                            </span>
                          </td>

                          <td className="p-3.5 align-top">
                            <span className="font-semibold text-slate-800 block">
                              {enq.highestQualification}
                            </span>
                            <span className="text-[10px] text-slate-500 block">
                              Passing: {enq.yearOfPassing}
                            </span>
                          </td>

                          <td className="p-3.5 align-top">
                            <span className="font-bold text-[#082B59] block">
                              {enq.interestedCourse}
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200 inline-block mt-0.5">
                              {enq.preferredMode}
                            </span>
                            {enq.preferredUniversity && (
                              <span className="text-[10px] text-slate-500 block mt-0.5">
                                Uni: {enq.preferredUniversity}
                              </span>
                            )}
                          </td>

                          <td className="p-3.5 align-top">
                            <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              {enq.admissionSession}
                            </span>
                          </td>

                          <td className="p-3.5 align-top">
                            <select
                              value={enq.status}
                              onChange={(e) => handleUpdateLeadStatus(enq.id, e.target.value as LeadStatus)}
                              className={`text-[11px] font-bold py-1 px-2 rounded-lg border focus:outline-none ${
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

                            {/* Counsellor Notes Preview */}
                            {enq.counselorNotes && enq.counselorNotes.length > 0 && (
                              <div className="mt-1 text-[10px] text-slate-500 italic max-w-xs">
                                Note: {enq.counselorNotes[enq.counselorNotes.length - 1]}
                              </div>
                            )}
                          </td>

                          <td className="p-3.5 align-top text-right space-x-1.5 whitespace-nowrap">
                            {/* WhatsApp Direct Chat */}
                            <a
                              href={getWhatsAppUrl(
                                `Hello ${enq.studentName}, this is SAHI RAAH CONSULTANCY (Raxaul) regarding your admission enquiry for ${enq.interestedCourse} (${enq.admissionSession}).`,
                                enq.whatsappNumber || enq.mobileNumber
                              )}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex p-1.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            {/* Add Note Button */}
                            <button
                              onClick={() => handleAddNote(enq.id)}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                              title="Add Note"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
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

        {/* TAB 2: Courses Management */}
        {activeTab === 'courses' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Courses Database ({courses.length})</h3>
                <p className="text-xs text-slate-500">Edit course eligibility, duration, or statutory notices.</p>
              </div>
              <button
                onClick={() => {
                  const name = prompt('Enter Course Name (e.g. Bachelor of Pharmacy):');
                  if (!name) return;
                  const shortName = prompt('Enter Short Code (e.g. B.Pharm):') || name.slice(0, 5);
                  const newC: Course = {
                    id: `c-custom-${Date.now()}`,
                    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    name,
                    shortName,
                    category: 'Arts, Commerce & Science',
                    level: 'UG',
                    duration: '3 Years',
                    eligibility: '10+2 from recognized board',
                    modes: ['Regular'],
                    description: `Course guidance for ${name}.`,
                    careerProspects: ['Higher education', 'Corporate careers'],
                    keySubjects: ['Core subjects']
                  };
                  const updated = [...courses, newC];
                  setCourses(updated);
                  saveStoredCourses(updated);
                  showToast(`Course "${name}" added!`);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#082B59] text-amber-300 text-xs font-bold hover:bg-[#1355A5] transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <div key={c.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800">
                        {c.category}
                      </span>
                      <span className="text-xs font-black text-[#082B59] bg-amber-300 px-2 py-0.5 rounded">
                        {c.shortName}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.description}</p>
                    <div className="mt-2 text-[11px] text-slate-600 space-y-0.5">
                      <p><strong>Duration:</strong> {c.duration}</p>
                      <p><strong>Modes:</strong> {c.modes.join(', ')}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
                    <button
                      onClick={() => {
                        const newFee = prompt('Update Approx Fee:', c.approxFeePerYear || '');
                        if (newFee === null) return;
                        const updated = courses.map((x) =>
                          x.id === c.id ? { ...x, approxFeePerYear: newFee } : x
                        );
                        setCourses(updated);
                        saveStoredCourses(updated);
                        showToast('Fee updated');
                      }}
                      className="text-xs text-teal-700 font-semibold hover:underline"
                    >
                      Edit Fee
                    </button>

                    <button
                      onClick={() => {
                        if (!confirm(`Delete ${c.name}?`)) return;
                        const updated = courses.filter((x) => x.id !== c.id);
                        setCourses(updated);
                        saveStoredCourses(updated);
                        showToast(`Deleted ${c.name}`);
                      }}
                      className="text-xs text-red-600 hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: Universities Management */}
        {activeTab === 'universities' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div>
                <h3 className="text-base font-bold text-slate-900">Universities Directory ({universities.length})</h3>
                <p className="text-xs text-slate-500">Update verification status & regulatory approvals.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {universities.map((u) => (
                <div key={u.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <select
                        value={u.verificationStatus}
                        onChange={(e) => {
                          const val = e.target.value as VerificationStatus;
                          const updated = universities.map((x) =>
                            x.id === u.id ? { ...x, verificationStatus: val } : x
                          );
                          setUniversities(updated);
                          saveStoredUniversities(updated);
                          showToast(`${u.name} verification status set to ${val}`);
                        }}
                        className="text-[10px] font-bold px-2 py-0.5 rounded border border-amber-300 bg-amber-50 text-amber-900 focus:outline-none"
                      >
                        <option value="Verification Required">Verification Required</option>
                        <option value="Verified">Verified</option>
                        <option value="Institutional Review">Institutional Review</option>
                      </select>
                      <span className="text-[10px] text-slate-400">{u.state}</span>
                    </div>

                    <h4 className="font-bold text-sm text-slate-900">{u.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{u.location}</p>
                    <p className="text-[11px] text-slate-600 mt-2 bg-slate-50 p-2 rounded-lg border border-slate-100 line-clamp-3">
                      {u.accreditationNote}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between">
                    <button
                      onClick={() => {
                        const note = prompt('Update Accreditation Note:', u.accreditationNote);
                        if (!note) return;
                        const updated = universities.map((x) =>
                          x.id === u.id ? { ...x, accreditationNote: note } : x
                        );
                        setUniversities(updated);
                        saveStoredUniversities(updated);
                        showToast('Accreditation note updated');
                      }}
                      className="text-xs text-teal-700 font-semibold hover:underline"
                    >
                      Update Note
                    </button>

                    <Link
                      href={`/universities/${u.slug}`}
                      target="_blank"
                      className="text-xs text-slate-500 hover:text-[#082B59] flex items-center gap-1"
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

        {/* TAB 4: Site Settings */}
        {activeTab === 'settings' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Admission Sessions & Site Settings</h3>
              <p className="text-xs text-slate-500">Configure active admission cycles and contact numbers.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Active Admission Sessions
                </label>
                <div className="flex gap-4 text-xs font-semibold">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="rounded text-teal-600" />
                    <span>2026–2027 (Active)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked readOnly className="rounded text-teal-600" />
                    <span>2027–2028 (Upcoming Registration)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Official Phone / Helpline
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
                  Official WhatsApp Number
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
                  Official Office Address
                </label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-300"
                />
              </div>

              <button
                onClick={() => {
                  saveStoredSettings(settings);
                  showToast('Site settings updated!');
                }}
                className="w-full py-3 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-amber-300 text-xs font-bold transition-all shadow-md"
              >
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
