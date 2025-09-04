import { Business } from '@prisma/client';
import prisma from '../config/prisma';

class BusinessRepository {
  private business = prisma.business;

  createBusiness = async (data: Business) => {
    return await this.business.create({
      data,
    });
  };

  getUserBusinesses = async (userId: string) => {
    return await this.business.findMany({
      where: {
        userId,
      },
    });
  };

  getBusinessById = async (id: string) => {
    return await this.business.findUnique({
      where: {
        id,
      },
    });
  };

  updateBusiness = async (id: string, data: Business) => {
    return await this.business.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteBusiness = async (id: string) => {
    await this.business.delete({
      where: { id },
    });
  };
}

export default new BusinessRepository();
