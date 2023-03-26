import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Posts from './entities/post.entity';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  providers: [PostsResolver, PostsService],
  exports: [PostsService]
})
export class PostsModule { }
