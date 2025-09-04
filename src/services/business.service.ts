import { Business } from '@prisma/client';
import businessRepository from '../repositories/business.repository';
import { APIResponse } from '../types/api.types';
import statusCodes from '../utils/statusCodes';
import logger from '../config/logger';

class BusinessService {
  createBusiness = async (data: Business, userId: string) => {
    data.userId = userId;

    const business = await businessRepository.createBusiness(data);

    const res: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: business,
    };

    logger.info(
      `Business ${business.id}, ${business.name}, was created successfully, by user ${business.userId}`
    );

    return res;
  };
}

export default new BusinessService();
