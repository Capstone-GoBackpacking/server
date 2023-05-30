import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Trips from 'modules/trips/entities/trip.entity';
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

  async findsByMember(memberId: string, verify: boolean) {
    return (
      await this.requestJoinTripModel.findAll({
        where: {
          memberId,
          verify,
        },
        include: {
          model: Trips,
        },
      })
    ).map((item) => item.trip);
  }

  async findsByTrip(tripId: string, verify: boolean) {
    return await this.requestJoinTripModel.findAll({
      where: {
        tripId,
        verify,
      },
    });
  }

  async myRequest(hostId: string) {
    return await this.requestJoinTripModel.findAll({
      include: {
        model: Trips,
        where: {
          hostId,
        },
      },
    });
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

  async accept(id: string) {
    await this.requestJoinTripModel.update(
      {
        verify: true,
      },
      {
        where: {
          id,
        },
      },
    );
    return 'verify';
  }

  async denied(id: string) {
    await this.requestJoinTripModel.destroy({
      where: {
        id,
      },
    });
    return 'denied';
  }
}
