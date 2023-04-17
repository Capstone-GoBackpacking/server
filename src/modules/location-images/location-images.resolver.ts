import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Locations from 'modules/locations/entities/location.entity';
import { LocationsService } from 'modules/locations/locations.service';
import { CreateLocationImageInput } from './dto/create-location-image.input';
import LocationImages from './entities/location-image.entity';
import { LocationImagesService } from './location-images.service';

@Resolver(() => LocationImages)
export class LocationImagesResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly locationImagesService: LocationImagesService,
  ) {}

  @ResolveField('location', () => Locations)
  async getLocation(@Parent() locationImage: LocationImages) {
    return await this.locationsService.findById(locationImage.locationId);
  }

  @Mutation(() => LocationImages)
  async createLocationImages(@Args('input') input: CreateLocationImageInput) {
    return await this.locationImagesService.create(input);
  }
}
