import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationTagInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
