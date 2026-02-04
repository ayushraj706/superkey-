import { Resend } from 'resend';

// Vercel Settings mein RESEND_API_KEY hona chahiye
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  const { email, otp } = req.body;

  try {
    const data = await resend.emails.send({
      from: 'BaseKey <onboarding@resend.dev>',
      to: email,
      subject: 'Your 6-Digit OTP',
      html: `<strong>आपका OTP है: ${otp}</strong>`
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
