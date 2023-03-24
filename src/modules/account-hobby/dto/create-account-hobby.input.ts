import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAccountHobbyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
