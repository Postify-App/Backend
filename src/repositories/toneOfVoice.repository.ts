import { ToneOfVoice } from '@prisma/client';
import prisma from '../config/prisma';

class ToneOfVoiceRepository {
  private toneOfVoice = prisma.toneOfVoice;

  async create(data: ToneOfVoice) {
    return await this.toneOfVoice.create({ data });
  }

  async findAll() {
    return await this.toneOfVoice.findMany();
  }

  async findById(id: string) {
    return await this.toneOfVoice.findUnique({ where: { id } });
  }

  async update(id: string, data: ToneOfVoice) {
    return await this.toneOfVoice.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await this.toneOfVoice.delete({ where: { id } });
  }

  async deleteAll() {
    return await this.toneOfVoice.deleteMany();
  }
}

export default new ToneOfVoiceRepository();
