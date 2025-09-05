import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { ProgressCard } from '@/components/dashboard/progress-card';
import Link from 'next/link';

export default async function DashboardPage() {
  const session = await getServerSession();
  if (!session) return <p>Please sign in.</p>;

  const purchases = await prisma.purchase.findMany({
    where: { userId: (session.user as any).id },
    include: {
      course: { select: { id: true, title: true, slug: true } },
    },
  });

  const coursesWithProgress = purchases.map((p) => ({
    id: p.course.id,
    slug: p.course.slug,
    title: p.course.title,
    progress: Math.floor(Math.random() * 100), // TODO: calculate real progress
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <p className="text-sm text-zinc-500">Track your learning progress</p>
      </div>

      {coursesWithProgress.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500 mb-4">You haven't enrolled in any courses yet.</p>
          <Link href="/courses" className="text-sm underline">Browse courses</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coursesWithProgress.map((course) => (
            <ProgressCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}


