import { RequestHandler } from 'express';
import sendResponse from '../utils/sendResponse';
import { APIResponse } from '../types/api.types';
import statusCodes from '../utils/statusCodes';
import logger from '../config/logger';

export const createPost: RequestHandler = async (req, res, next) => {
  const result: APIResponse = {
    status: 'success',
    statusCode: statusCodes.OK,
    data: req.body,
  };

  logger.info('Create Post request have been requested!', req.body);
  sendResponse(res, result);
};
