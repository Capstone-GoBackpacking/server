import { Field, ObjectType } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';

@ObjectType()
export class LoginResponseDTO {
  @Field()
  access_token: string;

  @Field(() => Accounts)
  account: Accounts;
}
