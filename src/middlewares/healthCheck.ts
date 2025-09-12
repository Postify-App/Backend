import { NextFunction, Request, Response } from 'express';

import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import sendResponse from '../utils/sendResponse';

export default (req: Request, res: Response, next: NextFunction) => {
  const result: APIResponse = {
    status: 'OK',
    statusCode: statusCodes.OK,
    message: `API is healthy and stable (I think?)`,
    timestamp: new Date().toISOString(),
  };

  sendResponse(res, result);
};
