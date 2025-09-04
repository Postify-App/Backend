import { RequestHandler } from 'express';
import mainTopicService from '../services/mainTopic.service';
import sendResponse from '../utils/sendResponse';
import { Id } from '../types/api.types';

export const createMainTopic: RequestHandler = async (req, res, next) => {
  req.body.logo = req.file?.path;
  const result = await mainTopicService.createMainTopic(req.body);

  sendResponse(res, result);
};

export const getAllTopics: RequestHandler = async (req, res, next) => {
  const result = await mainTopicService.getAllTopics();

  sendResponse(res, result);
};

export const getTopic: RequestHandler<Id> = async (req, res, next) => {
  const result = await mainTopicService.getTopic(req.params.id);

  sendResponse(res, result);
};

export const editMainTopic: RequestHandler<Id> = async (req, res, next) => {
  req.body.logo = req.file?.path;
  const result = await mainTopicService.editMainTopic(req.params.id, req.body);

  sendResponse(res, result);
};

export const deleteMainTopic: RequestHandler<Id> = async (req, res, next) => {
  const result = await mainTopicService.deleteMainTopic(req.params.id);

  sendResponse(res, result);
};

export const deleteAllTopics: RequestHandler = async (req, res, next) => {
  const result = await mainTopicService.deleteAllTopics();

  sendResponse(res, result);
};
