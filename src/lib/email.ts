import ConfirmationEmail from "@/emails/confirmationEmail";
import React from "react";
import { Resend } from "resend";

export const sendConfirmationEmail = async (email: string, link: string) => {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const from = `Email Confirmation <noreply@${process.env.RESEND_DOMAIN}>`;
  const res = await resend.emails.send({
    from,
    to: email,
    subject: "Confirm your email",
    react: React.createElement(ConfirmationEmail, { link }),
  });
  return res;
};
