import { forwardRef, Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Reviews from './entities/review.entity';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { LocationsModule } from 'modules/locations/locations.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Reviews]),
    forwardRef(() => AccountsModule),
    forwardRef(() => LocationsModule),
  ],
  providers: [ReviewsResolver, ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
