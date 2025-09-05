"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../../ui/button';

export function SearchBar() {
  const [q, setQ] = useState('');
  const router = useRouter();
  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    router.push(`/courses?${params.toString()}`);
  }
  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl px-4 -mt-6">
      <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-2 shadow-sm">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search courses (e.g., Next.js, Design, Marketing)"
          className="flex-1 bg-transparent outline-none px-2 py-2 text-sm"
        />
        <Button type="submit" size="md">Search</Button>
      </div>
    </form>
  );
}


