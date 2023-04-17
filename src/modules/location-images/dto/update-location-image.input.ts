import { CreateLocationImageInput } from './create-location-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateLocationImageInput extends PartialType(CreateLocationImageInput) {
  @Field(() => Int)
  id: number;
}
