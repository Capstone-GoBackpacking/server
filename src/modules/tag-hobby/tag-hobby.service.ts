import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import TagHobby from './entities/tag-hobby.entity';

@Injectable()
export class TagHobbyService {
  constructor(
    @InjectModel(TagHobby)
    private readonly tagHobbyModel: typeof TagHobby,
  ) {}

  async findByTagHobby(tagId: string, hobbyId: string) {
    return await this.tagHobbyModel.findOne({
      where: {
        tagId,
        hobbyId,
      },
    });
  }

  async finds() {
    return await this.tagHobbyModel.findAll();
  }
}
