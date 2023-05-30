import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Reviews from './entities/review.entity';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { LocationsModule } from 'modules/locations/locations.module';
import { VoteReviewModule } from 'modules/vote-review/vote-review.module';
import { TripsModule } from 'modules/trips/trips.module';
import { RequestJoinTripModule } from 'modules/request-join-trip/request-join-trip.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reviews]),
    forwardRef(() => AccountsModule),
    forwardRef(() => LocationsModule),
    forwardRef(() => VoteReviewModule),
    forwardRef(() => TripsModule),
    forwardRef(() => RequestJoinTripModule),
  ],
  providers: [ReviewsResolver, ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
