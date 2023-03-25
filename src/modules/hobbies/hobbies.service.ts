import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Hobbies from './entities/hobby.entity';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectModel(Hobbies)
    private readonly hobbyModel: typeof Hobbies
  ) { }

  async finds(): Promise<Hobbies[]> {
    return await this.hobbyModel.findAll()
  }
}
