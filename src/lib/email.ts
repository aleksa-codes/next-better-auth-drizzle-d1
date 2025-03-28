import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  text,
  html,
  react,
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  react?: React.ReactElement;
}) {
  try {
    const data = await resend.emails.send({
      from: 'NextOnCloudflare <nextoncloudflare@updates.aleksa.codes>',
      to,
      subject,
      text,
      html,
      react,
    });
    return { success: true, data };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
