import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Locations from './entities/location.entity';
import { EStatus } from 'common/types/enums';
import Tags from 'modules/tags/entities/tag.entity';

interface ICreate {
  name: string;
  address: string;
  description?: string;
  status?: string;
  lng: string;
  lat: string;
  tags: string[];
}

@Injectable()
export class LocationsService {
  constructor(
    @InjectModel(Locations)
    private readonly locationModel: typeof Locations,
  ) {}

  async findsTag(locationId: string) {
    return await this.locationModel
      .findOne({
        where: {
          id: locationId,
        },
        include: {
          model: Tags,
          as: 'tags',
        },
      })
      .then((res) => res?.tags);
  }

  async findById(id: string): Promise<Locations | null> {
    return await this.locationModel.findByPk(id);
  }

  async create(body: ICreate): Promise<Locations> {
    const location = await this.locationModel.create({
      name: body.name,
      address: body.address,
      description: body.description,
      status: body.status,
      lng: body.lng,
      lat: body.lat,
    });
    if (body.tags) {
      await location.addTags(body.tags);
    }
    return location;
  }

  async finds(): Promise<Locations[]> {
    return await this.locationModel.findAll({
      where: {
        status: EStatus.enable,
      },
    });
  }
}
