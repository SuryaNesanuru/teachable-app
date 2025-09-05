import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { userOwnsCourse } from '@/lib/access';
import { Tabs } from '@/components/ui/tabs';
import { Suspense } from 'react';

async function getCourse(slug: string) {
  return prisma.course.findUnique({
    where: { slug },
    include: {
      instructor: { select: { id: true, name: true } },
      modules: { include: { lessons: { orderBy: { order: 'asc' } } }, orderBy: { order: 'asc' } },
    },
  });
}

export default async function CourseDetail({ params }: { params: { slug: string } }) {
  const session = await getServerSession();
  const course = await getCourse(params.slug);
  if (!course) return <main className="p-6">Not found</main>;

  const owns = await userOwnsCourse(session?.user?.id, course.id);
  const freePct = course.freePreviewPct ?? 20;

  return (
    <main className="p-6 space-y-6">
      <section className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 bg-gradient-to-tr from-indigo-500/5 to-fuchsia-500/5">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
            <p className="mt-1 text-sm text-zinc-500">by {course.instructor?.name}</p>
          </div>
          <div className="text-right shrink-0 sticky top-4">
            <div className="text-xl font-semibold">${(course.priceCents / 100).toFixed(2)}</div>
            {!owns && (
              <form action={`/api/cart/add`} method="post">
                <input type="hidden" name="courseId" value={course.id} />
                <button className="mt-2 w-full rounded-2xl bg-black text-white px-5 py-2 text-sm">Add to cart</button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Suspense>
        <TabsWrapper description={course.description} modules={course.modules as any} owns={owns} freePct={freePct} />
      </Suspense>
    </main>
  );
}

function TabsWrapper({ description, modules, owns, freePct }: { description: string; modules: any[]; owns: boolean; freePct: number }) {
  'use client';
  const [tab, setTab] = (require('react') as typeof import('react')).useState('overview');
  return (
    <div>
      <Tabs items={[{ value: 'overview', label: 'Overview' }, { value: 'curriculum', label: 'Curriculum' }, { value: 'reviews', label: 'Reviews' }, { value: 'instructor', label: 'Instructor' }]} value={tab} onValueChange={setTab} />
      <div className="mt-4">
        {tab === 'overview' && <p className="text-base leading-7 text-zinc-700 dark:text-zinc-300">{description}</p>}
        {tab === 'curriculum' && (
          <ul className="space-y-2">
            {modules.map((m) => (
              <li key={m.id} className="border rounded-2xl border-zinc-200 dark:border-zinc-800 overflow-hidden">
                <div className="px-3 py-2 font-medium">{m.title}</div>
                <ul>
                  {m.lessons.map((l: any) => {
                    const preview = l.isFreePreview;
                    const canView = owns || preview;
                    return (
                      <li key={l.id} className="px-3 py-2 text-sm flex items-center justify-between border-t">
                        <div>{l.title}</div>
                        <div className="text-xs text-zinc-500">{canView ? 'Preview' : `Locked - ${freePct}% free`}</div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        )}
        {tab === 'reviews' && <div className="text-sm text-zinc-500">Reviews coming soon.</div>}
        {tab === 'instructor' && <div className="text-sm text-zinc-500">Instructor bio coming soon.</div>}
      </div>
    </div>
  );
}


