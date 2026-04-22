import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, propertyName, roomCount, pms, locks } = req.body || {};

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email required' });
    }

    // 1. Send the follow-up email to the prospect
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Vaulted <onboarding@resend.dev>',
      to: email,
      subject: 'Vaulted Pilot Cohort - Application Received',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #111;">Thanks for applying to the Vaulted Pilot.</h2>
          <p style="color: #444; line-height: 1.6;">
            We've received your application for <strong>${propertyName || 'your property'}</strong>. 
            We're running a tight pilot cohort this summer, and we'll be reviewing submissions over the next 48 hours.
          </p>
          <p style="color: #444; line-height: 1.6;">
            If you're selected, our onboarding team will reach out directly to schedule 
            your integration kick-off.
          </p>
          <p style="color: #888; font-size: 14px; margin-top: 40px; border-top: 1px solid #eee; padding-top: 20px;">
            The Vaulted Team
          </p>
        </div>
      `,
    });

    // 2. Send an admin notification email with lead details
    await resend.emails.send({
      from: process.env.EMAIL_FROM || 'Vaulted <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL || 'aarizvi06@gmail.com', // Fallback or env var
      subject: `New Pilot Lead: ${propertyName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>New Pilot Application</h2>
          <ul>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Property Name:</strong> ${propertyName || 'N/A'}</li>
            <li><strong>Room Count:</strong> ${roomCount || 'N/A'}</li>
            <li><strong>PMS:</strong> ${pms || 'N/A'}</li>
            <li><strong>Locks:</strong> ${locks || 'N/A'}</li>
          </ul>
        </div>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
