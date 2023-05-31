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

  async deleteById(id: string) {
    await this.hobbyModel.destroy({
      where: {
        id,
      },
    });
    return 'Delete Success!';
  }

  async update(id: string, data: any) {
    const { relations, ...remain } = data;
    const target = await this.hobbyModel.findByPk(id);
    if (relations.length > 0) {
      await target?.addTags(relations);
    }
    await this.hobbyModel.update(
      {
        ...remain,
      },
      {
        where: {
          id,
        },
      },
    );
  }

  async create(body: { name: string; relations: string[] }) {
    const record = await this.hobbyModel.create({
      name: body.name,
    });
    if (body.relations.length > 0) {
      await record.addTags(body.relations);
    }
    return record;
  }

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
    return await this.hobbyModel.findAll({
      include: {
        model: Tags,
        as: 'tags',
      },
    });
  }
}
