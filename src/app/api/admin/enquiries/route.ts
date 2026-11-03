import { NextResponse } from 'next/server';
import { getServiceSupabase } from '@/lib/supabase';

export async function GET() {
  try {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Admin Enquiries Fetch Error]:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Map DB snake_case columns back to camelCase frontend interface
    const mapped = (data || []).map((row) => ({
      id: row.id,
      studentName: row.student_name,
      mobileNumber: row.mobile_number,
      whatsappNumber: row.whatsapp_number,
      email: row.email,
      state: row.state,
      city: row.city,
      highestQualification: row.highest_qualification,
      yearOfPassing: row.year_of_passing,
      interestedCourse: row.interested_course,
      preferredUniversity: row.preferred_university,
      preferredMode: row.preferred_mode,
      budget: row.budget,
      admissionSession: row.admission_session,
      questions: row.questions,
      status: row.status,
      priority: row.priority,
      followUpDate: row.follow_up_date,
      source: row.source,
      counselorNotes: Array.isArray(row.counselor_notes) ? row.counselor_notes : [],
      verifiedDocuments: Array.isArray(row.verified_documents) ? row.verified_documents : [],
      createdAt: row.created_at
    }));

    return NextResponse.json({ success: true, enquiries: mapped });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = getServiceSupabase();

    const record = {
      id: body.id,
      student_name: body.studentName,
      mobile_number: body.mobileNumber,
      whatsapp_number: body.whatsappNumber,
      email: body.email,
      state: body.state,
      city: body.city,
      highest_qualification: body.highestQualification,
      year_of_passing: body.yearOfPassing,
      interested_course: body.interestedCourse,
      preferred_university: body.preferredUniversity,
      preferred_mode: body.preferredMode,
      budget: body.budget,
      admission_session: body.admissionSession,
      questions: body.questions,
      status: body.status,
      priority: body.priority,
      follow_up_date: body.followUpDate,
      source: body.source,
      counselor_notes: body.counselorNotes || [],
      verified_documents: body.verifiedDocuments || [],
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('enquiries')
      .upsert(record, { onConflict: 'id' });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const supabase = getServiceSupabase();
    const { error } = await supabase.from('enquiries').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
