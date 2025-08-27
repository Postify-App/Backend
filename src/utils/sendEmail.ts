import pug from 'pug';
import { convert } from 'html-to-text';

import env from '../config/env';
import logger from '../config/logger';
import { transporter } from '../config/nodemailer';

const sendEmail = async (
  name: string,
  email: string,
  url: string,
  template: string,
  subject: string,
  OTP?: string
) => {
  try {
    const html = pug.renderFile(`${__dirname}/../templates/${template}.pug`, {
      firstName: name.split(' ')[0],
      url,
      subject,
      OTP,
    });

    const info = await transporter.sendMail({
      from: env.EMAIL_FROM,
      to: email,
      subject,
      html,
      text: convert(html, {
        wordwrap: false,
      }),
    });

    logger.info(`Email sent successfully.\nid: ${info.messageId}\n${email}`);
  } catch (err) {
    logger.error(`Failed to send email to ${email}: ${err}`);
  }
};

export const sendVerificationEmail = async (
  name: string,
  email: string,
  OTP: string
) => {
  await sendEmail(
    name,
    email,
    `${env.BASE_URL}/auth/login`,
    'emailVerify',
    'Your One-Time Passcode',
    OTP
  );
};
