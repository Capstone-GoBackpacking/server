import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TagType from './entities/tag-type.entity';

@Injectable()
export class TagTypeService {
  constructor(
    @InjectModel(TagType) private readonly tagTypeModel: typeof TagType,
  ) {}

  async finds() {
    return await this.tagTypeModel.findAll();
  }
}
