import { RequestHandler } from 'express';
import businessService from '../services/business.service';
import sendResponse from '../utils/sendResponse';
import { User } from '@prisma/client';

export const createBusiness: RequestHandler = async (req, res, next) => {
  console.log(req.body);
  const result = await businessService.createBusiness(
    req.body,
    (req.user as User).id
  );

  sendResponse(res, result);
};
