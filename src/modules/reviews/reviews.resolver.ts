import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import Reviews from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { AccountsService } from 'modules/accounts/accounts.service';
import Accounts from 'modules/accounts/entities/account.entity';
import Locations from 'modules/locations/entities/location.entity';
import { LocationsService } from 'modules/locations/locations.service';
import { VoteReviewService } from 'modules/vote-review/vote-review.service';
import VoteReview from 'modules/vote-review/entities/vote-review.entity';
import { TripsService } from 'modules/trips/trips.service';
import { RequestJoinTripService } from 'modules/request-join-trip/request-join-trip.service';

@Resolver(() => Reviews)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly accountsService: AccountsService,
    private readonly locationsService: LocationsService,
    private readonly voteReviewService: VoteReviewService,
    private readonly tripsService: TripsService,
    private readonly requestJoinTripService: RequestJoinTripService,
  ) {}

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async permissionReview(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    const myTrips = await this.tripsService.findsByHost(id);
    const myJoinedTrips = await this.requestJoinTripService.findsByMember(
      id,
      true,
    );
    const trips = [...myTrips, ...myJoinedTrips];
    for (const trip of trips) {
      console.log(input, trip.locationStartId, trip.locationEndId);
      if (
        (trip.locationEndId === input || trip.locationStartId === input) &&
        new Date(trip.timeEnd).getTime() < new Date().getTime()
      ) {
        return true;
      }
    }
    return false;
  }

  @ResolveField('targetVoted', () => String)
  @UseGuards(JwtAuthGuard)
  async targetVoted(@Parent() review: Reviews, @Context() ctx: any) {
    const { id } = ctx.req.user;
    const vote = await this.voteReviewService.findByTwoForeign(review.id, id);
    return vote ? vote.status : '';
  }

  @ResolveField('voteReviews', () => [VoteReview])
  async getVoteReviews(@Parent() review: Reviews) {
    return await this.voteReviewService.findsByReview(review.id);
  }

  @Query(() => [Reviews])
  async reviewsOfLocation(@Args('locationId') id: string) {
    return await this.reviewsService.findsByLocation(id);
  }

  @ResolveField('host', () => Accounts)
  async getHost(@Parent() review: Reviews) {
    return await this.accountsService.findById(review.hostId);
  }

  @ResolveField('location', () => Locations)
  async getLocation(@Parent() review: Reviews) {
    return await this.locationsService.findById(review.locationId);
  }

  @Mutation(() => Reviews)
  @UseGuards(JwtAuthGuard)
  async createReview(
    @Args('input') input: CreateReviewInput,
    @Context() ctx: any,
  ) {
    const { id } = ctx.req.user;
    return await this.reviewsService.create({
      ...input,
      hostId: id,
    });
  }

  @Query(() => [Reviews])
  async reviews() {
    return await this.reviewsService.finds();
  }
}
