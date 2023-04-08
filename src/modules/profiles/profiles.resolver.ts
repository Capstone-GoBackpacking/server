import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import Profiles from './entities/profile.entity';
import { AccountsService } from 'modules/accounts/accounts.service';
import Accounts from 'modules/accounts/entities/account.entity';

@Resolver(() => Profiles)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService,
    private readonly accountsService: AccountsService,
  ) {}

  @ResolveField('account', () => Accounts)
  async getAccount(@Parent() profile: Profiles) {
    return await this.accountsService.findById(profile.accountId);
  }

  @Query(() => [Profiles])
  async profiles() {
    return await this.profilesService.finds();
  }
}
