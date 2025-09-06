import { OAuth2Client } from 'google-auth-library';

import env from './env';

export default new OAuth2Client(env.GOOGLE_CLIENT_ID);
