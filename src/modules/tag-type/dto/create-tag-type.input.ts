import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTagTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
