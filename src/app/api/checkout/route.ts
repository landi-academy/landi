import Stripe from 'stripe';
import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: 'price_1P2ZLAP9TlKJ7FiyvPJ83Dkq', // Замените на price ID вашего продукта в Stripe
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      // Проверяем, является ли err экземпляром Error
      if (err instanceof Error) {
        res.status(500).json({ statusCode: 500, message: err.message });
      } else {
        // Если тип ошибки неизвестен, отправляем общее сообщение об ошибке
        res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};
