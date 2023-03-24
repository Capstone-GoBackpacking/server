import { Resolver, Query } from '@nestjs/graphql';
import { AccountHobbyService } from './account-hobby.service';
import AccountHobby from './entities/account-hobby.entity';

@Resolver(() => AccountHobby)
export class AccountHobbyResolver {
  constructor(private readonly accountHobbyService: AccountHobbyService) { }

  @Query(() => [AccountHobby])
  async accountHobbies() {
    return this.accountHobbyService.finds()
  }
}
