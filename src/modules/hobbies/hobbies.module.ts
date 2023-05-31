import { Module } from '@nestjs/common';
import { HobbiesService } from './hobbies.service';
import { HobbiesResolver } from './hobbies.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { HobbiesController } from './hobbies.controller';
import Hobbies from './entities/hobby.entity';

@Module({
  imports: [SequelizeModule.forFeature([Hobbies])],
  providers: [HobbiesResolver, HobbiesService],
  exports: [HobbiesService],
  controllers: [HobbiesController]
})
export class HobbiesModule { }
