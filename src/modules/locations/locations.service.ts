import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Locations from './entities/location.entity';
import { EStatus } from 'common/types/enums';
import Tags from 'modules/tags/entities/tag.entity';
import { Op } from 'sequelize';

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

  async updateFavorite(locationId: string, num: number) {
    const location = await this.locationModel.findByPk(locationId);
    if (location) {
      await this.locationModel.update(
        {
          favoriteNumber: location?.favoriteNumber + num,
        },
        {
          where: { id: locationId },
        },
      );
      return 'Update Success!';
    }
    return null;
  }

  async topFavorite(top: number, direction: 'asc' | 'desc') {
    return await this.locationModel.findAll({
      limit: top,
      order: [['favoriteNumber', direction]],
    });
  }

  async search(options: any) {
    const { name = '', tagIds = [] } = options;
    return await this.locationModel.findAll({
      where: {
        name: { [Op.like]: `%${name}%` },
      },
      include: {
        model: Tags,
        where: {
          id: tagIds,
        },
      },
    });
  }

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

  async deleteById(id: string) {
    await this.locationModel.destroy({
      where: {
        id,
      },
    });
    return 'Delete Success!';
  }

  async update(id: string, data: any) {
    return await this.locationModel.update(
      {
        ...data,
      },
      {
        where: {
          id,
        },
      },
    );
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
      include: {
        model: Tags,
        as: 'tags',
      },
    });
  }
}
