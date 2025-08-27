import { NextFunction, Request, Response } from 'express';

import prisma from '../config/prisma';
import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';
import { verifyAccessToken } from '../utils/token';

export default async (req: Request, res: Response, next: NextFunction) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  )
    throw new APIError(
      'You are not logged in! please login to get access',
      statusCodes.Unauthorized
    );

  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken)
    throw new APIError(
      'Your access token is invalid or has expired',
      statusCodes.Unauthorized
    );

  const payload = verifyAccessToken(accessToken);
  if (!payload)
    throw new APIError(
      'Your access token is invalid or has expired.',
      statusCodes.Unauthorized
    );

  const user = await prisma.user.findUnique({
    where: {
      id: payload.id,
    },
  });

  if (!user)
    throw new APIError(
      'The user belonging to this token does no longer exist',
      statusCodes.Unauthorized
    );

  req.user = user;
  next();
};
