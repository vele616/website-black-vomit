import ConfirmationEmailTemplate from "@/components/emails/ConfirmationEmailTemplate";
import { EmailTemplate } from "../components/emails/EmailTemplate";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendEmailProps {
  name: string;
  email: string;
  message: string;
}

interface SendConfirmationEmailProps {
  name: string;
  email: string;
}


export const sendEmail = async ({name, email, message}: SendEmailProps) => {

  const { error } = await resend.emails.send({
    from: process.env.FORM_EMAIL_FROM,
    to: process.env.FORM_EMIAL_TO,
    subject: 'New form submission',
    react: <EmailTemplate name={name} email={email} message={message} />,
  });

  if (error) {
    throw error;
  }
}

export const sendConfirmationEmail = async ({
  name,
  email,
}: SendConfirmationEmailProps) => {
  const { error } = await resend.emails.send({
    from: process.env.FORM_EMAIL_FROM,
    to: email,
    subject: "Confirmation email",
    react: <ConfirmationEmailTemplate name={name} />,
  });

  if (error) {
    throw error;
  }
};
