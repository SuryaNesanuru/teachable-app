import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const courses = await prisma.course.findMany({
    where: { isPublished: true },
    orderBy: { createdAt: 'desc' },
    take: 6,
    select: { id: true, slug: true, title: true, subtitle: true, priceCents: true, thumbnailUrl: true, category: { select: { name: true } } },
  });
  return NextResponse.json({ courses });
}


