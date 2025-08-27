import prisma from '../config/prisma';
import APIError from '../utils/APIError';
import redisService from './redis.service';
import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import { LoginBody, OTPBody } from '../types/auth.types';
import { generateAccessToken, generateRefreshToken } from '../utils/token';
import { sendVerificationEmail } from '../utils/sendEmail';

class AuthService {
  private OTPDuration = 5;
  private generateOTP = (length: number = 6) => {
    let OTP = '';
    const digits = '0123456789';
    for (let i = 0; i < length; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  private setOTP = async (email: string, OTP: string) => {
    await redisService.SETEX(email, OTP, this.OTPDuration);
  };

  // Login is for sending OTP
  sendOTP = async (body: LoginBody) => {
    try {
      // Generate OTP
      const OTP = this.generateOTP();

      // Set the OTP in Redis
      await this.setOTP(body.email, OTP);

      // Send the OTP email verification
      await sendVerificationEmail(body.name, body.email, OTP);

      const res: APIResponse = {
        status: 'success',
        statusCode: statusCodes.OK,
        message:
          'An OTP has been sent to your email address. Please check your inbox.',
      };

      return res;
    } catch (err) {
      throw new APIError(
        'Something went wrong',
        statusCodes.InternalServerError
      );
    }
  };

  // Need to do rate limiting on auth
  login = async (body: OTPBody) => {
    try {
      // Get OTP
      const OTP = await redisService.GET(body.email);

      // Check if OTP in redis is the same as received one
      if (OTP !== body.OTP)
        throw new APIError(
          'OTP not found or expired',
          statusCodes.Unauthorized
        );

      // Check if user existed or not
      let user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      const result: APIResponse = {
        status: 'success',
        statusCode: statusCodes.OK,
      };

      if (!user) {
        user = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
          },
        });

        result.statusCode = statusCodes.Created;
      }

      result.data = user;
      result.accessToken = generateAccessToken(user);
      result.refreshToken = generateRefreshToken({ id: user.id });

      return result;
    } catch (err) {
      throw new APIError(
        'Something went wrong',
        statusCodes.InternalServerError
      );
    }
  };
}

export default new AuthService();
