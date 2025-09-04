import { RequestHandler } from 'express';

import { Id } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import targetAudienceService from '../services/targetAudience.service';

export const createTargetAudience: RequestHandler = async (req, res, next) => {
  const result = await targetAudienceService.createTargetAudience(req.body);
  sendResponse(res, result);
};

export const getAllTargetAudiences: RequestHandler = async (req, res, next) => {
  const result = await targetAudienceService.getAllTargetAudiences();
  sendResponse(res, result);
};

export const getTargetAudienceById: RequestHandler<Id> = async (
  req,
  res,
  next
) => {
  const result = await targetAudienceService.getTargetAudienceById(
    req.params.id
  );
  sendResponse(res, result);
};

export const updateTargetAudience: RequestHandler<Id> = async (
  req,
  res,
  next
) => {
  const result = await targetAudienceService.updateTargetAudience(
    req.params.id,
    req.body
  );
  sendResponse(res, result);
};

export const deleteTargetAudience: RequestHandler<Id> = async (
  req,
  res,
  next
) => {
  const result = await targetAudienceService.deleteTargetAudience(
    req.params.id
  );
  sendResponse(res, result);
};

export const deleteAlltargetAudiences: RequestHandler = async (
  req,
  res,
  next
) => {
  const result = await targetAudienceService.deleteAllTargetAudiences();
  sendResponse(res, result);
};
