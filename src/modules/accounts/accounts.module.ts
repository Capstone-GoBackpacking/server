import { Module } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Accounts from './entities/account.entity'

@Module({
  imports: [SequelizeModule.forFeature([Accounts])],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService]
})
export class AccountsModule { }
