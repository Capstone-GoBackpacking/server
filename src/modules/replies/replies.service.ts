import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Replies from './entities/reply.entity';

@Injectable()
export class RepliesService {
  constructor(
    @InjectModel(Replies)
    private readonly replyModel: typeof Replies
  ) { }

  async finds(): Promise<Replies[]> {
    return await this.replyModel.findAll()
  }
}
