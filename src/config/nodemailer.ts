import nodemailer from 'nodemailer';
import env from './env';

const createTransporter = () => {
  // Sending Emails in Production needs to be configured
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
  });
};

export const transporter = createTransporter();
