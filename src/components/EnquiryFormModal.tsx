'use client';

import React, { useState, useEffect } from 'react';
import { Course, University } from '@/types';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';
import { addEnquiry } from '@/lib/storage';
import { validateIndianPhone, getWhatsAppUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  Sparkles, 
  AlertCircle,
  GraduationCap
} from 'lucide-react';

interface EnquiryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCourse?: Course | null;
  initialUniversity?: University | null;
}

export default function EnquiryFormModal({
  isOpen,
  onClose,
  initialCourse,
  initialUniversity
}: EnquiryFormModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; course: string; phone: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [studentName, setStudentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [sameAsWhatsApp, setSameAsWhatsApp] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Bihar');
  const [city, setCity] = useState('Raxaul');

  const [highestQualification, setHighestQualification] = useState('12th Science (PCM)');
  const [yearOfPassing, setYearOfPassing] = useState('2025');

  const [interestedCourse, setInterestedCourse] = useState('');
  const [preferredUniversity, setPreferredUniversity] = useState('');
  const [preferredMode, setPreferredMode] = useState<'Regular' | 'Distance' | 'Online' | 'Open Board'>('Regular');
  const [budget, setBudget] = useState('₹40,000 – ₹80,000/yr');
  const [admissionSession, setAdmissionSession] = useState('2026-2027');
  const [questions, setQuestions] = useState('');
  const [consent, setConsent] = useState(true);

  // Pre-fill from props when opened
  useEffect(() => {
    if (initialCourse) {
      setInterestedCourse(initialCourse.name);
      if (initialCourse.modes && initialCourse.modes.length > 0) {
        setPreferredMode(initialCourse.modes[0]);
      }
    } else if (!interestedCourse) {
      setInterestedCourse(initialCourses[0].name);
    }

    if (initialUniversity) {
      setPreferredUniversity(initialUniversity.name);
    }
  }, [initialCourse, initialUniversity]);

  if (!isOpen) return null;

  const validateStep1 = () => {
    if (!studentName.trim()) {
      setError('Please provide the student’s full name.');
      return false;
    }
    if (!validateIndianPhone(mobileNumber)) {
      setError('Please enter a valid 10-digit Indian mobile number (starting with 6, 7, 8, or 9).');
      return false;
    }
    if (!sameAsWhatsApp && whatsappNumber && !validateIndianPhone(whatsappNumber)) {
      setError('Please enter a valid 10-digit WhatsApp number.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!highestQualification) {
      setError('Please specify the highest academic qualification.');
      return false;
    }
    if (!yearOfPassing) {
      setError('Please specify the year of passing.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep3 = () => {
    if (!interestedCourse) {
      setError('Please select your interested course.');
      return false;
    }
    if (!consent) {
      setError('Please agree to the consultation consent declaration.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleBack = () => {
    setError(null);
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setIsSubmitting(true);
    setError(null);

    const payload = {
      studentName: studentName.trim(),
      mobileNumber: mobileNumber.trim(),
      whatsappNumber: sameAsWhatsApp ? mobileNumber.trim() : (whatsappNumber.trim() || undefined),
      email: email.trim() || undefined,
      state,
      city: city.trim(),
      highestQualification,
      yearOfPassing,
      interestedCourse,
      preferredUniversity: preferredUniversity || undefined,
      preferredMode,
      budget,
      admissionSession,
      questions: questions.trim() || undefined
    };

    try {
      // 1. Client-side storage
      addEnquiry(payload);

      // 2. Server API POST (graceful fallback)
      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('API call background fallback:', err);
      }

      // 3. Trigger celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore if not supported
      }

      setSubmittedData({
        name: studentName,
        course: interestedCourse,
        phone: mobileNumber
      });
      setIsSubmitted(true);
    } catch {
      setError('Failed to submit enquiry. Please try again or chat with us on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const msg = `Hello SAHI RAAH CONSULTANCY, I just submitted an admission enquiry on your website.\n*Name:* ${studentName}\n*Course:* ${interestedCourse}\n*Session:* ${admissionSession}\n*Phone:* ${mobileNumber}\nPlease share admission guidance and fee breakdown.`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[95vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-[#082B59] text-white p-5 flex items-start justify-between border-b border-amber-400/30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded bg-teal-800 text-teal-200 text-[10px] font-bold tracking-widest uppercase">
                Official Admission Desk
              </span>
              <span className="text-amber-300 text-xs font-semibold">
                Session {admissionSession}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-400" />
              <span>Admission Guidance & Enquiry</span>
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Personalized institutional guidance from Raxaul’s trusted admission counsellors.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close enquiry form modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Step Progress Bar */}
        {!isSubmitted && (
          <div className="bg-slate-100 border-b border-slate-200 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
              <span className={step >= 1 ? 'text-[#082B59]' : 'text-slate-400'}>
                1. Contact Details
              </span>
              <span className={step >= 2 ? 'text-[#082B59]' : 'text-slate-400'}>
                2. Academic Background
              </span>
              <span className={step >= 3 ? 'text-[#082B59]' : 'text-slate-400'}>
                3. Course & University
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 via-royal to-amber-400 transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Form Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isSubmitted ? (
            /* Success confirmation screen */
            <div className="text-center py-6 px-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-bold text-slate-900">
                  Enquiry Submitted Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{submittedData?.name}</strong>. Your enquiry for <strong>{submittedData?.course}</strong> has been logged with our senior counsellors at Raxaul.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Registered Phone:</span>
                  <span className="font-semibold text-slate-800">{submittedData?.phone}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-1.5">
                  <span className="text-slate-500">Session Requested:</span>
                  <span className="font-semibold text-amber-700">{admissionSession}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Response:</span>
                  <span className="font-semibold text-emerald-700">Within 2 to 4 Business Hours</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-lg transition-transform active:scale-95"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Instant WhatsApp Follow-Up</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Step 1: Personal & Contact */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-slate-800 border-b pb-2">
                    Step 1: Student Information & Contact Details
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Student Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Kumar Sah"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/30"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        10-Digit Calling Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 8092911956"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/30"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="student@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/30"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Checkbox */}
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                      <input
                        type="checkbox"
                        checked={sameAsWhatsApp}
                        onChange={(e) => setSameAsWhatsApp(e.target.checked)}
                        className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      />
                      <span>Calling number is the same as WhatsApp number</span>
                    </label>

                    {!sameAsWhatsApp && (
                      <div className="mt-2.5">
                        <label className="block text-xs font-medium text-slate-600 mb-1">
                          Dedicated WhatsApp Number
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 9876543210"
                          maxLength={10}
                          value={whatsappNumber}
                          onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Location */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        State
                      </label>
                      <select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Bihar">Bihar</option>
                        <option value="Nepal (Birgunj/Border)">Nepal (Birgunj / Border)</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="West Bengal">West Bengal</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        City / Town
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Raxaul, Motihari, Bettiah"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Academic Background */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-slate-800 border-b pb-2">
                    Step 2: Educational Background & Year
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Highest Completed / Appeared Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B59]/30"
                    >
                      <option value="10th (Secondary)">Class 10th (Matriculation)</option>
                      <option value="12th Science (PCM)">12th Science (PCM)</option>
                      <option value="12th Science (PCB)">12th Science (PCB)</option>
                      <option value="12th Commerce">12th Commerce</option>
                      <option value="12th Arts">12th Arts / Humanities</option>
                      <option value="Polytechnic Diploma">Polytechnic / Diploma in Engg</option>
                      <option value="Graduation (BA/B.Com/B.Sc)">Graduation Degree (BA / B.Com / B.Sc)</option>
                      <option value="Professional UG (BBA/BCA/B.Tech)">Professional UG (BBA / BCA / B.Tech)</option>
                      <option value="Post-Graduation (MA/M.Com/M.Sc/MBA)">Post-Graduation (MA / M.Com / MBA)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Year of Passing / Appearing
                      </label>
                      <select
                        value={yearOfPassing}
                        onChange={(e) => setYearOfPassing(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="2026">2026 (Appearing / Recent)</option>
                        <option value="2025">2025</option>
                        <option value="2024">2024</option>
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021 or earlier">2021 or earlier (Gap case)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Admission Session
                      </label>
                      <select
                        value={admissionSession}
                        onChange={(e) => setAdmissionSession(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white font-semibold text-[#082B59]"
                      >
                        <option value="2026-2027">Session 2026–2027 (Current)</option>
                        <option value="2027-2028">Session 2027–2028 (Upcoming)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Course & University */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <h4 className="text-sm font-bold text-slate-800 border-b pb-2">
                    Step 3: Desired Course, University & Study Mode
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Course You Want to Pursue <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={interestedCourse}
                      onChange={(e) => setInterestedCourse(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#082B59]/30 font-medium"
                    >
                      {initialCourses.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.shortName} — {c.name} ({c.level})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred Study Mode
                      </label>
                      <select
                        value={preferredMode}
                        onChange={(e) => setPreferredMode(e.target.value as any)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="Regular">Regular (Campus Full-Time)</option>
                        <option value="Distance">Distance Education (Flexible)</option>
                        <option value="Online">Online Degree (Digital LMS)</option>
                        <option value="Open Board">Open Board (10th/12th Assistance)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Preferred University (Optional)
                      </label>
                      <select
                        value={preferredUniversity}
                        onChange={(e) => setPreferredUniversity(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                      >
                        <option value="">Any Suitable & Verified University</option>
                        {initialUniversities.map((u) => (
                          <option key={u.id} value={u.name}>
                            {u.name} ({u.state})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Expected Annual Budget (Approximate)
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Below ₹25,000/yr">Below ₹25,000/yr (Affordable / Distance)</option>
                      <option value="₹25,000 – ₹50,000/yr">₹25,000 – ₹50,000/yr</option>
                      <option value="₹50,000 – ₹80,000/yr">₹50,000 – ₹80,000/yr</option>
                      <option value="₹80,000 – ₹1,50,000/yr">₹80,000 – ₹1,50,000/yr (Technical / Professional)</option>
                      <option value="Above ₹1,50,000/yr">Above ₹1,50,000/yr</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Any Specific Question or Requirement?
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Hostel facility details, lateral entry eligibility, exam dates..."
                      value={questions}
                      onChange={(e) => setQuestions(e.target.value)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="bg-amber-50/70 p-3 rounded-lg border border-amber-200">
                    <label className="flex items-start gap-2 cursor-pointer text-[11px] text-amber-950 leading-relaxed">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => setConsent(e.target.checked)}
                        className="rounded border-amber-400 text-[#082B59] mt-0.5"
                      />
                      <span>
                        I confirm that the information provided is accurate, and I consent to receive admission guidance, eligibility updates, and course fee details from <strong>SAHI RAAH CONSULTANCY</strong> via Call, SMS, or WhatsApp.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Form Navigation Actions */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold transition-all shadow-md"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-2.5 rounded-lg bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-extrabold shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Submitting Enquiry...</span>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-slate-900" />
                        <span>Submit Admission Enquiry</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
