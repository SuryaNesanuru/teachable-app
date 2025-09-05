import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '@/lib/prisma';

export const config = { api: { bodyParser: false } } as any;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-12-18.acacia' as any });

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  const whSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !whSecret) {
    return NextResponse.json({ error: 'Missing signature or secret' }, { status: 400 });
  }

  // Read raw body for signature verification
  const rawBody = await req.arrayBuffer();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(rawBody), sig, whSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const courseIds = (session.metadata?.courseIds || '').split(',').filter(Boolean);
      const amountTotal = session.amount_total ?? 0;
      const currency = session.currency ?? 'usd';
      const invoiceUrl = (session.invoice as any)?.hosted_invoice_url || undefined;

      // Optionally, you can associate the user by looking up customer email
      // or pass a userId in metadata when creating session.
      const email = session.customer_details?.email || undefined;
      const user = email ? await prisma.user.findUnique({ where: { email } }) : null;

      if (user && courseIds.length) {
        for (const courseId of courseIds) {
          await prisma.purchase.upsert({
            where: { userId_courseId: { userId: user.id, courseId } },
            update: { amountCents: amountTotal, currency, provider: 'stripe', invoiceUrl, providerId: session.id },
            create: {
              userId: user.id,
              courseId,
              amountCents: amountTotal,
              currency,
              provider: 'stripe',
              providerId: session.id,
              invoiceUrl,
            },
          });
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


