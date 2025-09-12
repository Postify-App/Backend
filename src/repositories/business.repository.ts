import { Business } from '@prisma/client';
import prisma from '../config/prisma';
import APIError from '../utils/APIError';
import statusCodes from '../utils/statusCodes';

class BusinessRepository {
  private business = prisma.business;

  createBusiness = async (data: Business) => {
    return await this.business.create({
      data,
      include: {
        mainGoal: true,
        mainTopic: true,
        toneOfVoice: true,
        targetAudience: true,
      },
      omit: {
        mainGoalId: true,
        mainTopicId: true,
        toneOfVoiceId: true,
        redditExpiresIn: true,
        targetAudienceId: true,
        redditAccessToken: true,
        redditRefreshToken: true,
      },
    });
  };

  getUserBusinesses = async (userId: string) => {
    return await this.business.findMany({
      where: {
        userId,
      },
      include: {
        mainGoal: true,
        mainTopic: true,
        toneOfVoice: true,
        targetAudience: true,
      },
      omit: {
        mainGoalId: true,
        mainTopicId: true,
        toneOfVoiceId: true,
        redditExpiresIn: true,
        targetAudienceId: true,
        redditAccessToken: true,
        redditRefreshToken: true,
      },
    });
  };

  getBusinessById = async (id: string) => {
    return await this.business.findUnique({
      where: {
        id,
      },
      include: {
        mainGoal: true,
        mainTopic: true,
        toneOfVoice: true,
        targetAudience: true,
      },
      omit: {
        mainGoalId: true,
        mainTopicId: true,
        toneOfVoiceId: true,
        redditExpiresIn: true,
        targetAudienceId: true,
        redditAccessToken: true,
        redditRefreshToken: true,
      },
    });
  };

  updateBusiness = async (id: string, data: Business) => {
    return await this.business.update({
      where: {
        id,
      },
      data,
      include: {
        mainGoal: true,
        mainTopic: true,
        toneOfVoice: true,
        targetAudience: true,
      },
      omit: {
        mainGoalId: true,
        mainTopicId: true,
        toneOfVoiceId: true,
        redditExpiresIn: true,
        targetAudienceId: true,
        redditAccessToken: true,
        redditRefreshToken: true,
      },
    });
  };

  deleteBusiness = async (id: string) => {
    await this.business.delete({
      where: { id },
    });
  };

  getInfoById = async (id: string) => {
    const business = await this.business.findUnique({
      where: {
        id,
      },
      select: {
        userId: true,
        targetAudience: {
          select: {
            title: true,
          },
        },
        toneOfVoice: {
          select: {
            title: true,
          },
        },
        mainGoal: {
          select: {
            title: true,
          },
        },
        mainTopic: {
          select: {
            title: true,
          },
        },
      },
    });

    if (!business)
      throw new APIError(
        'No business found with this id',
        statusCodes.BadRequest
      );

    return business;
  };
}

export default new BusinessRepository();
