import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { createPresignedPutUrl } from '@/lib/storage';

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session || !['INSTRUCTOR', 'ADMIN'].includes((session.user as any).role)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { key, contentType } = await req.json();
  if (!key || !contentType) return NextResponse.json({ error: 'Missing key/contentType' }, { status: 400 });
  const data = await createPresignedPutUrl(key, contentType);
  return NextResponse.json(data);
}


