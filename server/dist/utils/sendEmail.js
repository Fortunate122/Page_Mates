import dotenv from 'dotenv';
dotenv.config(); // ✅ Load .env here!
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendEmail(to, subject, html) {
    try {
        const data = await resend.emails.send({
            from: 'luna.houshmand@gmail.com', // ✅ your verified sender email
            to,
            subject,
            html,
        });
        console.log('Email sent successfully:', data);
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
