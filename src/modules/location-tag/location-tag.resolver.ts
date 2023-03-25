import { Resolver, Query } from '@nestjs/graphql';
import { LocationTagService } from './location-tag.service';
import LocationTag from './entities/location-tag.entity';

@Resolver(() => LocationTag)
export class LocationTagResolver {
  constructor(private readonly locationTagService: LocationTagService) { }

  @Query(() => [LocationTag])
  async locationTags() {
    return await this.locationTagService.finds()
  }
}
