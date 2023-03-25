import { Resolver, Query } from '@nestjs/graphql';
import { TripsService } from './trips.service';
import Trips from './entities/trip.entity';

@Resolver(() => Trips)
export class TripsResolver {
  constructor(private readonly tripsService: TripsService) { }

  @Query(() => [Trips])
  async trips() {
    return await this.tripsService.finds()
  }
}
