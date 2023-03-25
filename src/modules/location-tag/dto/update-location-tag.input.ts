import { CreateLocationTagInput } from './create-location-tag.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLocationTagInput extends PartialType(CreateLocationTagInput) {
  @Field(() => Int)
  id: number;
}
