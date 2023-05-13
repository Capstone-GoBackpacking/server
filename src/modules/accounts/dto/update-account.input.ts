import { CreateAccountInput } from './create-account.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAccountInput extends PartialType(CreateAccountInput) {
  @Field({ nullable: true })
  email?: string;
  @Field({ nullable: true })
  password?: string;
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  birthday?: string;
  @Field({ nullable: true })
  address?: string;
  @Field({ nullable: true })
  avatar?: string;
}

@InputType()
export class AsignHobbiesInput {
  @Field()
  id: string;
  @Field(() => [String])
  hobbies: string[];
}
