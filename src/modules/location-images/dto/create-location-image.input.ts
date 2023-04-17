import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateLocationImageInput {
  @Field()
  locationId: string;

  @Field(() => [String])
  images: string[];
}
