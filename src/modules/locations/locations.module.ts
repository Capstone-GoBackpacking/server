import { Module, forwardRef } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Locations from './entities/location.entity';
import { TripsModule } from 'modules/trips/trips.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Locations]),
    forwardRef(() => TripsModule),
  ],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService],
})
export class LocationsModule {}
