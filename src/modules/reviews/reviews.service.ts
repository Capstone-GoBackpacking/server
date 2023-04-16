import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Reviews from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewModel: typeof Reviews,
  ) {}

  async create({
    hostId,
    locationId,
    content,
  }: {
    [key: string]: string;
  }): Promise<Reviews> {
    return await this.reviewModel.create({
      hostId,
      locationId,
      content,
    });
  }
}
