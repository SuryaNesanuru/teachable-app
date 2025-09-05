import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const courseId = String(form.get('courseId') || '');
  if (!courseId) return NextResponse.json({ ok: false }, { status: 400 });
  const cookie = req.cookies.get('cart')?.value;
  const items: string[] = cookie ? JSON.parse(cookie) : [];
  const next = items.filter((id) => id !== courseId);
  const res = NextResponse.redirect(new URL('/cart', req.url));
  res.cookies.set('cart', JSON.stringify(next), { httpOnly: true, sameSite: 'lax', path: '/' });
  return res;
}


