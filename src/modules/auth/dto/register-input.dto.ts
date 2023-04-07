import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RegisterInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  role?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  gender: string;
}
