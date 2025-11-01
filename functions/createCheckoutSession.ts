// This is a Supabase Edge Function or Vercel Serverless Function
// Place this in your Supabase functions folder or Vercel's /api directory

import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { eventId, tierId, quantity } = req.body;

    if (!eventId || !tierId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // TODO: Fetch ticket tier details from Supabase to get price
    // For now, using example price
    const unitAmount = 4999; // Replace with actual price from DB

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Event Ticket',
              description: `Ticket for event ${eventId}`,
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.VITE_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VITE_APP_URL}/show/${eventId}`,
      metadata: {
        eventId,
        tierId,
        quantity: quantity.toString(),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: error.message });
  }
}

// For Supabase Edge Function usage:
// deno run --allow-net --allow-env https://deno.land/x/create_checkout_session.ts
