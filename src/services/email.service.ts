import { newTransport } from '../config/nodemailer';

export const sendEmail = async (
  user: { email: string; name: string },
  subject: string,
  OTP: string
) => {
  // template
  const to = user.email;
  const from = 'Zeyad Waleed <zeyadwaleed@test.com>';

  const mailOptions = {
    to,
    from,
    subject,
    text: `this is your OTP ${OTP}`,
  };

  console.log('before sending email');
  await newTransport().sendMail(mailOptions);
  console.log('after sending email');
};
