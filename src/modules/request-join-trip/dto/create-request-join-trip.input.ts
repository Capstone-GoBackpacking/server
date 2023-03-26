import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateRequestJoinTripInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
