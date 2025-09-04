// import QueryString from 'qs';
import { User } from '@prisma/client';
// import axios, { AxiosRequestConfig } from 'axios';

// import env from '../config/env';
import APIError from '../utils/APIError';
import redisService from './redis.service';
import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import { sendVerificationEmail } from '../utils/sendEmail';
import { LoginBody, OTPBody, RefreshTokenBody } from '../types/auth.types';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from '../utils/token';
import firebase from '../config/firebase';
import userRepository from '../repositories/user.repository';
// import { UpdatedUserData } from '../types/user.types';
// import logger from '../config/logger';

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
  };

  login = async (body: OTPBody): Promise<APIResponse> => {
    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
    };

    if ('idToken' in body) {
      const decodedIdToken = await firebase.auth().verifyIdToken(body.idToken);

      if (!decodedIdToken.email_verified)
        throw new APIError(
          'Your google account is not verified',
          statusCodes.Unauthorized
        );

      let user = await userRepository.getUserByEmail(decodedIdToken.email!);

      if (!user)
        user = await userRepository.createUser(
          decodedIdToken.email!,
          decodedIdToken.name
        );

      result.data = user;
      result.accessToken = generateAccessToken(user);
      result.refreshToken = generateRefreshToken({ id: user.id });

      return result;
    }

    // Get OTP
    const OTP = await redisService.GET(body.email);

    // Check if OTP in redis is the same as received one
    if (OTP !== body.OTP)
      throw new APIError('OTP not found or expired', statusCodes.Unauthorized);

    // OTP Ok? Delete it from Redis (for more secure reasons)
    await redisService.DEL(body.email);

    // Check if user existed or not
    let user = await userRepository.getUserByEmail(body.email);

    if (!user) {
      user = await userRepository.createUser(body.email, body.name);

      result.statusCode = statusCodes.Created;
    }

    result.data = user;
    result.accessToken = generateAccessToken(user);
    result.refreshToken = generateRefreshToken({ id: user.id });

    return result;
  };

  refreshToken = async (body: RefreshTokenBody) => {
    const payload = verifyRefreshToken(body.refreshToken);
    if (!payload || !payload.id)
      throw new APIError(
        'Your refresh token is invalid or has expired',
        statusCodes.Unauthorized
      );

    const { id } = payload;
    const user = await userRepository.getUserById(id);

    if (!user)
      throw new APIError(
        'Your refresh token is invalid or has expired',
        statusCodes.Unauthorized
      );

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: user,
      accessToken: generateAccessToken(user),
      refreshToken: body.refreshToken,
    };

    return result;
  };

  handleGoogleCallback = async (user: User) => {
    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: user,
      accessToken: generateAccessToken(user),
      refreshToken: generateRefreshToken({
        id: user.id,
      }),
    };

    return result;
  };

  // handleRedditCallback = async (code: string, user: User) => {
  //   const queryString = QueryString.stringify({
  //     grant_type: 'authorization_code',
  //     code,
  //     redirect_uri: env.REDDIT_REDIRECT_URL,
  //   });

  //   const config: AxiosRequestConfig = {
  //     auth: {
  //       username: env.REDDIT_CLIENT_ID,
  //       password: env.REDDIT_CLIENT_SECRET,
  //     },
  //     headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  //   };

  //   const response = await axios.post(
  //     'https://www.reddit.com/api/v1/access_token',
  //     queryString,
  //     config
  //   );

  //   const data: UpdatedUserData = {
  //     redditAccessToken: response.data.access_token,
  //     redditRefreshToken: response.data.refresh_token,
  //     redditExpiresIn: Date.now() + response.data.expires_in,
  //   };

  //   await userRepository.getUserByIdAndUpdate(user.id, data);

  //   logger.info(`${user.email} has just integrated reddit successfully`);

  //   const result: APIResponse = {
  //     status: 'success',
  //     statusCode: statusCodes.OK,
  //     message: 'Reddit integration completed successfully',
  //   };

  //   return result;
  // };
}

export default new AuthService();
