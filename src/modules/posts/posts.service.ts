import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Posts from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts)
    private readonly postModel: typeof Posts
  ) { }

  async finds(): Promise<Posts[]> {
    return await this.postModel.findAll()
  }
}
