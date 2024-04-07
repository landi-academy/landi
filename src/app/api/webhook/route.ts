import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '@/libs/sanity';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const payload = await req.body;
    event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
    return res.status(400).send('Webhook Error: Unknown error');
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
    sanityClient.create(courseAccessDoc)
      .then(response => {
        console.log('Course access saved:', response);
      })
      .catch(error => console.error('Error saving course access:', error));
  }

  res.json({received: true});
}
