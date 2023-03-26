import { Module } from '@nestjs/common';
import { RequestJoinTripService } from './request-join-trip.service';
import { RequestJoinTripResolver } from './request-join-trip.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import RequestJoinTrip from './entities/request-join-trip.entity';

@Module({
  imports: [SequelizeModule.forFeature([RequestJoinTrip])],
  providers: [RequestJoinTripResolver, RequestJoinTripService],
  exports: [RequestJoinTripService]
})
export class RequestJoinTripModule { }
