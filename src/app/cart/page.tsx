import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { PaymentOptions } from '@/components/checkout/payment-options';

export default async function CartPage() {
  const cartCookie = cookies().get('cart')?.value;
  const ids: string[] = cartCookie ? JSON.parse(cartCookie) : [];
  const courses = ids.length
    ? await prisma.course.findMany({ where: { id: { in: ids } }, select: { id: true, title: true, slug: true, priceCents: true } })
    : [];
  const total = courses.reduce((sum, c) => sum + c.priceCents, 0);
  const success = (new URLSearchParams(globalThis?.location ? location.search : '')).get('success');

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Cart</h1>
      {success && (
        <p className="text-green-600">Payment success! Your purchases will be available shortly.</p>
      )}
      {courses.length === 0 ? (
        <p>Your cart is empty. <Link className="underline" href="/courses">Browse courses</Link></p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          <div className="space-y-3">
            {courses.map((c) => (
              <div key={c.id} className="flex items-center justify-between border rounded-2xl px-3 py-3">
                <div className="flex items-center gap-3">
                  <div className="size-16 rounded-xl bg-zinc-100 dark:bg-zinc-900" />
                  <div>
                    <Link className="font-medium hover:underline" href={`/courses/${c.slug}`}>{c.title}</Link>
                    <div className="text-xs text-zinc-500">${(c.priceCents / 100).toFixed(2)}</div>
                  </div>
                </div>
                <form action="/api/cart/remove" method="post">
                  <input type="hidden" name="courseId" value={c.id} />
                  <button className="text-sm text-zinc-500 hover:underline">Remove</button>
                </form>
              </div>
            ))}
          </div>
          <aside className="border rounded-2xl p-4 space-y-3 h-fit">
            <div className="font-semibold">Order Summary</div>
            <div className="flex items-center justify-between text-sm">
              <div>Subtotal</div>
              <div>${(total / 100).toFixed(2)}</div>
            </div>
            <div className="text-xs text-zinc-500">Taxes calculated at checkout.</div>
            <PaymentOptions />
          </aside>
        </div>
      )}
    </main>
  );
}


