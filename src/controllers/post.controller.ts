import { RequestHandler } from 'express';
import sendResponse from '../utils/sendResponse';
import postService from '../services/post.service';
import { User } from '@prisma/client';

export const createPost: RequestHandler = async (req, res, next) => {
  const result = await postService.createPost(req.body, (req.user as User).id);
  sendResponse(res, result);
};

export const getCurrentUserPosts: RequestHandler = async (req, res, next) => {
  const result = await postService.getCurrentUserPosts((req.user as User).id);

  sendResponse(res, result);
};

export const getBusinessPosts: RequestHandler = async (req, res, next) => {
  const result = await postService.getBusinessPosts(req.params.id!);

  sendResponse(res, result);
};

export const getPost: RequestHandler = async (req, res, next) => {
  const result = await postService.getPost(req.params.id!);

  sendResponse(res, result);
};

export const updatePost: RequestHandler = async (req, res, next) => {
  const result = await postService.updatePost(
    req.body,
    req.params.id!,
    (req.user as User).id
  );

  sendResponse(res, result);
};
