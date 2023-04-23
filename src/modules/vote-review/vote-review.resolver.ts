import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { VoteReviewService } from './vote-review.service';
import VoteReview from './entities/vote-review.entity';
import { CreateVoteReviewInput } from './dto/create-vote-review.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { AccountsService } from 'modules/accounts/accounts.service';
import { ReviewsService } from 'modules/reviews/reviews.service';
import Reviews from 'modules/reviews/entities/review.entity';
import Accounts from 'modules/accounts/entities/account.entity';

@Resolver(() => VoteReview)
export class VoteReviewResolver {
  constructor(
    private readonly voteReviewService: VoteReviewService,
    private readonly accountsService: AccountsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @ResolveField('account', () => Accounts)
  async getAccount(@Parent() vote: VoteReview) {
    return await this.accountsService.findById(vote.accountId);
  }

  @ResolveField('review', () => Reviews)
  async getReview(@Parent() vote: VoteReview) {
    return await this.reviewsService.findById(vote.reviewId);
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async unVoting(@Args('id') id: string) {
    return await this.voteReviewService.unVote(id);
  }

  @Mutation(() => VoteReview)
  @UseGuards(JwtAuthGuard)
  async voting(
    @Args('input') input: CreateVoteReviewInput,
    @Context() ctx: any,
  ) {
    const { id } = ctx.req.user;
    if (await this.voteReviewService.isVoted(input.reviewId, id)) {
      await this.voteReviewService.deleteVote(input.reviewId, id);
    }
    return await this.voteReviewService.create(
      input.status,
      input.reviewId,
      id,
    );
  }

  @Query(() => [VoteReview])
  async voteReviews() {
    return await this.voteReviewService.finds();
  }
}
