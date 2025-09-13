import { Post } from '@prisma/client';
import prisma from '../config/prisma';
import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';
import {
  GetBusinessPostQuery,
  GetBusinessPostsCondition,
} from '../types/post.types';

class PostRepository {
  private post = prisma.post;

  private assignCondition = (
    businessId: string,
    query: GetBusinessPostQuery['status']
  ) => {
    const currentDate = new Date(Date.now());

    const condition: GetBusinessPostsCondition = {
      businessId,
    };

    if (query)
      query === 'posted'
        ? (condition.scheduledAt = {
            lte: currentDate,
          })
        : (condition.scheduledAt = {
            gt: currentDate,
          });

    return condition;
  };

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

  async getBusinessPosts(
    businessId: string,
    query: GetBusinessPostQuery['status']
  ) {
    const condition: GetBusinessPostsCondition = this.assignCondition(
      businessId,
      query
    );

    const posts = await this.post.findMany({
      where: condition,
      orderBy: {
        scheduledAt: query === 'posted' ? 'desc' : 'asc',
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

  async deletePost(id: string) {
    const post = await this.post.delete({
      where: {
        id,
      },
    });

    if (!post)
      throw new APIError('No post found with this id', statusCodes.NotFound);
  }
}

export default new PostRepository();
