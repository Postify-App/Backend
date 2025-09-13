import { Post } from '@prisma/client';

import redisService from './redis.service';
import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import businessService from './business.service';
import postRepository from '../repositories/post.repository';
import {
  CreatePostBody,
  GetBusinessPostQuery,
  PublishPostBody,
  TPost,
} from '../types/post.types';
import APIError from '../utils/APIError';
import cloudinaryService from './cloudinary.service';

class PostService {
  private CACHE_TTL = 12;
  private CACHE_KEY = 'post';

  private enhanceData = (data: CreatePostBody, userId: string): TPost => {
    const ret: TPost = {
      userId,
      title: data.title,
      hasEmojis: data.has_emojis,
      businessId: data.business_id,
      requiredWords: data.required_words,
      forbiddenWords: data.forbidden_words,
      approximateWords: data.approximate_words,
      description: data.description.split('\n')[0]!,
      hashtags: data.description.match(/#[\w]+/g) || [],
    };

    return ret;
  };

  createPost = async (data: CreatePostBody, userId: string) => {
    await businessService.checkIfBusinessUser(userId, data.business_id);

    const enhancedData = this.enhanceData(data, userId);

    // Save post to redis with ttl = 12 hours
    redisService.setJSON(
      `${this.CACHE_KEY}:${enhancedData.businessId}`,
      enhancedData,
      this.CACHE_TTL
    );

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      message: 'Post created successfully',
    };

    return res;
  };

  publishPost = async (
    data: PublishPostBody,
    userId: string,
    businessId: string
  ) => {
    // Check if the business belong to user
    await businessService.checkIfBusinessUser(userId, businessId);

    // Get needed data from redis
    const cachedData = await redisService.getJSON<TPost>(
      `${this.CACHE_KEY}:${businessId}`
    );

    if (!cachedData)
      throw new APIError(
        'Post creation session has timed out. Please create a new post.',
        statusCodes.BadRequest
      );

    // Delete from Redis
    await redisService.DEL(`${this.CACHE_KEY}:${businessId}`);

    // Upload the file to cloud
    console.log(data.file);
    if (data.file) {
      const { secure_url } = await cloudinaryService.uploadToCloud(data.file);
      data.file = secure_url;
    }

    const postData = { ...data, ...cachedData };

    const post = await postRepository.createPost(postData as Post);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: post,
    };

    return result;
  };

  async getCurrentUserPosts(userId: string) {
    const posts = await postRepository.getCurrentUserPosts(userId);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      size: posts.length,
      data: posts,
    };

    return res;
  }

  async getBusinessPosts(
    id: string,
    userId: string,
    status: GetBusinessPostQuery['status']
  ) {
    await businessService.checkIfBusinessUser(userId, id);

    const posts = await postRepository.getBusinessPosts(id, status);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      size: posts.length,
      data: posts,
    };

    return res;
  }

  async getPost(id: string) {
    const post = await postRepository.getPost(id);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: post,
    };

    return res;
  }

  async updatePost(data: Post, id: string, userId: string) {
    await businessService.checkIfBusinessUser(
      userId,
      (
        await postRepository.getPost(id)!
      ).businessId
    );

    const post = await postRepository.updatePost(data, id);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: post,
    };

    return res;
  }

  deletePost = async (id: string, userId: string) => {
    await businessService.checkIfBusinessUser(
      userId,
      (
        await postRepository.getPost(id)!
      ).businessId
    );

    await postRepository.deletePost(id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      message: 'Post deleted successfully',
    };
    return result;
  };
}

export default new PostService();
