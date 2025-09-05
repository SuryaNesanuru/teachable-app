import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';

export function ProgressCard({ course }: { course: { id: string; slug: string; title: string; progress: number } }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <Link href={`/courses/${course.slug}`} className="font-medium hover:underline">
          {course.title}
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{course.progress}%</span>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
            <div
              className="bg-black dark:bg-white h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
