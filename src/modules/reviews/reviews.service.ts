import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Reviews from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews)
    private readonly reviewModel: typeof Reviews,
  ) {}

  async findById(id: string): Promise<Reviews | null> {
    return await this.reviewModel.findByPk(id);
  }

  async findsByLocation(locationId: string): Promise<Reviews[]> {
    return await this.reviewModel.findAll({
      where: {
        locationId,
      },
    });
  }

  async findsByHost(hostId: string): Promise<Reviews[]> {
    return await this.reviewModel.findAll({
      where: {
        hostId,
      },
    });
  }

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

  async finds(): Promise<Reviews[]> {
    return await this.reviewModel.findAll();
  }
}
