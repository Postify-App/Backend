import { MainGoal } from '@prisma/client';

import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';
import { APIResponse } from '../types/api.types';
import mainGoalRepository from '../repositories/mainGoal.repositories';

class MainGoalService {
  createMainGoal = async (data: MainGoal) => {
    const mainGoal = await mainGoalRepository.create(data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.Created,
      data: mainGoal,
    };

    return result;
  };

  getAllMainGoals = async () => {
    const allMainGoals = await mainGoalRepository.findAll();

    const result: APIResponse = {
      status: 'success',
      size: allMainGoals.length,
      statusCode: statusCodes.OK,
      data: allMainGoals,
    };

    return result;
  };

  getMainGoalById = async (id: string) => {
    const mainGoal = await mainGoalRepository.findById(id);

    if (!mainGoal)
      throw new APIError(
        'There is no main goal with this id',
        statusCodes.NotFound
      );

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: mainGoal,
    };

    return result;
  };

  updateMainGoal = async (id: string, data: MainGoal) => {
    const mainGoal = await mainGoalRepository.update(id, data);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.OK,
      data: mainGoal,
    };

    return result;
  };

  deleteMainGoal = async (id: string) => {
    await mainGoalRepository.delete(id);

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'Main Goal deleted successfully',
    };

    return result;
  };

  deleteAllMainGoals = async () => {
    await mainGoalRepository.deleteAll();

    const result: APIResponse = {
      status: 'success',
      statusCode: statusCodes.NoContent,
      message: 'All Main Goals deleted successfully',
    };

    return result;
  };
}

export default new MainGoalService();
