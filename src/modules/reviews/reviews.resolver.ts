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

@Resolver(() => Reviews)
export class ReviewsResolver {
  constructor(
    private readonly reviewsService: ReviewsService,
    private readonly accountsService: AccountsService,
    private readonly locationsService: LocationsService,
  ) {}

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
