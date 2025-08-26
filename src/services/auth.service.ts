// import prisma from '../config/prisma';
import prisma from '../config/prisma';
import { APIResponse } from '../types/api.types';
import { LoginBody } from '../types/auth.types';
import statusCodes from '../utils/statusCodes';
import { sendEmail } from './email.service';

class AuthService {
  private generateOTP = (length: number = 6) => {
    let OTP = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  login = async (body: LoginBody) => {
    const isRegistered = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!isRegistered) {
      // const result = await prisma.user.create({
      // data: body,
      // });
    }

    const OTP = this.generateOTP();

    await sendEmail(body, 'Your OTP, Valid for 5 minutes', OTP);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      message:
        'An OTP has been sent to your email address. Please check your inbox.',
    };

    return res;
  };
}

export default new AuthService();
