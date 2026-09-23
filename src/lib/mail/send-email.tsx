import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import ResetPasswordEmail from "@/../emails/reset-password";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

const htmlContent = async (destinyUser: string, resetUrl: string) =>
  await render(
    <ResetPasswordEmail destinyUser={destinyUser} resetUrl={resetUrl} />,
  );

export const sendEmail = async (
  destinyUser: {
    name: string;
    email: string;
  },
  resetUrl: string,
) => {
  const mailOptions = {
    from: `venshare ${process.env.EMAIL_USER}`,
    to: destinyUser.email,
    subject: "[venshare] Reset your venshare password",
    html: await htmlContent(destinyUser.name, resetUrl),
  } satisfies SMTPTransport.MailOptions;

  await transporter.sendMail(mailOptions);
};
