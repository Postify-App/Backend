import { NextFunction, Request, Response } from 'express';
import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';

export default (req: Request, res: Response, next: NextFunction) => {
  next(
    new APIError(
      `Could not find ${req.originalUrl} on the server!`,
      statusCodes.NotFound
    )
  );
};
