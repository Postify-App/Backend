import { RequestHandler } from 'express';

import { Id } from '../types/api.types';
import sendResponse from '../utils/sendResponse';
import toneOfVoiceService from '../services/toneOfVoice.service';

export const createToneOfVoice: RequestHandler = async (req, res, next) => {
  req.body.logo = req.file?.filename;
  const result = await toneOfVoiceService.createToneOfVoice(req.body);
  sendResponse(res, result);
};

export const getAllToneOfVoices: RequestHandler = async (req, res, next) => {
  const result = await toneOfVoiceService.getAllToneOfVoices();
  sendResponse(res, result);
};

export const getToneOfVoiceById: RequestHandler<Id> = async (
  req,
  res,
  next
) => {
  const result = await toneOfVoiceService.getToneOfVoiceById(req.params.id);
  sendResponse(res, result);
};

export const updateToneOfVoice: RequestHandler<Id> = async (req, res, next) => {
  req.body.logo = req.file?.filename;
  const result = await toneOfVoiceService.updateToneOfVoice(
    req.params.id,
    req.body
  );
  sendResponse(res, result);
};

export const deleteToneOfVoice: RequestHandler<Id> = async (req, res, next) => {
  const result = await toneOfVoiceService.deleteToneOfVoice(req.params.id);
  sendResponse(res, result);
};

export const deleteAllToneOfVoices: RequestHandler = async (req, res, next) => {
  const result = await toneOfVoiceService.deleteAllToneOfVoices();
  sendResponse(res, result);
};
