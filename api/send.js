import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { email, otp } = req.body;
    try {
        const data = await resend.emails.send({
            from: 'BaseKey <onboarding@resend.dev>', // Resend Dashboard mein Domain verify karne ke baad ise badal sakte hain
            to: email,
            subject: 'Login OTP for BaseKey',
            html: `<p>Your access code is: <strong>${otp}</strong></p>`
        });
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
