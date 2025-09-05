"use client";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { MoonStar, Sun } from 'lucide-react';

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/60 dark:bg-black/40 border-b border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold">Teachable</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/courses" className="hover:underline">Courses</Link>
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <Link href="/cart" className="hover:underline">Cart</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" aria-label="Toggle theme" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
            {isDark ? <Sun size={18} /> : <MoonStar size={18} />}
          </Button>
          <Link href="/api/auth/signin" className="hidden sm:inline-block">
            <Button size="sm">Sign in</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}


