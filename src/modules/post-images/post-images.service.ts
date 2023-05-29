import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import PostImages from './entities/post-image.entity';

interface ICreate {
  postId: string;
  url: string;
}

@Injectable()
export class PostImagesService {
  constructor(
    @InjectModel(PostImages)
    private readonly postImageModel: typeof PostImages,
  ) {}

  async getByPost(postId: string) {
    return await this.postImageModel.findAll({
      where: {
        postId,
      },
    });
  }

  async create(body: ICreate) {
    const record = await this.postImageModel.create({
      postId: body.postId,
      url: body.url,
    });
    return record;
  }
}
