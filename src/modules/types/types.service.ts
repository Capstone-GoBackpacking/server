import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Tags from 'modules/tags/entities/tag.entity';
import Types from './entities/type.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectModel(Types)
    private readonly typeModel: typeof Types,
  ) {}

  async deleteById(id: string) {
    await this.typeModel.destroy({
      where: {
        id,
      },
    });
    return 'Delete Success!';
  }

  async update(id: string, data: any) {
    const { relations, ...remain } = data;
    const target = await this.typeModel.findByPk(id);
    if (relations.length > 0) {
      await target?.addTags(relations);
    }
    return await this.typeModel.update(
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
    const record = await this.typeModel.create({
      name: body.name,
    });
    if (body.relations.length > 0) {
      await record.addTags(body.relations);
    }
    return record;
  }

  async findTags(typeId: string) {
    return await this.typeModel
      .findOne({
        where: {
          id: typeId,
        },
        include: {
          model: Tags,
          as: 'tags',
        },
      })
      .then((res) => res?.tags);
  }

  async findById(id: string): Promise<Types | null> {
    return await this.typeModel.findByPk(id);
  }

  async finds(): Promise<Types[]> {
    return await this.typeModel.findAll({
      include: {
        model: Tags,
        as: 'tags',
      },
    });
  }
}
