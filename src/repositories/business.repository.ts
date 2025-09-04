import { Business } from '@prisma/client';
import prisma from '../config/prisma';

class BusinessRepository {
  private business = prisma.business;

  createBusiness = async (data: Business) => {
    return await this.business.create({
      data,
    });
  };
}

export default new BusinessRepository();
