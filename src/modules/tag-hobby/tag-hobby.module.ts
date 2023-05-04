import { Module } from '@nestjs/common';
import { TagHobbyService } from './tag-hobby.service';
import { TagHobbyResolver } from './tag-hobby.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import TagHobby from './entities/tag-hobby.entity';

@Module({
  imports: [SequelizeModule.forFeature([TagHobby])],
  providers: [TagHobbyResolver, TagHobbyService],
  exports: [TagHobbyService],
})
export class TagHobbyModule {}
