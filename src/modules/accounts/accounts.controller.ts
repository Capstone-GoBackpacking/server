import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { ProfilesService } from 'modules/profiles/profiles.service';
import { AccountsService } from './accounts.service';
import { UpdateAccountInput } from './dto/update-account.input';

@Controller('accounts')
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly profilesService: ProfilesService,
  ) {}

  @Get()
  async accounts() {
    const accounts = await this.accountsService.finds();
    return await Promise.all(
      accounts.map(async (account) => {
        const profile = await this.profilesService.findByAccount(account.id);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...rest } = profile?.dataValues;
        return {
          ...account.dataValues,
          ...rest,
        };
      }),
    );
  }

  @Get(':id')
  async byId(@Param() params: any) {
    const account = await this.accountsService.findById(params.id);
    const profile = await this.profilesService.findByAccount(params.id);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = profile?.dataValues;
    return {
      ...account?.dataValues,
      ...rest,
    };
  }

  @Delete(':id')
  async byIdDelete(@Param() params: any) {
    await this.accountsService.deleteById(params.id);
    return 'Delete Success';
  }

  @Put(':id')
  async byIdUpdate(@Param() params: any, @Body() body: UpdateAccountInput) {
    const { email, password, address, avatar, firstName, lastName, birthday } =
      body;
    if (email || password) {
      await this.accountsService.update(params.id, {
        ...(email && { email }),
        ...(password && { password }),
      });
    }
    if (address || avatar || firstName || lastName || birthday) {
      await this.profilesService.update(params.id, {
        ...(address && { address }),
        ...(avatar && { avatar }),
        ...(firstName && { firstName }),
        ...(lastName && { lastName }),
        ...(birthday && { birthday }),
      });
    }
    return 'Update Sucess';
  }
}
