import { prisma } from '@/lib/prisma';
import { Filters } from '@/components/catalog/filters';
import { CourseCard } from '@/components/catalog/course-card';

export const dynamic = 'force-dynamic';

async function getData(searchParams: Record<string, string | string[] | undefined>) {
  const q = typeof searchParams.q === 'string' ? searchParams.q : undefined;
  const category = typeof searchParams.category === 'string' ? searchParams.category : undefined;
  const min = searchParams.min ? Number(searchParams.min) : undefined;
  const max = searchParams.max ? Number(searchParams.max) : undefined;

  return prisma.course.findMany({
    where: {
      isPublished: true,
      title: q ? { contains: q, mode: 'insensitive' } : undefined,
      category: category ? { slug: category } : undefined,
      priceCents: {
        gte: typeof min === 'number' && !Number.isNaN(min) ? min : undefined,
        lte: typeof max === 'number' && !Number.isNaN(max) ? max : undefined,
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      subtitle: true,
      priceCents: true,
      thumbnailUrl: true,
      category: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export default async function CoursesPage({ searchParams }: { searchParams: Record<string, string | string[] | undefined> }) {
  const [courses, categories] = await Promise.all([
    getData(searchParams),
    prisma.category.findMany({ select: { name: true, slug: true }, orderBy: { name: 'asc' } }),
  ]);
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-8">
        <Filters categories={categories} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c as any} />
          ))}
        </div>
      </div>
    </main>
  );
}


