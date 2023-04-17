import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import Accounts from './entities/account.entity';
import { TripsService } from 'modules/trips/trips.service';
import Trips from 'modules/trips/entities/trip.entity';
import Profiles from 'modules/profiles/entities/profile.entity';
import { ProfilesService } from 'modules/profiles/profiles.service';
import Reviews from 'modules/reviews/entities/review.entity';
import { ReviewsService } from 'modules/reviews/reviews.service';

@Resolver(() => Accounts)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly tripsService: TripsService,
    private readonly profilesService: ProfilesService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Query(() => Accounts)
  async getAccountById(@Args('input') id: string) {
    return await this.accountsService.findById(id);
  }

  @ResolveField('reviews', () => [Reviews])
  async getReviews(@Parent() account: Accounts) {
    return await this.reviewsService.findsByHost(account.id);
  }

  @ResolveField('profile', () => Profiles)
  async getProfile(@Parent() account: Accounts) {
    return await this.profilesService.findByAccount(account.id);
  }

  @ResolveField('trips', () => [Trips])
  async getTrips(@Parent() account: Accounts) {
    return await this.tripsService.findsByHost(account.id);
  }

  @Query(() => [Accounts])
  async accounts(): Promise<Accounts[]> {
    return await this.accountsService.finds();
  }
}
