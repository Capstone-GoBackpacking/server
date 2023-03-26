import { Resolver, Query } from '@nestjs/graphql';
import { RequestJoinTripService } from './request-join-trip.service';
import RequestJoinTrip from './entities/request-join-trip.entity';

@Resolver(() => RequestJoinTrip)
export class RequestJoinTripResolver {
  constructor(private readonly requestJoinTripService: RequestJoinTripService) { }

  @Query(() => [RequestJoinTrip])
  async requestJoinTrips() {
    return await this.requestJoinTripService.finds()
  }
}
