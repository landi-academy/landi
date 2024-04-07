// api/checkout/session.ts

import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card', 'p24'],
        line_items: [{
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Онлайн-курс',
            },
            unit_amount: 20000,
          },
          quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.headers.origin}/processing-payment?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ statusCode: 500, message: err.message });
      } else {
        res.status(500).json({ statusCode: 500, message: "An unexpected error occurred" });
      }
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}