import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Trips from './entities/trip.entity';
import { Op } from 'sequelize';
import Accounts from 'modules/accounts/entities/account.entity';

interface ICreate {
  name: string;
  description?: string;
  timeEnd: string;
  timeStart: string;
  slot: number;
  locationStartId: string;
  locationEndId: string;
  hostId: string;
  typeId: string;
  distance: number;
}

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trips)
    private readonly tripModel: typeof Trips,
  ) {}

  async findById(id: string): Promise<Trips | null> {
    return await this.tripModel.findByPk(id);
  }

  async findsJoinedMember(tripId: string) {
    return await this.tripModel
      .findOne({
        where: {
          id: tripId,
        },
        include: { model: Accounts, as: 'joinedMember' },
      })
      .then((res) => res?.joinedMember);
  }

  async joinTrip(tripId: string, accountId: string) {
    const trip = await this.tripModel.findByPk(tripId);
    if (!trip) {
      throw new HttpException('Invalid', HttpStatus.BAD_REQUEST);
    }
    await trip.addJoinedMember(accountId);
    return trip;
  }

  async findsByHost(hostId: string): Promise<Trips[]> {
    return await this.tripModel.findAll({
      where: {
        hostId,
      },
    });
  }

  async findsByType(typeId: string): Promise<Trips[]> {
    return await this.tripModel.findAll({
      where: {
        typeId,
      },
    });
  }

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
    timeEnd,
    timeStart,
    slot,
    locationEndId,
    locationStartId,
    hostId,
    typeId,
    distance,
  }: ICreate): Promise<Trips> {
    return await this.tripModel.create({
      name,
      description,
      timeEnd,
      timeStart,
      slot,
      locationEndId,
      locationStartId,
      hostId,
      typeId,
      distance,
    });
  }

  async finds(): Promise<Trips[]> {
    return await this.tripModel.findAll();
  }
}
