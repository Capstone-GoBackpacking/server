import { Module, forwardRef } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsResolver } from './trips.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Trips from './entities/trip.entity';
import { LocationsModule } from 'modules/locations/locations.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Trips]),
    forwardRef(() => LocationsModule),
  ],
  providers: [TripsResolver, TripsService],
  exports: [TripsService],
})
export class TripsModule {}
