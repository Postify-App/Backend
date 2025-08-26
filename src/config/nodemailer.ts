import nodemailer from 'nodemailer';
import env from './env';

export const newTransport = () => {
  return nodemailer.createTransport({
    host: env.MT_HOST,
    port: env.MT_PORT,
    auth: {
      user: env.MT_USER,
      pass: env.MT_PASS,
    },
  });
};
