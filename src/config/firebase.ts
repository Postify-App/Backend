import admin from 'firebase-admin';
import env from './env';

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: env.FB_PROJECT_ID,
    privateKey: env.FB_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: env.FB_CLIENT_EMAIL,
  }),
});

export default app;
