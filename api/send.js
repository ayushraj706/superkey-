import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
    const { email, otp } = req.body;
    try {
        const data = await resend.emails.send({
            // यहाँ 'otp@ayus.fun' या 'care@ayus.fun' डालें
            from: 'BaseKey <otp@ayus.fun>', 
            to: email,
            subject: 'Your 6-Digit OTP',
            html: `<strong>आपका कोड है: ${otp}</strong>`
        });
        res.status(200).json(data);
    } catch (e) { res.status(500).json({ error: e.message }); }
}
