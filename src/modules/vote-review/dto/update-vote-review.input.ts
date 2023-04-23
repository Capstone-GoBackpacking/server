import { CreateVoteReviewInput } from './create-vote-review.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVoteReviewInput extends PartialType(CreateVoteReviewInput) {
  @Field(() => Int)
  id: number;
}
