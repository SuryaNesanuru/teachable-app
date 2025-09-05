"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function PaymentOptions() {
  const [method, setMethod] = useState<'stripe' | 'paypal' | 'razorpay'>('stripe');
  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {(['stripe', 'paypal', 'razorpay'] as const).map((m) => (
          <button key={m} onClick={() => setMethod(m)} className={`px-3 py-2 rounded-xl border ${method === m ? 'border-black dark:border-white' : 'border-zinc-200 dark:border-zinc-800'}`}>{m}</button>
        ))}
      </div>
      {method === 'stripe' && (
        <form action="/api/checkout/stripe" method="post">
          <Button className="w-full">Checkout with Stripe</Button>
        </form>
      )}
      {method !== 'stripe' && (
        <div className="text-xs text-zinc-500">This gateway is coming soon.</div>
      )}
    </div>
  );
}


