import { CreatePostImageInput } from './create-post-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePostImageInput extends PartialType(CreatePostImageInput) {
  @Field(() => Int)
  id: number;
}
