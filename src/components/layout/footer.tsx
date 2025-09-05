import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-4 py-10 grid gap-6 sm:grid-cols-2 md:grid-cols-4 text-sm">
        <div>
          <div className="font-semibold mb-3">Teachable</div>
          <p className="text-zinc-500">A modern marketplace for learning and software.</p>
        </div>
        <div>
          <div className="font-semibold mb-3">Company</div>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">About</Link></li>
            <li><Link href="#" className="hover:underline">Contact</Link></li>
            <li><Link href="#" className="hover:underline">Careers</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Legal</div>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Privacy</Link></li>
            <li><Link href="#" className="hover:underline">Terms</Link></li>
            <li><Link href="#" className="hover:underline">Cookies</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3">Resources</div>
          <ul className="space-y-2">
            <li><Link href="#" className="hover:underline">Help Center</Link></li>
            <li><Link href="#" className="hover:underline">Blog</Link></li>
            <li><Link href="#" className="hover:underline">Developers</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 dark:border-zinc-800 py-6 text-center text-xs text-zinc-500">© {new Date().getFullYear()} Teachable, Inc.</div>
    </footer>
  );
}


