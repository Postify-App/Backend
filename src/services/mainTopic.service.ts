import { MainTopic } from '@prisma/client';
import mainTopicRepository from '../repositories/mainTopic.repository';
import { APIResponse } from '../types/api.types';
import statusCodes from '../utils/statusCodes';
import APIError from '../utils/APIError';

class MainTopicService {
  createMainTopic = async (data: MainTopic) => {
    const mainTopic = await mainTopicRepository.createMainTopic(data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: mainTopic,
    };

    return result;
  };

  getAllTopics = async () => {
    const allTopics = await mainTopicRepository.getAllTopics();

    const result: APIResponse = {
      status: 'success',
      size: allTopics.length,
      statusCode: statusCodes.OK,
      data: allTopics,
    };

    return result;
  };

  getTopic = async (id: string) => {
    const topic = await mainTopicRepository.getTopic(id);

    if (!topic)
      throw new APIError(
        'There is no topic with this id',
        statusCodes.NotFound
      );

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: topic,
    };

    return result;
  };

  editMainTopic = async (topicId: string, data: MainTopic) => {
    const mainTopic = await mainTopicRepository.editMainTopic(topicId, data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: mainTopic,
    };

    return result;
  };

  deleteMainTopic = async (topicId: string) => {
    await mainTopicRepository.deleteMainTopic(topicId);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'Main Topic deleted successfully',
    };

    return result;
  };

  deleteAllTopics = async () => {
    await mainTopicRepository.deleteAllTopics();

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'All Topics deleted successfully',
    };

    return result;
  };
}

export default new MainTopicService();
