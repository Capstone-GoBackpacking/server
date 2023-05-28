import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
  Context,
} from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import Profiles from './entities/profile.entity';
import { AccountsService } from 'modules/accounts/accounts.service';
import Accounts from 'modules/accounts/entities/account.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { UpdateProfileInput } from './dto/update-profile.input';

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

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Args('input') input: UpdateProfileInput,
    @Context() ctx: any,
  ) {
    const { id } = ctx.req.user;
    return await this.profilesService.update(id, input);
  }

  @Query(() => [Profiles])
  async profiles() {
    return await this.profilesService.finds();
  }
}
