import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import RequestJoinTrip from './entities/request-join-trip.entity';

@Injectable()
export class RequestJoinTripService {
  constructor(
    @InjectModel(RequestJoinTrip)
    private readonly requestJoinTripModel: typeof RequestJoinTrip,
  ) {}

  async isJoined(tripId: string, memberId: string): Promise<boolean> {
    const joined = await this.requestJoinTripModel.findOne({
      where: {
        tripId,
        memberId,
        verify: true,
      },
    });
    return joined !== null;
  }

  async finds(
    tripId?: string,
    memberId?: string,
  ): Promise<RequestJoinTrip[] | RequestJoinTrip | null> {
    if (tripId && memberId) {
      return await this.requestJoinTripModel.findOne({
        where: {
          tripId,
          memberId,
        },
      });
    }
    if (!tripId && !memberId) {
      return await this.requestJoinTripModel.findAll();
    }

    if (tripId || memberId) {
      return await this.requestJoinTripModel.findOne({
        where: {
          ...(tripId && { tripId }),
          ...(memberId && { memberId }),
        },
      });
    }

    return null;
  }

  async create(tripId: string, memberId: string): Promise<RequestJoinTrip> {
    return await this.requestJoinTripModel.create({
      tripId,
      memberId,
    });
  }
}
