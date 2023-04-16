import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import Reviews from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';

@Resolver(() => Reviews)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Reviews)
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
}
