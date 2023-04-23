import { InputType, Field } from '@nestjs/graphql';
import { EVote } from 'common/types/enums';

@InputType()
export class CreateVoteReviewInput {
  @Field()
  reviewId: string;
  @Field()
  status: EVote;
}
