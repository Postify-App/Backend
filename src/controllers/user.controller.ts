import { RequestHandler } from 'express';

import sendResponse from '../utils/sendResponse';
import { APIResponse } from '../types/api.types';
import statusCodes from '../utils/statusCodes';

export const getCurrentUserProfile: RequestHandler = (req, res, next) => {
  const result: APIResponse = {
    status: 'success',
    statusCode: statusCodes.OK,
    data: req.user!,
  };

  sendResponse(res, result);
};
