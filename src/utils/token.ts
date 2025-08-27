import { sign, verify } from 'jsonwebtoken';

import env from '../config/env';

const generateToken = (payload: object, secret: string, expiresIn: string) =>
  sign(payload, secret, {
    expiresIn,
  } as object);

export const generateAccessToken = (data: object) =>
  generateToken(data, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_EXPIRES_IN);

export const generateRefreshToken = (data: object) =>
  generateToken(data, env.REFRESH_TOKEN_SECRET, env.REFRESH_TOKEN_EXPIRES_IN);

const verifyToken = (token: string, secret: string) => verify(token, secret);

export const verifyAccessToken = (token: string) =>
  verifyToken(token, env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string) =>
  verifyToken(token, env.REFRESH_TOKEN_SECRET);
