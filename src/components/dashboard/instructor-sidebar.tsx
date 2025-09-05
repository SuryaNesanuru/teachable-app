"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Plus, BarChart3, DollarSign, FileText, Settings } from 'lucide-react';

const items = [
  { href: '/instructor', label: 'Overview', icon: BarChart3 },
  { href: '/instructor/courses/new', label: 'Create Course', icon: Plus },
  { href: '/instructor/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/instructor/sales', label: 'Sales', icon: DollarSign },
  { href: '/instructor/content', label: 'Content', icon: FileText },
  { href: '/instructor/settings', label: 'Settings', icon: Settings },
];

export function InstructorSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 p-4">
      <nav className="space-y-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors',
                active
                  ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900/50'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
