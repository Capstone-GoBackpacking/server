import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { TypesService } from './types.service';
import Types from './entities/type.entity';
import Trips from 'modules/trips/entities/trip.entity';
import { TripsService } from 'modules/trips/trips.service';
import Tags from 'modules/tags/entities/tag.entity';

@Resolver(() => Types)
export class TypesResolver {
  constructor(
    private readonly typesService: TypesService,
    private readonly tripsService: TripsService,
  ) {}

  @ResolveField('tags', () => [Tags])
  async getTags(@Parent() type: Types) {
    return await this.typesService.findTags(type.id);
  }

  @ResolveField('trips', () => [Trips])
  async getTrips(@Parent() type: Types) {
    return await this.tripsService.findsByType(type.id);
  }

  @Query(() => [Types])
  async types() {
    return await this.typesService.finds();
  }
}
