import { AxiosRequestConfig } from 'axios';

export const createRedditPost = async (
  accessToken: string,
  subRedditName: string,
  title: string,
  text: string
) => {
  const searchParams = new URLSearchParams({
    sr: subRedditName,
    title,
    type: 'self',
    text,
  });

  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `bearer ${accessToken}`,
      'User-Agent': 'postify/1.0.0 by YOUR_REDDIT_USERNAME',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
};
