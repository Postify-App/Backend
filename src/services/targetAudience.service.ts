import { TargetAudience } from '@prisma/client';

import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import targetAudienceRepository from '../repositories/targetAudience.repository';

class TargetAudienceService {
  createTargetAudience = async (data: TargetAudience) => {
    const targetAudience = await targetAudienceRepository.create(data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: targetAudience,
    };

    return result;
  };

  getAllTargetAudiences = async () => {
    const allTargetAudiences = await targetAudienceRepository.findAll();

    const result: APIResponse = {
      status: 'success',
      size: allTargetAudiences.length,
      statusCode: statusCodes.OK,
      data: allTargetAudiences,
    };

    return result;
  };

  getTargetAudienceById = async (id: string) => {
    const targetAudience = await targetAudienceRepository.findById(id);

    if (!targetAudience)
      throw new APIError(
        'There is no target audience with this id',
        statusCodes.NotFound
      );

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: targetAudience,
    };

    return result;
  };

  updateTargetAudience = async (id: string, data: TargetAudience) => {
    const targetAudience = await targetAudienceRepository.update(id, data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: targetAudience,
    };

    return result;
  };

  deleteTargetAudience = async (id: string) => {
    await targetAudienceRepository.delete(id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'TargetAudience deleted successfully',
    };

    return result;
  };

  deleteAllTargetAudiences = async () => {
    await targetAudienceRepository.deleteAll();

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'All TargetAudiences deleted successfully',
    };

    return result;
  };
}

export default new TargetAudienceService();
