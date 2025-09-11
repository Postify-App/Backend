import { Post } from '@prisma/client';
import prisma from '../config/prisma';
import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';

class PostRepository {
  post = prisma.post;
  async createPost(data: Post) {
    return await this.post.create({ data });
  }

  async getCurrentUserPosts(userId: string) {
    const posts = await this.post.findMany({
      where: {
        userId,
      },
    });

    if (!posts)
      throw new APIError(
        'No posts found with this user id',
        statusCodes.NotFound
      );
    return posts;
  }

  async getBusinessPosts(businessId: string) {
    const posts = await this.post.findMany({
      where: {
        businessId,
      },
    });

    if (!posts)
      throw new APIError(
        'No posts found with this business id',
        statusCodes.NotFound
      );
    return posts;
  }

  async getPost(id: string) {
    const post = await this.post.findUnique({
      where: {
        id,
      },
    });

    if (!post)
      throw new APIError('No post found with this id', statusCodes.NotFound);

    return post;
  }

  async updatePost(data: Post, id: string) {
    const post = await this.post.update({
      where: {
        id,
      },
      data,
    });

    if (!post)
      throw new APIError('No post found with this id', statusCodes.NotFound);

    return post;
  }
}

export default new PostRepository();
