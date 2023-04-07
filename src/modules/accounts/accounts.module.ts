import { Module, forwardRef } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Accounts from './entities/account.entity';
import { TripsModule } from 'modules/trips/trips.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Accounts]),
    forwardRef(() => TripsModule),
  ],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
