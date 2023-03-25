import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersResolver } from './genders.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Genders from './entities/gender.entity';

@Module({
  imports: [SequelizeModule.forFeature([Genders])],
  providers: [GendersResolver, GendersService],
  exports: [GendersService]
})
export class GendersModule { }
