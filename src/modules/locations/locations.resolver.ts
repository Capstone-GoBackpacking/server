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
import { ReviewsService } from 'modules/reviews/reviews.service';
import Reviews from 'modules/reviews/entities/review.entity';
import LocationImages from 'modules/location-images/entities/location-image.entity';
import { LocationImagesService } from 'modules/location-images/location-images.service';

@Resolver(() => Locations)
export class LocationsResolver {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly tripsService: TripsService,
    private readonly reviewsService: ReviewsService,
    private readonly locationImagesService: LocationImagesService,
  ) {}

  @ResolveField('images', () => [LocationImages])
  async getImages(@Parent() location: Locations) {
    return await this.locationImagesService.findByLocation(location.id);
  }

  @ResolveField('reviews', () => [Reviews])
  async getReviews(@Parent() location: Locations) {
    return await this.reviewsService.findsByLocation(location.id);
  }

  @ResolveField('trips', () => [Trips])
  async getTrips(@Parent() location: Locations) {
    return await this.tripsService.findsByLocation(location.id);
  }

  @ResolveField('tags', () => [Tags])
  async getTags(@Parent() location: Locations) {
    return await this.locationsService.findsTag(location.id);
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
