import { RequestHandler } from 'express';
import authService from '../services/auth.service';
import sendResponse from '../utils/sendResponse';

export const sendOTP: RequestHandler = async (req, res, next) => {
  const result = await authService.sendOTP(req.body);
  sendResponse(res, result);
};

export const login: RequestHandler = async (req, res, next) => {
  const result = await authService.login(req.body);
  sendResponse(res, result);
};
