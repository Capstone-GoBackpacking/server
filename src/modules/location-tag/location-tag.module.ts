import { Module } from '@nestjs/common';
import { LocationTagService } from './location-tag.service';
import { LocationTagResolver } from './location-tag.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import LocationTag from './entities/location-tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([LocationTag])],
  providers: [LocationTagResolver, LocationTagService],
  exports: [LocationTagService]
})
export class LocationTagModule { }
