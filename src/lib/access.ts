import { prisma } from '@/lib/prisma';

export async function userOwnsCourse(userId: string | null | undefined, courseId: string): Promise<boolean> {
  if (!userId) return false;
  const purchase = await prisma.purchase.findUnique({
    where: { userId_courseId: { userId, courseId } },
    select: { id: true },
  });
  return !!purchase;
}


