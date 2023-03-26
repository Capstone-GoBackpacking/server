import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Comments from './entities/comment.entity';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService]
})
export class CommentsModule { }
