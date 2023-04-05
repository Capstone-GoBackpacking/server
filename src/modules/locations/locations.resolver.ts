import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import Locations from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';

@Resolver(() => Locations)
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => Locations)
  async createLocation(@Args('input') input: CreateLocationInput) {
    return await this.locationsService.create(input);
  }

  @Query(() => [Locations])
  async locations() {
    return await this.locationsService.finds();
  }
}
