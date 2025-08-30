import { NextFunction, Request, Response } from 'express';

import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import env from '../config/env';

export default (req: Request, res: Response, next: NextFunction) => {
  const result: APIResponse = {
    status: 'OK',
    statusCode: statusCodes.OK,
    message: `API is healthy and stable (I think?), PORT: ${env.NODE_ENV}`,
    timestamp: new Date().toISOString(),
  };

  sendResponse(res, result);
};
