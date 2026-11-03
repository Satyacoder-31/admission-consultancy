import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { studentName, mobileNumber, interestedCourse } = body;

    if (!studentName || !mobileNumber || !interestedCourse) {
      return NextResponse.json(
        { error: 'Student name, mobile number, and interested course are required.' },
        { status: 400 }
      );
    }

    // Validate 10-digit Indian phone
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Please provide a valid 10-digit Indian mobile number.' },
        { status: 400 }
      );
    }

    const enquiryId = body.id || `srv-${Date.now()}`;
    const enquiryRecord = {
      id: enquiryId,
      student_name: studentName,
      mobile_number: cleanPhone,
      whatsapp_number: (body.whatsappNumber || cleanPhone).replace(/\D/g, ''),
      email: body.email || null,
      state: body.state || 'Bihar',
      city: body.city || null,
      highest_qualification: body.highestQualification || null,
      year_of_passing: body.yearOfPassing || null,
      interested_course: interestedCourse,
      preferred_university: body.preferredUniversity || null,
      preferred_mode: body.preferredMode || 'Regular',
      budget: body.budget || null,
      admission_session: body.admissionSession || '2026-2027',
      questions: body.questions || null,
      status: body.status || 'New',
      priority: body.priority || 'Normal',
      follow_up_date: body.followUpDate || null,
      source: body.source || 'Website Form',
      counselor_notes: body.counselorNotes || [],
      verified_documents: body.verifiedDocuments || [],
      created_at: body.createdAt || new Date().toISOString()
    };

    // Save to Supabase Cloud Database
    try {
      const supabase = getServiceSupabase();
      const { error: dbError } = await supabase
        .from('enquiries')
        .upsert(enquiryRecord, { onConflict: 'id' });

      if (dbError) {
        console.error('[Supabase Save Error]:', dbError);
      } else {
        console.log('[Supabase Enquiry Saved]:', enquiryId);
      }
    } catch (dbErr) {
      console.error('[Supabase Exception]:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our admission counsellor will contact you shortly.',
      enquiryId
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error while logging enquiry.' },
      { status: 500 }
    );
  }
}
