import { Module } from '@nestjs/common';
import { PostTagService } from './post-tag.service';
import { PostTagResolver } from './post-tag.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import PostTag from './entities/post-tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([PostTag])],
  providers: [PostTagResolver, PostTagService],
  exports: [PostTagService]
})
export class PostTagModule { }
