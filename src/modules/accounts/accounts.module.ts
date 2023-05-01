import { Module, forwardRef } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Accounts from './entities/account.entity';
import { TripsModule } from 'modules/trips/trips.module';
import { ProfilesModule } from 'modules/profiles/profiles.module';
import { ReviewsModule } from 'modules/reviews/reviews.module';
import { VoteReviewModule } from 'modules/vote-review/vote-review.module';
import { PostsModule } from 'modules/posts/posts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Accounts]),
    forwardRef(() => TripsModule),
    forwardRef(() => ProfilesModule),
    forwardRef(() => ReviewsModule),
    forwardRef(() => VoteReviewModule),
    forwardRef(() => PostsModule),
  ],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService],
})
export class AccountsModule {}
