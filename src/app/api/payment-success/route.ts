// Файл: pages/api/payment-success/[sessionId].ts

import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { sessionId } = req.query;

  if (!sessionId || typeof sessionId !== 'string') {
    return res.status(400).json({ error: 'Bad Request' });
  }

  try {
    // Проверяем сессию оплаты в Stripe, чтобы подтвердить успешность оплаты
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
      // Здесь может быть логика для создания или получения уникального URL для курса на основе stripePurchaseId
      // Например, вы можете сохранить stripePurchaseId в базе данных и ассоциировать его с курсом и пользователем
      // В этом примере мы просто перенаправляем на статический URL курса для демонстрации
      const courseAccessUrl = `https://landi-academy.pl/kurs/${sessionId}`;
      res.status(200).json({ success: true, courseAccessUrl });
    } else {
      // Обработка случая, когда платёж не был успешен
      res.status(403).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Error retrieving Stripe session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
