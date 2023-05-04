import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Context,
} from '@nestjs/graphql';
import { TripsService } from './trips.service';
import Trips from './entities/trip.entity';
import { CreateTripInput } from './dto/create-trip.input';
import { LocationsService } from 'modules/locations/locations.service';
import Locations from 'modules/locations/entities/location.entity';
import Types from 'modules/types/entities/type.entity';
import { TypesService } from 'modules/types/types.service';
import Accounts from 'modules/accounts/entities/account.entity';
import { AccountsService } from 'modules/accounts/accounts.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { distanceCal } from 'common/utils/distance';
import { RequestJoinTripService } from 'modules/request-join-trip/request-join-trip.service';
import Posts from 'modules/posts/entities/post.entity';
import { PostsService } from 'modules/posts/posts.service';
import { GenerateTemplateInput } from './dto/generate-template.input';
import { TagHobbyService } from 'modules/tag-hobby/tag-hobby.service';

@Resolver(() => Trips)
export class TripsResolver {
  constructor(
    private readonly tripsService: TripsService,
    private readonly locationsService: LocationsService,
    private readonly typesService: TypesService,
    private readonly accountsService: AccountsService,
    private readonly requestJoinTripService: RequestJoinTripService,
    private readonly postsService: PostsService,
    private readonly tagHobbyService: TagHobbyService,
  ) {}

  @Mutation(() => [Locations])
  @UseGuards(JwtAuthGuard)
  async generateTemplate(
    @Args('input') input: GenerateTemplateInput,
    @Context() ctx: any,
  ) {
    const { id } = ctx.req.user;
    const { currentLocation, expectDistance, type } = input;
    const location = await this.locationsService.findById(currentLocation);
    if (location) {
      const locations = await this.locationsService.finds();
      const hobbies = await this.accountsService.findsMyHobbies(id);
      const matchLocations = (
        await Promise.all(
          locations.map(async (lct) => {
            if (location.id === lct.id) {
              return false;
            }
            const distance = distanceCal(
              Number(location.lat),
              Number(location.lng),
              Number(lct.lat),
              Number(lct.lng),
            );
            let match = false;
            const tags = await this.locationsService.findsTag(lct.id);
            const tagsOfType = await this.typesService.findTags(type);
            const matchTags = tags?.filter((tag) =>
              tagsOfType?.some((tagOfType) => tagOfType.id === tag.id),
            );
            if (matchTags && hobbies) {
              match = await (async () => {
                for (const tag of matchTags) {
                  for (const hobby of hobbies) {
                    if (
                      await this.tagHobbyService.findByTagHobby(
                        tag.id,
                        hobby.id,
                      )
                    ) {
                      return true;
                    }
                  }
                }
                return false;
              })();
            }
            return {
              ...lct,
              match: match && distance <= expectDistance,
            };
          }),
        )
      )
        .filter((location: any) => location.match)
        .map((location: any) => {
          delete location.dataValues.match;
          return location.dataValues;
        });

      return matchLocations;
    }
  }

  @ResolveField('posts', () => [Posts])
  async getPosts(@Parent() trip: Trips) {
    return await this.postsService.findsByTrip(trip.id);
  }

  @ResolveField('targetJoined', () => Boolean)
  @UseGuards(JwtAuthGuard)
  async targetJoined(@Parent() trip: Trips, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return this.requestJoinTripService.isJoined(trip.id, id);
  }

  @ResolveField('joinedMember', () => [Accounts])
  async getJoinedMember(@Parent() trip: Trips) {
    return await this.tripsService.findsJoinedMember(trip.id);
  }

  @ResolveField('host', () => Accounts)
  async getHost(@Parent() trip: Trips) {
    return await this.accountsService.findById(trip.hostId);
  }

  @ResolveField('type', () => Types)
  async getType(@Parent() trip: Trips) {
    return await this.typesService.findById(trip.typeId);
  }

  @ResolveField('locationEnd', () => Locations)
  async getLocationEnd(@Parent() trip: Trips) {
    return await this.locationsService.findById(trip.locationEndId);
  }

  @ResolveField('locationStart', () => Locations)
  async getLocationStart(@Parent() trip: Trips) {
    return await this.locationsService.findById(trip.locationStartId);
  }

  @Mutation(() => Trips)
  @UseGuards(JwtAuthGuard)
  async createTrip(@Args('input') input: CreateTripInput, @Context() ctx: any) {
    const { id } = ctx.req.user;
    const locationEnd = await this.locationsService.findById(
      input.locationEndId,
    );
    const locationStart = await this.locationsService.findById(
      input.locationStartId,
    );
    let distance = 0;
    if (locationEnd && locationStart) {
      distance = distanceCal(
        Number(locationEnd?.lat),
        Number(locationEnd?.lng),
        Number(locationStart?.lat),
        Number(locationStart?.lng),
      );
    }
    return await this.tripsService.create({
      ...input,
      hostId: id,
      distance,
    });
  }

  @Query(() => Trips)
  async getTripById(@Args('id') id: string) {
    return await this.tripsService.findById(id);
  }

  @Query(() => [Trips])
  async trips() {
    return await this.tripsService.finds();
  }
}
