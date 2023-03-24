import { CreateHobbyInput } from './create-hobby.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHobbyInput extends PartialType(CreateHobbyInput) {
  @Field(() => Int)
  id: number;
}
