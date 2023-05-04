import { Module } from '@nestjs/common';
import { TagTypeService } from './tag-type.service';
import { TagTypeResolver } from './tag-type.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import TagType from './entities/tag-type.entity';

@Module({
  imports: [SequelizeModule.forFeature([TagType])],
  providers: [TagTypeResolver, TagTypeService],
  exports: [TagTypeService],
})
export class TagTypeModule {}
