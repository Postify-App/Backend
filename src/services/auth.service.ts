// import prisma from '../config/prisma';
import { APIResponse } from '../types/api.types';
import statusCodes from '../utils/statusCodes';

class AuthService {
  private generateOTP = (length: number) => {
    let OTP = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  login = async (body: any) => {
    // const result = await prisma.user.create({
    // data: body,
    // });

    const OTP = this.generateOTP(6);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: {
        reqBody: body,
        OTP,
      },
    };

    return res;
  };
}

export default new AuthService();
