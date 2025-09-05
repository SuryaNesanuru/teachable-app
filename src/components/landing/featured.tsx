"use client";
import { useEffect, useState } from 'react';
import { CourseCard } from '@/components/catalog/course-card';

export function Featured() {
  const [courses, setCourses] = useState<any[]>([]);
  useEffect(() => {
    fetch('/api/featured').then((r) => r.json()).then((d) => setCourses(d.courses || [])).catch(() => {});
  }, []);
  if (!courses.length) return null;
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-xl font-semibold mb-6">Featured</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </div>
      </div>
    </section>
  );
}


