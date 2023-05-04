import { CreateTagHobbyInput } from './create-tag-hobby.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagHobbyInput extends PartialType(CreateTagHobbyInput) {
  @Field(() => Int)
  id: number;
}
