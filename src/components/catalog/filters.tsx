"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Filters({ categories }: { categories: { name: string; slug: string }[] }) {
  const sp = useSearchParams();
  const router = useRouter();
  const [q, setQ] = useState(sp.get('q') ?? '');
  const [category, setCategory] = useState(sp.get('category') ?? '');
  const [min, setMin] = useState(sp.get('min') ?? '');
  const [max, setMax] = useState(sp.get('max') ?? '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (q) params.set('q', q);
    if (category) params.set('category', category);
    if (min) params.set('min', min);
    if (max) params.set('max', max);
    router.replace(`/courses?${params.toString()}`);
  }, [q, category, min, max]);

  return (
    <aside className="space-y-4">
      <input className="w-full rounded-xl border px-3 py-2" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
      <select className="w-full rounded-xl border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>{c.name}</option>
        ))}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input className="rounded-xl border px-3 py-2" placeholder="Min $" value={min} onChange={(e) => setMin(e.target.value)} />
        <input className="rounded-xl border px-3 py-2" placeholder="Max $" value={max} onChange={(e) => setMax(e.target.value)} />
      </div>
    </aside>
  );
}


