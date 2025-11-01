// Email service wrapper for ticket confirmations
// Example using SendGrid, Resend, or other providers

export interface TicketEmailData {
  to: string;
  eventName: string;
  eventDate: string;
  eventLocation: string;
  quantity: number;
  ticketType: string;
  totalAmount: string;
  orderReference: string;
}

export async function sendTicketConfirmation(data: TicketEmailData) {
  // Example SendGrid implementation:
  //
  // const sgMail = require('@sendgrid/mail');
  // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //
  // const msg = {
  //   to: data.to,
  //   from: 'tickets@showbooker.com',
  //   subject: `Your tickets for ${data.eventName}`,
  //   html: generateTicketEmailHTML(data),
  // };
  //
  // await sgMail.send(msg);

  console.log('Ticket email would be sent to:', data.to);
  console.log('Event:', data.eventName);
  
  // Mock implementation
  return Promise.resolve();
}

function generateTicketEmailHTML(data: TicketEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0284c7; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .ticket-info { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎫 Your Tickets Are Confirmed!</h1>
          </div>
          <div class="content">
            <h2>${data.eventName}</h2>
            <div class="ticket-info">
              <p><strong>Date:</strong> ${data.eventDate}</p>
              <p><strong>Location:</strong> ${data.eventLocation}</p>
              <p><strong>Quantity:</strong> ${data.quantity} × ${data.ticketType}</p>
              <p><strong>Total:</strong> ${data.totalAmount}</p>
              <p><strong>Order Reference:</strong> ${data.orderReference}</p>
            </div>
            <p>We look forward to seeing you there!</p>
          </div>
          <div class="footer">
            <p>ShowBooker - Your tickets are ready</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export default sendTicketConfirmation;
