import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import env from './env';
import APIError from '../utils/APIError';
import prisma from './prisma';
import statusCodes from '../utils/statusCodes';

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        if (!profile._json.email_verified)
          throw new APIError(
            'Your google account is not verified',
            statusCodes.Unauthorized
          );

        let user = await prisma.user.findUnique({
          where: {
            email: profile._json.email!,
          },
        });

        if (!user)
          user = await prisma.user.create({
            data: {
              name: profile._json.name || 'user',
              email: profile._json.email!,
            },
          });

        cb(null, user);
      } catch (err) {
        if (err instanceof APIError)
          throw new APIError(err.message, err.statusCode);

        throw new APIError(
          'Something went wrong while doing google auth shit',
          statusCodes.InternalServerError
        );
      }
    }
  )
);

export default passport;
