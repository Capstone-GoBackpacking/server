import { CreateRequestJoinTripInput } from './create-request-join-trip.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestJoinTripInput extends PartialType(CreateRequestJoinTripInput) {
  @Field(() => Int)
  id: number;
}
