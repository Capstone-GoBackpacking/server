import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Trips from './entities/trip.entity';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trips)
    private readonly tripModel: typeof Trips
  ) { }

  async finds(): Promise<Trips[]> {
    return await this.tripModel.findAll()
  }
}
