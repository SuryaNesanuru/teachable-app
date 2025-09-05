import { Code2, Palette, ChartNoAxesColumn } from 'lucide-react';

const items = [
  { name: 'Programming', icon: Code2 },
  { name: 'Design', icon: Palette },
  { name: 'Marketing', icon: ChartNoAxesColumn },
];

export function Categories() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-xl font-semibold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {items.map((c) => (
            <div key={c.name} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex items-center gap-3 hover:shadow-lg transition">
              <c.icon />
              <div className="font-medium">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


