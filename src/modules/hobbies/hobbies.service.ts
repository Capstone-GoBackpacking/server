import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Tags from 'modules/tags/entities/tag.entity';
import Hobbies from './entities/hobby.entity';

@Injectable()
export class HobbiesService {
  constructor(
    @InjectModel(Hobbies)
    private readonly hobbyModel: typeof Hobbies,
  ) {}

  async findTags(hobbyId: string) {
    return await this.hobbyModel
      .findOne({
        where: {
          id: hobbyId,
        },
        include: {
          model: Tags,
          as: 'tags',
        },
      })
      .then((res) => res?.tags);
  }

  async finds(): Promise<Hobbies[]> {
    return await this.hobbyModel.findAll();
  }
}
