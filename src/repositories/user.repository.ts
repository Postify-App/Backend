import prisma from '../config/prisma';
import { UpdatedUserData } from '../types/user.types';

class UserRepository {
  private user = prisma.user;

  getUserByEmail = async (email: string) => {
    return await this.user.findUnique({
      where: {
        email,
      },
    });
  };

  getUserById = async (id: string) => {
    return await this.user.findUnique({
      where: {
        id,
      },
    });
  };

  createUser = async (email: string, name = 'user') => {
    return await this.user.create({
      data: {
        name,
        email,
      },
    });
  };

  getUserByIdAndUpdate = async (id: string, data: UpdatedUserData) => {
    await this.user.update({
      where: {
        id,
      },
      data,
    });
  };
}

export default new UserRepository();
