import { CreateProfileInput } from './create-profile.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProfileInput extends PartialType(CreateProfileInput) {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  birthday?: string;
  @Field({ nullable: true })
  avatar?: string;
  @Field({ nullable: true })
  genderId?: string;
}
