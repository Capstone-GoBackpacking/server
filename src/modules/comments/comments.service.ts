import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Comments from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comments)
    private readonly commentModel: typeof Comments,
  ) {}

  async findsByAuthor(authorId: string): Promise<Comments[]> {
    return await this.commentModel.findAll({
      where: {
        authorId,
      },
    });
  }

  async findsByPost(postId: string): Promise<Comments[]> {
    return await this.commentModel.findAll({
      where: {
        postId,
      },
    });
  }

  async create({
    content,
    postId,
    authorId,
  }: {
    [key: string]: string;
  }): Promise<Comments> {
    return await this.commentModel.create({
      content,
      postId,
      authorId,
      time: Date.now(),
    });
  }

  async finds(): Promise<Comments[]> {
    return await this.commentModel.findAll();
  }
}
