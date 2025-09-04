import { RequestHandler } from 'express';

import { Id } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import mainGoalService from '../services/mainGoal.service';

export const createMainGoal: RequestHandler = async (req, res, next) => {
  const result = await mainGoalService.createMainGoal(req.body);
  sendResponse(res, result);
};

export const getAllMainGoals: RequestHandler = async (req, res, next) => {
  const result = await mainGoalService.getAllMainGoals();
  sendResponse(res, result);
};

export const getMainGoalById: RequestHandler<Id> = async (req, res, next) => {
  const result = await mainGoalService.getMainGoalById(req.params.id);
  sendResponse(res, result);
};

export const updateMainGoal: RequestHandler<Id> = async (req, res, next) => {
  const result = await mainGoalService.updateMainGoal(req.params.id, req.body);
  sendResponse(res, result);
};

export const deleteMainGoal: RequestHandler<Id> = async (req, res, next) => {
  const result = await mainGoalService.deleteMainGoal(req.params.id);
  sendResponse(res, result);
};

export const deleteAllmainGoals: RequestHandler = async (req, res, next) => {
  const result = await mainGoalService.deleteAllMainGoals();
  sendResponse(res, result);
};
