import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Locations from './entities/location.entity';

@Module({
  imports: [SequelizeModule.forFeature([Locations])],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
