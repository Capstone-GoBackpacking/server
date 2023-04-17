import { Module, forwardRef } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Accounts from './entities/account.entity';
import { TripsModule } from 'modules/trips/trips.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';
import { ReviewsModule } from 'modules/reviews/reviews.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Accounts]),
    forwardRef(() => TripsModule),
    forwardRef(() => ProfilesModule),
    forwardRef(() => ReviewsModule),
  ],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
