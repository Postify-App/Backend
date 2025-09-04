import { User } from '@prisma/client';
import { RequestHandler } from 'express';

// import env from '../config/env';
import sendResponse from '../utils/sendResponse';
import authService from '../services/auth.service';

export const sendOTP: RequestHandler = async (req, res, next) => {
  const result = await authService.sendOTP(req.body);
  sendResponse(res, result);
};

export const login: RequestHandler = async (req, res, next) => {
  const result = await authService.login(req.body);
  sendResponse(res, result);
};

export const refreshToken: RequestHandler = async (req, res, next) => {
  const result = await authService.refreshToken(req.body);
  sendResponse(res, result);
};

export const googleCallbackHandler: RequestHandler = async (req, res, next) => {
  const result = await authService.handleGoogleCallback(req.user! as User);
  sendResponse(res, result);
};

// export const redditLogin: RequestHandler = async (req, res, next) => {
//   const params = new URLSearchParams({
//     client_id: env.REDDIT_CLIENT_ID,
//     response_type: 'code',
//     state: 'random_string',
//     redirect_uri: env.REDDIT_REDIRECT_URL,
//     duration: 'permanent',
//     scope: 'identity submit read',
//   });

//   const authUrl =
//     `https://www.reddit.com/api/v1/authorize?` + params.toString();

//   res.redirect(authUrl);
// };

// export const redditCallbackHandler: RequestHandler<
//   {},
//   {},
//   {},
//   { code: string }
// > = async (req, res, next) => {
//   const result = await authService.handleRedditCallback(
//     req.query.code,
//     req.user! as User
//   );
//   sendResponse(res, result);
// };
