import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import PostTag from './entities/post-tag.entity';

@Injectable()
export class PostTagService {
  constructor(
    @InjectModel(PostTag)
    private readonly postTagModel: typeof PostTag
  ) { }

  async finds(): Promise<PostTag[]> {
    return await this.postTagModel.findAll()
  }
}
