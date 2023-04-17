import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import LocationImages from './entities/location-image.entity';

@Injectable()
export class LocationImagesService {
  constructor(
    @InjectModel(LocationImages)
    private readonly locationImageModel: typeof LocationImages,
  ) {}

  async findByLocation(locationId: string): Promise<LocationImages[]> {
    return await this.locationImageModel.findAll({
      where: {
        locationId,
      },
    });
  }

  async create({
    locationId,
    images,
  }: {
    locationId: string;
    images: string | string[];
  }) {
    if (Array.isArray(images)) {
      return Promise.all(
        images.map(
          async (image) =>
            await this.locationImageModel.create({
              locationId,
              url: image,
            }),
        ),
      );
    }
    if (typeof images === 'string') {
      return await this.locationImageModel.create({
        locationId,
        url: images,
      });
    }
  }
}
