import { User } from '@prisma/client';
import { RequestHandler } from 'express';

import { Id } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import postService from '../services/post.service';
import {
  GetBusinessPostParams,
  GetBusinessPostQuery,
} from '../types/post.types';

export const createPost: RequestHandler = async (req, res, next) => {
  const result = await postService.createPost(req.body, (req.user as User).id);
  sendResponse(res, result);
};

export const publishPost: RequestHandler<Id> = async (req, res, next) => {
  if (req.file) req.body.file = req.file.path;

  const result = await postService.publishPost(
    req.body,
    (req.user as User).id,
    req.params.id
  );
  sendResponse(res, result);
};

export const getCurrentUserPosts: RequestHandler = async (req, res, next) => {
  const result = await postService.getCurrentUserPosts((req.user as User).id);

  sendResponse(res, result);
};

export const getBusinessPosts: RequestHandler<
  GetBusinessPostParams,
  {},
  {},
  GetBusinessPostQuery
> = async (req, res, next) => {
  const result = await postService.getBusinessPosts(
    req.params.id,
    req.query.status
  );
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
