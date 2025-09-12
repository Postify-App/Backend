import { Business, User } from '@prisma/client';

import logger from '../config/logger';
import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import cloudinaryService from './cloudinary.service';
import businessRepository from '../repositories/business.repository';

class BusinessService {
  checkIfBusinessUser = async (currentUserId: string, id: string) => {
    const { userId } = (await businessRepository.getBusinessById(id))!;

    if (userId !== currentUserId)
      throw new APIError(
        'You are not authorized to update this business',
        statusCodes.Forbidden
      );
  };

  createBusiness = async (data: Business, userId: string) => {
    if (data.logo) {
      const { secure_url } = await cloudinaryService.uploadToCloud(data.logo);
      data.logo = secure_url;
    }

    data.userId = userId;

    const business = await businessRepository.createBusiness(data);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: business,
    };

    logger.info(
      `Business ${business.id} was created successfully by user ${business.userId}`
    );

    return res;
  };

  getUserBusinesses = async (user: User) => {
    const businesses = await businessRepository.getUserBusinesses(user.id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      size: businesses.length,
      data: businesses,
    };

    return result;
  };

  getBusinessById = async (id: string) => {
    const bs = await businessRepository.getBusinessById(id);

    if (!bs)
      throw new APIError(
        'There is no business with this id',
        statusCodes.NotFound
      );

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: bs,
    };

    return result;
  };

  updateBusiness = async (
    currentUserId: string,
    id: string,
    data: Business
  ) => {
    this.checkIfBusinessUser(currentUserId, id);

    const business = await businessRepository.updateBusiness(id, data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: business,
    };

    return result;
  };

  deleteBusiness = async (currentUserId: string, id: string) => {
    this.checkIfBusinessUser(currentUserId, id);

    await businessRepository.deleteBusiness(id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'Business deleted successfully',
    };

    return result;
  };

  getBusinessInfoById = async (currentUserId: string, id: string) => {
    this.checkIfBusinessUser(currentUserId, id);

    const bs = await businessRepository.getInfoById(id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: {
        userId: bs.userId,
        targetAudience: bs.targetAudience?.title || null,
        mainGoal: bs.mainGoal?.title || null,
        mainTopic: bs.mainTopic?.title || null,
        toneOfVoice: bs.toneOfVoice?.title || null,
      },
    };

    return result;
  };
}

export default new BusinessService();
