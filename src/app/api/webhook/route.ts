import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/libs/sanity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');
  let event;

  try {
    const payload = await req.text(); // Используйте req.text() для получения тела запроса в виде строки
    event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    if (err instanceof Error) {
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
    return new NextResponse('Webhook Error: Unknown error', { status: 400 });
  }

  // Обработка события завершения сессии оплаты
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Генерируем уникальный URL
    const uniqueURL = `https://landi-academy.pl/kurs/kurs-tajemnice-nanoplastii/session/${session.id}`;
    console.log('Уникальный URL для доступа к курсу:', uniqueURL);

    // Создаем документ для доступа к курсу в Sanity
    const courseAccessDoc = {
      _type: 'courseAccess',
      courseId: 'prod_PsLvsSwZq534gt', // Укажите ID вашего курса
      slug: {
        _type: 'slug',
        current: `kurs-${session.id}`, // Генерация уникального slug на основе session.id
      },
      createdAt: new Date().toISOString(),
      stripePurchaseId: session.id,
    };

    // Сохраняем документ в Sanity
    try {
      await sanityClient.create(courseAccessDoc);
      console.log('Course access saved:', courseAccessDoc);
    } catch (error) {
      console.error('Error saving course access:', error);
      return new NextResponse('Error saving course access', { status: 500 });
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
