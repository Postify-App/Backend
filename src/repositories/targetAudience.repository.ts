import { TargetAudience } from '@prisma/client';
import prisma from '../config/prisma';

class TargetAudienceRepository {
  private targetAudience = prisma.targetAudience;

  async create(data: TargetAudience) {
    return await this.targetAudience.create({ data });
  }

  async findAll() {
    return await this.targetAudience.findMany();
  }

  async findById(id: string) {
    return await this.targetAudience.findUnique({ where: { id } });
  }

  async update(id: string, data: TargetAudience) {
    return await this.targetAudience.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await this.targetAudience.delete({ where: { id } });
  }

  async deleteAll() {
    return await this.targetAudience.deleteMany();
  }
}

export default new TargetAudienceRepository();
