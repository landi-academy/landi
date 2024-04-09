import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sanityClient } from '@/libs/sanity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.text();
  const sig = req.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 500 });
  }

  // Обработка события завершения сессии оплаты
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Сохраняем документ в Sanity
    try {
        await sanityClient.create({
        _type: 'courseAccess',
        courseId: 'prod_PtUy08B8jxadVd', // Установите реальный идентификатор курса или извлеките его из сессии
        slug: {
          _type: 'slug',
          current: uuidv4(),
        },
        createdAt: new Date().toISOString(),
        stripePurchaseId: session.id,
      });

      return NextResponse.json('Event Received', {
        status: 200,
        statusText: 'Event Received',
      });
    } catch (error) {
      console.error('Ошибка при создании записи в Sanity:', error);
      return new NextResponse('Ошибка при создании записи в Sanity', { status: 500 });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
