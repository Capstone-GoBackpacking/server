import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostImageInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
