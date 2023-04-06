import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Trips from './entities/trip.entity';
import { Op } from 'sequelize';

interface ICreate {
  name: string;
  description?: string;
  numberMembers: number;
  timeEnd: string;
  timeStart: string;
  meetingLng: string;
  meetingLat: string;
  slot: number;
  locationStartId: string;
  locationEndId: string;
  hostId: string;
  typeId: string;
}

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trips)
    private readonly tripModel: typeof Trips,
  ) {}

  async findsByLocation(locationId: string): Promise<Trips[]> {
    return await this.tripModel.findAll({
      where: {
        [Op.or]: [
          { locationEndId: locationId },
          { locationStartId: locationId },
        ],
      },
    });
  }

  async create({
    name,
    description,
    numberMembers,
    timeEnd,
    timeStart,
    meetingLat,
    meetingLng,
    slot,
    locationEndId,
    locationStartId,
    hostId,
    typeId,
  }: ICreate) {
    return await this.tripModel.create({
      name,
      description,
      numberMembers,
      timeEnd,
      timeStart,
      meetingLat,
      meetingLng,
      slot,
      locationEndId,
      locationStartId,
      hostId,
      typeId,
    });
  }

  async finds(): Promise<Trips[]> {
    return await this.tripModel.findAll();
  }
}
