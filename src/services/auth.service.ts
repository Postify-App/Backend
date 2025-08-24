import prisma from '../config/prisma';

class AuthService {
  createUser = async (body: any) => {
    const result = await prisma.user.create({
      data: body,
    });

    const OTP = this.generateOTP(6);

    return {
      statusCode: 200,
      status: 'success',
      result,
      OTP,
    };
  };

  private generateOTP = (length: number) => {
    let OTP = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };
}

export default new AuthService();
