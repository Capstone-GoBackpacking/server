import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Locations from './entities/location.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Locations)
    private readonly locationModel: typeof Locations
  ) { }

  async finds(): Promise<Locations[]> {
    return await this.locationModel.findAll()
  }
}
