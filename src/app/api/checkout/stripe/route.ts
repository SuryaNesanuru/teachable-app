import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-12-18.acacia' as any });

export async function POST(req: NextRequest) {
  try {
    const cartCookie = req.cookies.get('cart')?.value;
    const ids: string[] = cartCookie ? JSON.parse(cartCookie) : [];
    if (!ids.length) return NextResponse.json({ error: 'Empty cart' }, { status: 400 });
    const courses = await prisma.course.findMany({ where: { id: { in: ids } }, select: { id: true, title: true, priceCents: true } });
    if (!courses.length) return NextResponse.json({ error: 'Invalid cart' }, { status: 400 });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: courses.map((c) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: c.title },
          unit_amount: c.priceCents,
        },
        quantity: 1,
      })),
      success_url: `${process.env.NEXTAUTH_URL}/cart?success=1`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart?canceled=1`,
      metadata: { courseIds: ids.join(',') },
    });

    const res = NextResponse.redirect(session.url!);
    // keep cart for now; would clear on webhook success
    res.headers.set('Cache-Control', 'no-store');
    return res;
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


