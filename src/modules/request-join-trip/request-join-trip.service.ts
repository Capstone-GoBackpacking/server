import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import RequestJoinTrip from './entities/request-join-trip.entity';

@Injectable()
export class RequestJoinTripService {
  constructor(
    @InjectModel(RequestJoinTrip)
    private readonly requestJoinTripModel: typeof RequestJoinTrip
  ) { }

  async finds(): Promise<RequestJoinTrip[]> {
    return await this.requestJoinTripModel.findAll()
  }
}
