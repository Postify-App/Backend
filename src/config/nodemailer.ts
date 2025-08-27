import nodemailer from 'nodemailer';
import env from './env';

const createTransporter = () => {
  // Sending Emails in Production needs to be configured
  return nodemailer.createTransport({
    host: env.MT_HOST,
    port: env.MT_PORT,
    auth: {
      user: env.MT_USER,
      pass: env.MT_PASS,
    },
  });
};

export const transporter = createTransporter();
