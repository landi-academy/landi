import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { sanityClient } from '@/libs/sanity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Эта функция может быть помечена как `async`, если вы используете `await` внутри
export async function middleware(req: NextRequest) {
  // Проверяем, является ли путь запроса вебхуком Stripe
  if (req.nextUrl.pathname.startsWith('/api/webhook')) {
    const sig = req.headers.get('stripe-signature');
    let event;

    try {
      // Получаем тело запроса в виде строки
      const payload = await req.text();
      // Здесь должна быть ваша логика для конструирования события вебхука
      event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

      // Проверяем тип события и обрабатываем его
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

      // Возвращаем подтверждение о получении вебхука
      return new NextResponse(JSON.stringify({ received: true }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err: any) {
      // Возвращаем ошибку, если что-то пошло не так
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
  }

  // Для всех остальных путей запроса пропускаем через middleware без изменений
  return NextResponse.next();
}

// Настройка middleware для обработки определенных путей
export const config = {
  matcher: '/api/webhook',
};
