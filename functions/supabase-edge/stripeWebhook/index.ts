// Supabase Edge Function for Stripe Webhook
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@17.2.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2024-12-18.acacia',
  httpClient: Stripe.createFetchHttpClient(),
});

const supabase = createClient(
  Deno.env.get('SUPABASE_URL') || '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
);

serve(async (req) => {
  const signature = req.headers.get('stripe-signature');
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET') || '';

  if (!signature) {
    return new Response(
      JSON.stringify({ error: 'No signature' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await req.text();
    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      // Update order status
      const { error: updateError } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_session_id', session.id);

      if (updateError) {
        console.error('Error updating order:', updateError);
        return new Response(
          JSON.stringify({ error: 'Failed to update order' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Decrement ticket quantity
      if (session.metadata?.tierId && session.metadata?.quantity) {
        const { error: decrementError } = await supabase.rpc(
          'decrement_ticket_quantity',
          {
            p_tier_id: session.metadata.tierId,
            p_quantity: parseInt(session.metadata.quantity),
          }
        );

        if (decrementError) {
          console.error('Error decrementing tickets:', decrementError);
        }
      }

      console.log('Payment processed:', session.id);
    }

    return new Response(
      JSON.stringify({ received: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error: any) {
    console.error('Webhook error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
