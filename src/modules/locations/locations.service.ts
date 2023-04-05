import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Locations from './entities/location.entity';

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

  async create(body: ICreate) {
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
    return this.locationModel.findByPk(location.id);
  }

  async finds(): Promise<Locations[]> {
    return await this.locationModel.findAll();
  }
}
