import { Module } from '@nestjs/common';
import { RepliesService } from './replies.service';
import { RepliesResolver } from './replies.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Replies from './entities/reply.entity';

@Module({
  imports: [SequelizeModule.forFeature([Replies])],
  providers: [RepliesResolver, RepliesService],
  exports: [RepliesService]
})
export class RepliesModule { }
