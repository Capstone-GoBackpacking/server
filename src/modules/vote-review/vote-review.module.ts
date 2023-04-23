import { forwardRef, Module } from '@nestjs/common';
import { VoteReviewService } from './vote-review.service';
import { VoteReviewResolver } from './vote-review.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import VoteReview from './entities/vote-review.entity';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { ReviewsModule } from 'modules/reviews/reviews.module';

@Module({
  imports: [
    SequelizeModule.forFeature([VoteReview]),
    forwardRef(() => AccountsModule),
    forwardRef(() => ReviewsModule),
  ],
  providers: [VoteReviewResolver, VoteReviewService],
  exports: [VoteReviewService],
})
export class VoteReviewModule {}
