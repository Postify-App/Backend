import { RequestHandler } from 'express';
import authService from '../services/auth.service';

export const login: RequestHandler = async (req, res, next) => {
  const result = await authService.createUser(req.body);

  res.status(result.statusCode).json({
    result,
  });
};
