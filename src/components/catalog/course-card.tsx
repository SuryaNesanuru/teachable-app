"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export function CourseCard({ course }: { course: { id: string; slug: string; title: string; subtitle?: string | null; priceCents: number; thumbnailUrl?: string | null; category?: { name: string | null } | null } }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.35 }}>
      <Link href={`/courses/${course.slug}`}>
        <Card className="overflow-hidden hover:shadow-lg transition">
          <div className="aspect-video bg-zinc-100 dark:bg-zinc-900" />
          <CardHeader>
            <div className="font-medium line-clamp-1">{course.title}</div>
            <div className="text-sm text-zinc-500 line-clamp-1">{course.subtitle}</div>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-zinc-500">{course.category?.name}</div>
            <div className="mt-2 font-semibold">${(course.priceCents / 100).toFixed(2)}</div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}


