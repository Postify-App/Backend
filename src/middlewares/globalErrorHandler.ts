import { NextFunction, Request, Response } from 'express';
import APIError from '../utils/APIError';
import env from '../config/env';
import statusCodes from '../utils/statusCodes';

const sendErrorDev = (err: APIError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err: APIError, res: Response) => {
  if (err.isOperational)
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

  return res.status(statusCodes.InternalServerError).json({
    status: 'error',
    message: 'Something went wrong, Please try again later.',
  });
};

export default (
  err: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || statusCodes.InternalServerError;
  err.status = err.status || 'fail';

  if (env.NODE_ENV === 'development') sendErrorDev(err, res);
  if (env.NODE_ENV === 'production') sendErrorProd(err, res);
};
