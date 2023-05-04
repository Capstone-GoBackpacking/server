import { Module, forwardRef } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsResolver } from './trips.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Trips from './entities/trip.entity';
import { LocationsModule } from 'modules/locations/locations.module';
import { TypesModule } from 'modules/types/types.module';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { RequestJoinTripModule } from 'modules/request-join-trip/request-join-trip.module';
import { PostsModule } from 'modules/posts/posts.module';
import { TagHobbyModule } from 'modules/tag-hobby/tag-hobby.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Trips]),
    forwardRef(() => LocationsModule),
    forwardRef(() => TypesModule),
    forwardRef(() => AccountsModule),
    forwardRef(() => RequestJoinTripModule),
    forwardRef(() => PostsModule),
    forwardRef(() => TagHobbyModule),
  ],
  providers: [TripsResolver, TripsService],
  exports: [TripsService],
})
export class TripsModule {}
