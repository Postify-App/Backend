import prisma from '../config/prisma';

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
}

export default new UserRepository();
