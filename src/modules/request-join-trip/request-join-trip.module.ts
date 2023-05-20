import { forwardRef, Module } from '@nestjs/common';
import { RequestJoinTripService } from './request-join-trip.service';
import { RequestJoinTripResolver } from './request-join-trip.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import RequestJoinTrip from './entities/request-join-trip.entity';
import { TripsModule } from 'modules/trips/trips.module';
import { AccountsModule } from 'modules/accounts/accounts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([RequestJoinTrip]),
    forwardRef(() => TripsModule),
    forwardRef(() => AccountsModule),
  ],
  providers: [RequestJoinTripResolver, RequestJoinTripService],
  exports: [RequestJoinTripService],
})
export class RequestJoinTripModule {}
