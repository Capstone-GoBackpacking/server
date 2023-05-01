import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import Accounts from './entities/account.entity';
import { TripsService } from 'modules/trips/trips.service';
import Trips from 'modules/trips/entities/trip.entity';
import Profiles from 'modules/profiles/entities/profile.entity';
import { ProfilesService } from 'modules/profiles/profiles.service';
import Reviews from 'modules/reviews/entities/review.entity';
import { ReviewsService } from 'modules/reviews/reviews.service';
import VoteReview from 'modules/vote-review/entities/vote-review.entity';
import { VoteReviewService } from 'modules/vote-review/vote-review.service';
import Posts from 'modules/posts/entities/post.entity';
import { PostsService } from 'modules/posts/posts.service';
import Comments from 'modules/comments/entities/comment.entity';
import { CommentsService } from 'modules/comments/comments.service';

@Resolver(() => Accounts)
export class AccountsResolver {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly tripsService: TripsService,
    private readonly profilesService: ProfilesService,
    private readonly reviewsService: ReviewsService,
    private readonly voteReviewService: VoteReviewService,
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @ResolveField('comments', () => [Comments])
  async getComments(@Parent() account: Accounts) {
    return await this.commentsService.findsByAuthor(account.id);
  }

  @ResolveField('posts', () => [Posts])
  async getPosts(@Parent() account: Accounts) {
    return await this.postsService.findsByAuthor(account.id);
  }

  @ResolveField('voteReviews', () => [VoteReview])
  async getVoteReviews(@Parent() account: Accounts) {
    return await this.voteReviewService.findsByAccount(account.id);
  }

  @ResolveField('joinedTrips', () => [Trips])
  async getJoinedTrips(@Parent() account: Accounts) {
    return await this.accountsService.findsJoinedTrip(account.id);
  }

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
