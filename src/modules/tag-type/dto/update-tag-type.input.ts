import { CreateTagTypeInput } from './create-tag-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTagTypeInput extends PartialType(CreateTagTypeInput) {
  @Field(() => Int)
  id: number;
}
