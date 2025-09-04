import { ToneOfVoice } from '@prisma/client';

import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import toneOfVoiceRepository from '../repositories/toneOfVoice.repository';
import APIError from '../utils/APIError';

class ToneOfVoiceService {
  createToneOfVoice = async (data: ToneOfVoice) => {
    const toneOfVoice = await toneOfVoiceRepository.create(data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: toneOfVoice,
    };

    return result;
  };

  getAllToneOfVoices = async () => {
    const allToneOfVoices = await toneOfVoiceRepository.findAll();

    const result: APIResponse = {
      status: 'success',
      size: allToneOfVoices.length,
      statusCode: statusCodes.OK,
      data: allToneOfVoices,
    };

    return result;
  };

  getToneOfVoiceById = async (id: string) => {
    const toneOfVoice = await toneOfVoiceRepository.findById(id);

    if (!toneOfVoice)
      throw new APIError(
        'There is no tone of voice with this id',
        statusCodes.NotFound
      );

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: toneOfVoice,
    };

    return result;
  };

  updateToneOfVoice = async (id: string, data: ToneOfVoice) => {
    const toneOfVoice = await toneOfVoiceRepository.update(id, data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: toneOfVoice,
    };

    return result;
  };

  deleteToneOfVoice = async (id: string) => {
    await toneOfVoiceRepository.delete(id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'Tone of Voice deleted successfully',
    };

    return result;
  };

  deleteAllToneOfVoices = async () => {
    await toneOfVoiceRepository.deleteAll();

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'All Tone of Voices deleted successfully',
    };

    return result;
  };
}

export default new ToneOfVoiceService();
