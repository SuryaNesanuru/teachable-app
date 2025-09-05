import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { AnalyticsChart } from '@/components/dashboard/analytics-chart';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function InstructorPage() {
  const session = await getServerSession();
  if (!session || !['INSTRUCTOR', 'ADMIN'].includes((session.user as any).role)) {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Instructor Overview</h1>
        <p className="text-sm text-zinc-500">Track your course performance and earnings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-zinc-500">Total Students</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <div className="text-xs text-green-600">+12% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-zinc-500">Monthly Revenue</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,420</div>
            <div className="text-xs text-green-600">+8% from last month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <div className="text-sm font-medium text-zinc-500">Active Courses</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <div className="text-xs text-zinc-600">3 published</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="text-lg font-semibold">Performance Overview</div>
        </CardHeader>
        <CardContent>
          <AnalyticsChart />
        </CardContent>
      </Card>
    </div>
  );
}


