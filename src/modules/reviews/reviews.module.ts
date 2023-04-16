import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Reviews from './entities/review.entity';

@Module({
  imports: [SequelizeModule.forFeature([Reviews])],
  providers: [ReviewsResolver, ReviewsService],
  exports: [ReviewsService],
})
export class ReviewsModule {}
