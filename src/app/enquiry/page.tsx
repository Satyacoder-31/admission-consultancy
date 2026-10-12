'use client';

import React, { useState } from 'react';
import { initialCourses } from '@/data/courses';
import { initialUniversities } from '@/data/universities';
import { addEnquiry } from '@/lib/storage';
import { validateIndianPhone, getWhatsAppUrl } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft, 
  MessageCircle, 
  ShieldCheck 
} from 'lucide-react';

export default function EnquiryPage() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [studentName, setStudentName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [sameAsWhatsApp, setSameAsWhatsApp] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('Bihar');
  const [city, setCity] = useState('Raxaul');

  const [highestQualification, setHighestQualification] = useState('12th Science (PCM)');
  const [yearOfPassing, setYearOfPassing] = useState('2025');

  const [interestedCourse, setInterestedCourse] = useState(initialCourses[0].name);
  const [preferredUniversity, setPreferredUniversity] = useState('');
  const [preferredMode, setPreferredMode] = useState<'Regular' | 'Distance' | 'Online' | 'Open Board'>('Regular');
  const [budget, setBudget] = useState('₹40,000 – ₹80,000/yr');
  const [admissionSession, setAdmissionSession] = useState('2026-2027');
  const [questions, setQuestions] = useState('');
  const [consent, setConsent] = useState(true);

  const validateStep1 = () => {
    if (!studentName.trim()) {
      setError('Please provide the student’s full name.');
      return false;
    }
    if (!validateIndianPhone(mobileNumber)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep2 = () => {
    if (!highestQualification || !yearOfPassing) {
      setError('Please fill in academic background details.');
      return false;
    }
    setError(null);
    return true;
  };

  const validateStep3 = () => {
    if (!interestedCourse) {
      setError('Please select an interested course.');
      return false;
    }
    if (!consent) {
      setError('Please agree to the privacy and consultation consent.');
      return false;
    }
    setError(null);
    return true;
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
      addEnquiry(payload);

      try {
        await fetch('/api/enquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch {
        // background API fallback
      }

      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // confetti fallback
      }

      setIsSubmitted(true);
    } catch {
      setError('Failed to submit enquiry. Please connect directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const msg = `Hello SAHI RAAH CONSULTANCY, I just submitted an admission enquiry on your website.\n*Student Name:* ${studentName}\n*Course:* ${interestedCourse}\n*Session:* ${admissionSession}\n*Phone:* ${mobileNumber}\nPlease share admission counselling details.`;
    window.open(getWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20">
      <section className="bg-gradient-to-b from-[#082B59] to-[#0D386E] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Session 2026–2027 & 2027–2028</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Apply for Admission Guidance
          </h1>
          <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
            Fill out the 3-minute guidance application below. Our senior counsellor will assess your credentials and recommend verified universities.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Progress bar */}
          {!isSubmitted && (
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
              <div className="flex items-center justify-between text-xs font-bold mb-2">
                <span className={step >= 1 ? 'text-[#082B59]' : 'text-slate-400'}>
                  1. Contact Details
                </span>
                <span className={step >= 2 ? 'text-[#082B59]' : 'text-slate-400'}>
                  2. Academic Qualifications
                </span>
                <span className={step >= 3 ? 'text-[#082B59]' : 'text-slate-400'}>
                  3. Course & Preference
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 via-[#1355A5] to-amber-400 transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="p-6 sm:p-10">
            {error && (
              <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <h3 className="text-2xl font-black text-slate-900">
                  Enquiry Successfully Received!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{studentName}</strong>. Our Raxaul counselling desk will review your details for <strong>{interestedCourse}</strong> and contact you within 2 to 4 business hours.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleWhatsAppRedirect}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-lg transition-transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Follow-Up</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStep(1);
                    }}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-base font-bold text-slate-900 border-b pb-2">
                      Step 1: Student Information
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Full Student Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rahul Kumar Sah"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/20"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          10-Digit Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 8092911956"
                          maxLength={10}
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/20"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          placeholder="student@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#082B59]/20"
                        />
                      </div>
                    </div>

                    {/* WhatsApp sync */}
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                      <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sameAsWhatsApp}
                          onChange={(e) => setSameAsWhatsApp(e.target.checked)}
                          className="rounded text-teal-600 focus:ring-teal-500"
                        />
                        <span>WhatsApp number is the same as calling number</span>
                      </label>

                      {!sameAsWhatsApp && (
                        <div className="mt-2 pt-2 border-t border-slate-200">
                          <label className="block text-xs font-semibold text-slate-600 mb-1">
                            Alternative WhatsApp Number
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                        <select
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value="Bihar">Bihar</option>
                          <option value="Nepal (Border / Birgunj)">Nepal (Border / Birgunj)</option>
                          <option value="Uttar Pradesh">Uttar Pradesh</option>
                          <option value="Jharkhand">Jharkhand</option>
                          <option value="West Bengal">West Bengal</option>
                          <option value="Other">Other State</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">City / Town</label>
                        <input
                          type="text"
                          placeholder="e.g. Raxaul, Motihari, Bettiah"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-base font-bold text-slate-900 border-b pb-2">
                      Step 2: Educational Background
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Highest Qualification Completed / Appeared <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={highestQualification}
                        onChange={(e) => setHighestQualification(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white"
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Year of Passing
                        </label>
                        <select
                          value={yearOfPassing}
                          onChange={(e) => setYearOfPassing(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value="2026">2026 (Appearing)</option>
                          <option value="2025">2025</option>
                          <option value="2024">2024</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021 or earlier">2021 or earlier (Gap case)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Admission Session
                        </label>
                        <select
                          value={admissionSession}
                          onChange={(e) => setAdmissionSession(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white font-bold text-[#082B59]"
                        >
                          <option value="2026-2027">Session 2026–2027 (Current)</option>
                          <option value="2027-2028">Session 2027–2028 (Upcoming)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in duration-200">
                    <h3 className="text-base font-bold text-slate-900 border-b pb-2">
                      Step 3: Programme & University Preference
                    </h3>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Course You Want to Pursue <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={interestedCourse}
                        onChange={(e) => setInterestedCourse(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white font-semibold text-[#082B59]"
                      >
                        {initialCourses.map((c) => (
                          <option key={c.id} value={c.name}>
                            {c.shortName} — {c.name} ({c.level})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred Study Mode
                        </label>
                        <select
                          value={preferredMode}
                          onChange={(e) => setPreferredMode(e.target.value as any)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value="Regular">Regular (Campus Full-Time)</option>
                          <option value="Distance">Distance Education (Flexible)</option>
                          <option value="Online">Online Degree (Digital LMS)</option>
                          <option value="Open Board">Open Board (10th/12th Guidance)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Preferred University (Optional)
                        </label>
                        <select
                          value={preferredUniversity}
                          onChange={(e) => setPreferredUniversity(e.target.value)}
                          className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white"
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
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Expected Annual Budget (Approximate)
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 bg-white"
                      >
                        <option value="Below ₹25,000/yr">Below ₹25,000/yr (Affordable / Distance)</option>
                        <option value="₹25,000 – ₹50,000/yr">₹25,000 – ₹50,000/yr</option>
                        <option value="₹50,000 – ₹80,000/yr">₹50,000 – ₹80,000/yr</option>
                        <option value="₹80,000 – ₹1,50,000/yr">₹80,000 – ₹1,50,000/yr (Technical / Professional)</option>
                        <option value="Above ₹1,50,000/yr">Above ₹1,50,000/yr</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Any Questions or Specific Requirements?
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Hostel fees, lateral entry eligibility, examination schedule..."
                        value={questions}
                        onChange={(e) => setQuestions(e.target.value)}
                        className="w-full text-xs sm:text-sm p-3 rounded-xl border border-slate-300 focus:outline-none"
                      />
                    </div>

                    <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                      <label className="flex items-start gap-2.5 text-xs text-amber-950 leading-relaxed cursor-pointer">
                        <input
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 rounded text-[#082B59]"
                        />
                        <span>
                          I confirm that the details entered above are true and accurate. I consent to receive personalized admission guidance, fee estimates, and eligibility updates from <strong>SAHI RAAH CONSULTANCY</strong>.
                        </span>
                      </label>
                    </div>
                  </div>
                )}

                {/* Form Navigation Buttons */}
                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  {step > 1 ? (
                    <button
                      type="button"
                      onClick={() => {
                        setError(null);
                        setStep(step - 1);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => {
                        if (step === 1 && validateStep1()) setStep(2);
                        else if (step === 2 && validateStep2()) setStep(3);
                      }}
                      className="px-7 py-3 rounded-xl bg-[#082B59] hover:bg-[#1355A5] text-white text-xs font-bold flex items-center gap-2 shadow-md"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 text-xs font-black shadow-xl flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting Application...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-slate-900" />
                          <span>Submit Admission Guidance Application</span>
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
    </div>
  );
}
