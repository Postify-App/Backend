import { User } from '@prisma/client';
import { RequestHandler } from 'express';

import { Id } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import businessService from '../services/business.service';

export const createBusiness: RequestHandler = async (req, res, next) => {
  req.body.logo = req.file?.path;
  const result = await businessService.createBusiness(
    req.body,
    (req.user as User).id
  );

  sendResponse(res, result);
};

export const getCurrentUserBusinesses: RequestHandler = async (
  req,
  res,
  next
) => {
  const result = await businessService.getUserBusinesses(req.user! as User);
  sendResponse(res, result);
};

export const getBusinessById: RequestHandler<Id> = async (req, res, next) => {
  const result = await businessService.getBusinessById(req.params.id);
  sendResponse(res, result);
};

export const updateBusiness: RequestHandler<Id> = async (req, res, next) => {
  req.body.logo = req.file?.path;
  const result = await businessService.updateBusiness(
    (req.user! as User).id,
    req.params.id,
    req.body
  );
  sendResponse(res, result);
};

export const deleteBusiness: RequestHandler<Id> = async (req, res, next) => {
  const result = await businessService.deleteBusiness(
    (req.user! as User).id,
    req.params.id
  );
  sendResponse(res, result);
};
