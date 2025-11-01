// Stripe Webhook Handler for Supabase Edge Function or Vercel Serverless
// Must verify webhook signature for security

import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        
        // Update order status in Supabase
        const { error: updateError } = await supabase
          .from('orders')
          .update({ status: 'paid' })
          .eq('stripe_session_id', session.id);

        if (updateError) {
          console.error('Error updating order:', updateError);
          return res.status(500).json({ error: 'Failed to update order' });
        }

        // Decrement ticket quantity
        if (session.metadata?.tierId && session.metadata?.quantity) {
          const quantity = parseInt(session.metadata.quantity);
          const { error: decrementError } = await supabase.rpc('decrement_ticket_quantity', {
            p_tier_id: session.metadata.tierId,
            p_quantity: quantity,
          });

          if (decrementError) {
            console.error('Error decrementing ticket quantity:', decrementError);
          }
        }

        // Send confirmation email (mock function)
        await sendTicketConfirmationEmail({
          email: session.customer_email || '',
          eventId: session.metadata?.eventId || '',
          sessionId: session.id,
        });

        console.log('Payment successful for session:', session.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error: any) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}

async function sendTicketConfirmationEmail({ email, eventId, sessionId }: any) {
  // TODO: Integrate with SendGrid, Resend, or another email service
  console.log('Sending confirmation email to:', email);
  console.log('Event:', eventId);
  console.log('Session:', sessionId);
  
  // Mock implementation - replace with actual email service
  return Promise.resolve();
}

// For production, you'll need to create a database function in Supabase:
// 
// CREATE OR REPLACE FUNCTION decrement_ticket_quantity(
//   p_tier_id uuid,
//   p_quantity int
// )
// RETURNS void AS $$
// BEGIN
//   UPDATE ticket_tiers
//   SET qty_sold = qty_sold + p_quantity
//   WHERE id = p_tier_id;
// END;
// $$ LANGUAGE plpgsql;
