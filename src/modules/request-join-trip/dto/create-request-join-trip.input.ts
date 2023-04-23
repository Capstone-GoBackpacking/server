import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequestJoinTripInput {
  @Field()
  tripId: string;
}
