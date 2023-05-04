import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import Types from 'modules/types/entities/type.entity';
import Tags from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags)
    private readonly tagModel: typeof Tags,
  ) {}

  async findTypes(tagId: string) {
    return await this.tagModel
      .findOne({
        where: {
          id: tagId,
        },
        include: {
          model: Types,
          as: 'types',
        },
      })
      .then((res) => res?.types);
  }

  async findHobbies(tagId: string) {
    return await this.tagModel
      .findOne({
        where: {
          id: tagId,
        },
        include: {
          model: Hobbies,
          as: 'hobbies',
        },
      })
      .then((res) => res?.hobbies);
  }

  async finds(): Promise<Tags[]> {
    return await this.tagModel.findAll();
  }
}
