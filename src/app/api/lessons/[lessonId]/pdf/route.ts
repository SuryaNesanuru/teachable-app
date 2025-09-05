import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { userOwnsCourse } from '@/lib/access';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export async function GET(req: NextRequest, { params }: { params: { lessonId: string } }) {
  const session = await getServerSession();
  const userId = session?.user?.id;
  const lesson = await prisma.lesson.findUnique({
    where: { id: params.lessonId },
    include: { module: { select: { courseId: true } } },
  });
  if (!lesson || !lesson.pdfUrl) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const owns = await userOwnsCourse(userId, lesson.module.courseId);
  if (!owns && !lesson.isFreePreview) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const pdfRes = await fetch(lesson.pdfUrl, { cache: 'no-store' });
  if (!pdfRes.ok) return NextResponse.json({ error: 'Source fetch failed' }, { status: 502 });
  const bytes = new Uint8Array(await pdfRes.arrayBuffer());

  const pdfDoc = await PDFDocument.load(bytes, { updateMetadata: false });
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const watermarkText = `User: ${session?.user?.email || 'guest'}  •  Lesson: ${lesson.title}`;

  const pages = pdfDoc.getPages();
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(watermarkText, {
      x: 40,
      y: height - 40,
      size: 10,
      font,
      color: rgb(0.8, 0.8, 0.8),
      rotate: { type: 'degrees', angle: 0 },
      opacity: 0.6,
    });
  }

  const out = await pdfDoc.save();
  return new NextResponse(out, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="${encodeURIComponent(lesson.title)}.pdf"`,
      'Cache-Control': 'no-store',
    },
  });
}


