import { MainGoal } from '@prisma/client';
import prisma from '../config/prisma';

class MainGoalRepository {
  private mainGoal = prisma.mainGoal;

  async create(data: MainGoal) {
    return await this.mainGoal.create({ data });
  }

  async findAll() {
    return await this.mainGoal.findMany();
  }

  async findById(id: string) {
    return await this.mainGoal.findUnique({ where: { id } });
  }

  async update(id: string, data: MainGoal) {
    return await this.mainGoal.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await this.mainGoal.delete({ where: { id } });
  }

  async deleteAll() {
    return await this.mainGoal.deleteMany();
  }
}

export default new MainGoalRepository();
