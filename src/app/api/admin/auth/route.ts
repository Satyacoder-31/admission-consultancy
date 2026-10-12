import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    // Default admin passcode
    const validPasswords = ['sahiraah2026', 'admin123', '8092911956'];

    if (password && validPasswords.includes(password.trim())) {
      return NextResponse.json({
        success: true,
        token: `sr-admin-session-${Date.now()}`,
        user: { name: 'SAHI RAAH Admin Counsellor', role: 'admin' }
      });
    }

    return NextResponse.json(
      { error: 'Invalid administrator access key. Please verify credentials.' },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed.' },
      { status: 500 }
    );
  }
}
