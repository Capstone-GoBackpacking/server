import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsResolver } from './trips.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Trips from './entities/trip.entity';

@Module({
  imports: [SequelizeModule.forFeature([Trips])],
  providers: [TripsResolver, TripsService],
  exports: [TripsService]
})
export class TripsModule { }
