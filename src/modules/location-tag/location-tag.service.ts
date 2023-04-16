import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import LocationTag from './entities/location-tag.entity';

@Injectable()
export class LocationTagService {
  constructor(
    @InjectModel(LocationTag)
    private readonly locationTagModel: typeof LocationTag,
  ) {}

  async finds(): Promise<LocationTag[]> {
    return await this.locationTagModel.findAll();
  }
}
