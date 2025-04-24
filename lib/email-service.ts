import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Fikir Yilkal <onboarding@fikiryilkal.me>", // Replace with a verified email address
      to: [to], // Accepts the `to` prop
      subject, // Accepts the `subject` prop
      html, // Accepts the `html` prop
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error };
    }

    console.log("Email sent successfully:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { success: false, error };
  }
}
