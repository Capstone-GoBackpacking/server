import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Comments from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments)
    private readonly commentModel: typeof Comments
  ) { }

  async finds(): Promise<Comments[]> {
    return await this.commentModel.findAll()
  }
}
