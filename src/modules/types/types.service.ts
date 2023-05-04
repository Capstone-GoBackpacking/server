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
    return await this.typeModel.findAll();
  }
}
