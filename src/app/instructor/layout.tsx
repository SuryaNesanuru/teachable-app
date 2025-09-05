import { InstructorSidebar } from '@/components/dashboard/instructor-sidebar';

export default function InstructorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <InstructorSidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
