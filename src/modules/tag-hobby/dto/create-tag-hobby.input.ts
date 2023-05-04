import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagHobbyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
