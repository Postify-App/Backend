import { JwtPayload, sign, verify } from 'jsonwebtoken';

import env from '../config/env';
import { RefreshTokenPayload } from '../types/auth.types';

const generateToken = (payload: object, secret: string, expiresIn: string) =>
  sign(payload, secret, {
    expiresIn,
  } as object);

export const generateAccessToken = (data: object) =>
  generateToken(data, env.ACCESS_TOKEN_SECRET, env.ACCESS_TOKEN_EXPIRES_IN);

export const generateRefreshToken = (data: object) =>
  generateToken(data, env.REFRESH_TOKEN_SECRET, env.REFRESH_TOKEN_EXPIRES_IN);

const verifyToken = <T>(token: string, secret: string): T & JwtPayload =>
  verify(token, secret) as T & JwtPayload;

export const verifyAccessToken = (token: string) =>
  verifyToken(token, env.ACCESS_TOKEN_SECRET);

export const verifyRefreshToken = (token: string) =>
  verifyToken<RefreshTokenPayload>(token, env.REFRESH_TOKEN_SECRET);
