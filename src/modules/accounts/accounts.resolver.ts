import { Query, Resolver } from '@nestjs/graphql';
import { AccountsService } from './accounts.service';
import Accounts from './entities/account.entity';

@Resolver(() => Accounts)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) { }

  @Query(() => [Accounts])
  async accounts(): Promise<Accounts[]> {
    return await this.accountsService.finds()
  }
}
