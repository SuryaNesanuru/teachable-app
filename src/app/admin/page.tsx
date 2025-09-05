import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { UsersTable } from '@/components/admin/users-table';

export default async function AdminPage() {
  const session = await getServerSession();
  if (!session || (session.user as any).role !== 'ADMIN') {
    redirect('/dashboard');
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-zinc-500">Manage users, courses, and platform settings</p>
      </div>

      <UsersTable />
    </div>
  );
}


