import { MainTopic } from '@prisma/client';
import prisma from '../config/prisma';

class MainTopicRepository {
  mainTopic = prisma.mainTopic;

  createMainTopic = async (data: MainTopic) => {
    return await this.mainTopic.create({
      data,
    });
  };

  getAllTopics = async () => {
    return await this.mainTopic.findMany();
  };

  getTopic = async (id: string) => {
    return await this.mainTopic.findUnique({
      where: {
        id,
      },
    });
  };

  editMainTopic = async (id: string, data: MainTopic) => {
    return await this.mainTopic.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteMainTopic = async (id: string) => {
    return await this.mainTopic.delete({
      where: {
        id,
      },
    });
  };

  deleteAllTopics = async () => {
    return await this.mainTopic.deleteMany();
  };
}

export default new MainTopicRepository();
