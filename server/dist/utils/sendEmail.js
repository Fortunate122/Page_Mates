import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
/**
 * Send an email using Resend.
 * @param to Receiver email address
 * @param subject Email subject
 * @param html HTML content of the email
 */
export async function sendEmail(to, subject, html) {
    try {
        const data = await resend.emails.send({
            from: 'luna.houshmand@gmail.com', // ✅ Replace with your verified sender email
            to,
            subject,
            html,
        });
        console.log('Email sent:', data);
        return data;
    }
    catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}
