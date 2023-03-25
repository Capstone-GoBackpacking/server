import { Resolver, Query } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import Locations from './entities/location.entity';

@Resolver(() => Locations)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) { }

  @Query(() => [Locations])
  async locations() {
    return await this.locationsService.finds()
  }
}
