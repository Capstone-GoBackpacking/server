import { Module } from '@nestjs/common';
import { PostImagesService } from './post-images.service';
import { PostImagesResolver } from './post-images.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import PostImages from './entities/post-image.entity';

@Module({
  imports: [SequelizeModule.forFeature([PostImages])],
  providers: [PostImagesResolver, PostImagesService],
  exports: [PostImagesService],
})
export class PostImagesModule {}
