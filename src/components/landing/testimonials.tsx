export function Testimonials() {
  return (
    <section className="py-16 bg-zinc-50 dark:bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-xl font-semibold mb-8">What students say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <div key={i} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="text-zinc-600 dark:text-zinc-400">“This platform helped me land my first dev job!”</div>
              <div className="mt-4 text-sm font-medium">Student {i}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


