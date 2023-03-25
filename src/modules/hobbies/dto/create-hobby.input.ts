import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHobbyInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
