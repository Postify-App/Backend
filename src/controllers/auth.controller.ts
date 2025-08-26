import { RequestHandler } from 'express';
import authService from '../services/auth.service';
import sendResponse from '../utils/sendResponse';

export const login: RequestHandler = async (req, res, next) => {
  console.log('before sending result');
  const result = await authService.login(req.body);
  console.log('after sending result');
  sendResponse(res, result);
};
