import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export async function POST(req: NextRequest, res: NextResponse) {
  // Получаем значение заголовка 'origin'
  const origin = req.headers.get('origin');

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'p24'],
      line_items: [{
        price_data: {
          currency: 'pln',
          product_data: {
            name: 'Szkolenie z Nanoplastii',
          },
          unit_amount: 1000, // 10.00 PLN
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${origin}/kurs?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
    });

    return NextResponse.json(session, {
      status: 200,
      statusText: 'Payment session created',
    });
  } catch (error: any) {
    console.log('Payment falied', error);
    return new NextResponse(error, { status: 500 });
  }
}