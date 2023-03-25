import { CreateAccountHobbyInput } from './create-account-hobby.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountHobbyInput extends PartialType(CreateAccountHobbyInput) {
  @Field(() => Int)
  id: number;
}
