import { ConfirmationEmailTemplate } from "../components/emails/ConfirmationEmailTemplate";
import { EmailTemplate } from "../components/emails/EmailTemplate";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

interface SendEmailProps {
  name: string;
  email: string;
  message: string;
}

interface SendConfirmationEmailProps {
  name: string;
  email: string;
}

export const sendEmail = async ({ name, email, message }: SendEmailProps) => {
  const template = (
    <EmailTemplate name={name} email={email} message={message} />
  );

  const emailHtml = await render(template);

  await transporter.sendMail({
    from: `"Contact form" <${process.env.SMTP_USER}>`,
    to: process.env.EMAIL_TO,
    subject: "New message",
    html: emailHtml,
  });
};

export const sendConfirmationEmail = async ({
  name,
  email,
}: SendConfirmationEmailProps) => {
  const template = <ConfirmationEmailTemplate name={name} />;

  const emailHtml = await render(template);

  await transporter.sendMail({
    from: `${process.env.SMTP_USER}`,
    to: email,
    subject: "Confirmation email",
    html: emailHtml,
  });
};
