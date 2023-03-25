import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Tags from './entities/tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tags])],
  providers: [TagsResolver, TagsService],
  exports: [TagsService]
})
export class TagsModule { }
