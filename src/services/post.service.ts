import { Post } from '@prisma/client';
import { APIResponse } from '../types/api.types';
import statusCodes from '../utils/statusCodes';
import postRepository from '../repositories/post.repository';
import businessService from './business.service';

class PostService {
  async createPost(data: Post, userId: string) {
    await businessService.checkIfBusinessUser(userId, data.businessId);

    data.userId = userId;

    const post = await postRepository.createPost(data);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: post,
    };
    return res;
  }
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

  async getBusinessPosts(businessId: string) {
    const posts = await postRepository.getBusinessPosts(businessId);

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
    await businessService.checkIfBusinessUser(userId, data.businessId);

    const post = await postRepository.updatePost(data, id);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: post,
    };

    return res;
  }
}

export default new PostService();
