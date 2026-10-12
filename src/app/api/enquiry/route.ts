import { NextResponse } from 'next/server';

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

    const enquiry = {
      id: `srv-${Date.now()}`,
      ...body,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    console.log('[Server Enquiry Received]', enquiry);

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully. Our admission counsellor will contact you shortly.',
      enquiryId: enquiry.id
    });
  } catch (error) {
    console.error('Error processing enquiry:', error);
    return NextResponse.json(
      { error: 'Internal server error while logging enquiry.' },
      { status: 500 }
    );
  }
}
