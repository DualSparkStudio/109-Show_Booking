// Supabase Edge Function
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@17.2.0?target=deno';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-12-18.acacia',
  httpClient: Stripe.createFetchHttpClient(),
});

serve(async (req) => {
  try {
    const { eventId, tierId, quantity } = await req.json();

    if (!eventId || !tierId || !quantity) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const unitAmount = 4999; // TODO: Fetch from Supabase

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
      success_url: `${Deno.env.get('VITE_APP_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${Deno.env.get('VITE_APP_URL')}/show/${eventId}`,
      metadata: {
        eventId,
        tierId,
        quantity: quantity.toString(),
      },
    });

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
