import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import Locations from './entities/location.entity';
import { CreateLocationInput } from './dto/create-location.input';
import { TripsService } from 'modules/trips/trips.service';
import Trips from 'modules/trips/entities/trip.entity';
import Tags from 'modules/tags/entities/tag.entity';

@Resolver(() => Locations)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly tripsService: TripsService,
  ) {}

  @ResolveField('trips', () => [Trips])
  async getTrips(@Parent() location: Locations) {
    return await this.tripsService.findsByLocation(location.id);
  }

  @ResolveField('tags', () => [Tags])
  async getTags(@Parent() location: Locations) {
    return await Locations.findOne({
      where: {
        id: location.id,
      },
      include: Tags,
    }).then((res: any) => res.tags);
  }

  @Query(() => Locations)
  async getLocationById(@Args('id') id: string) {
    return await this.locationsService.findById(id);
  }

  @Mutation(() => Locations)
  async createLocation(@Args('input') input: CreateLocationInput) {
    return await this.locationsService.create(input);
  }

  @Query(() => [Locations])
  async locations() {
    return await this.locationsService.finds();
  }
}
