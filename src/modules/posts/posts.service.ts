import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Posts from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Posts)
    private readonly postModel: typeof Posts,
  ) {}

  async findById(id: string): Promise<Posts | null> {
    return await this.postModel.findByPk(id);
  }

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
    content,
    authorId,
    tripId,
  }: {
    [key: string]: string | string[];
  }) {
    const record = await this.postModel.create({
      content,
      authorId,
      tripId,
      time: Date.now(),
    });
    return record;
  }

  async finds(): Promise<Posts[]> {
    return await this.postModel.findAll();
  }
}
