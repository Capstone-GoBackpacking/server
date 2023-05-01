import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Posts from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts)
    private readonly postModel: typeof Posts,
  ) {}

  async findsByTrip(tripId: string): Promise<Posts[]> {
    return await this.postModel.findAll({
      where: {
        tripId,
      },
    });
  }

  async findsByAuthor(authorId: string): Promise<Posts[]> {
    return await this.postModel.findAll({
      where: {
        authorId,
      },
    });
  }

  async create({
    title,
    content,
    authorId,
    tripId,
  }: {
    [key: string]: string;
  }) {
    return await this.postModel.create({
      title,
      content,
      authorId,
      tripId,
      time: Date.now(),
    });
  }

  async finds(): Promise<Posts[]> {
    return await this.postModel.findAll();
  }
}
