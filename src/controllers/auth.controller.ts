import { RequestHandler } from 'express';

import sendResponse from '../utils/sendResponse';
import authService from '../services/auth.service';
import { User } from '@prisma/client';

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
