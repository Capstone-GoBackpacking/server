import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Tags from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tags)
    private readonly tagModel: typeof Tags
  ) { }

  async finds(): Promise<Tags[]> {
    return await this.tagModel.findAll()
  }
}
