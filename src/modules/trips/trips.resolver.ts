import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { TripsService } from './trips.service';
import Trips from './entities/trip.entity';
import { CreateTripInput } from './dto/create-trip.input';
import { LocationsService } from 'modules/locations/locations.service';
import Locations from 'modules/locations/entities/location.entity';

@Resolver(() => Trips)
export class TripsResolver {
  constructor(
    private readonly tripsService: TripsService,
    private readonly locationsService: LocationsService,
  ) {}

  @ResolveField('locationEnd', () => Locations)
  async getLocationEnd(@Parent() trip: Trips) {
    return await this.locationsService.findById(trip.locationEndId);
  }

  @ResolveField('locationStart', () => Locations)
  async getLocationStart(@Parent() trip: Trips) {
    return await this.locationsService.findById(trip.locationStartId);
  }

  @Mutation(() => Trips)
  async createTrip(@Args('input') input: CreateTripInput) {
    return await this.tripsService.create(input);
  }

  @Query(() => [Trips])
  async trips() {
    return await this.tripsService.finds();
  }
}
