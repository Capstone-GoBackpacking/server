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
import { CreateTripInput, MyTripInput } from './dto/create-trip.input';
import { LocationsService } from 'modules/locations/locations.service';
import Locations from 'modules/locations/entities/location.entity';
import Types from 'modules/types/entities/type.entity';
import { TypesService } from 'modules/types/types.service';
import Accounts from 'modules/accounts/entities/account.entity';
import { AccountsService } from 'modules/accounts/accounts.service';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { distanceCal } from 'common/utils/distance';
import { RequestJoinTripService } from 'modules/request-join-trip/request-join-trip.service';
import Posts from 'modules/posts/entities/post.entity';
import { PostsService } from 'modules/posts/posts.service';
import { GenerateTemplateInput } from './dto/generate-template.input';
import { TagHobbyService } from 'modules/tag-hobby/tag-hobby.service';
import { EDesign } from 'common/types/enums';

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

  @Query(() => [Trips])
  async myTrip(@Args('input') input: MyTripInput) {
    const mytrip = await this.tripsService.findsByHost(input.accountId);
    const joinedTrips = await this.requestJoinTripService.findsByMember(
      input.accountId,
      true,
    );
    return [...mytrip, ...joinedTrips];
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async isHost(
    @Args('input') input: string,
    @Context() ctx: any,
  ): Promise<boolean> {
    const { id } = ctx.req.user;
    const trip = await this.tripsService.findById(input);
    return id === trip?.hostId;
  }

  @Query(() => [Trips])
  async searchTrips() {
    return null;
  }

  @Mutation(() => [Trips])
  @UseGuards(JwtAuthGuard)
  async generateTemplate(
    @Args('input') input: GenerateTemplateInput,
    @Context() ctx: any,
  ) {
    const { id } = ctx.req.user;
    const { currentLocation, expectDistance, type } = input;
    if (!currentLocation || !expectDistance || !type) {
      throw new HttpException('Invalid request', HttpStatus.BAD_REQUEST);
    }
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

      const results = matchLocations.map(async (lct) => {
        const locationEndId = lct.id;
        const tripName = `${location.name} - ${lct.name}`;
        const distance = distanceCal(
          Number(location.lat),
          Number(location.lng),
          Number(lct.lat),
          Number(lct.lng),
        );
        const time = new Date();
        const timeStart = time.toString();
        time.setDate(time.getDate() + 1);
        const timeEnd = time.toString();
        return this.tripsService.build({
          name: tripName,
          timeStart,
          timeEnd,
          slot: 5,
          locationEndId,
          locationStartId: location.id,
          hostId: id,
          typeId: type,
          distance,
          design: EDesign.template,
        });
      });

      return results;
    }
  }

  @ResolveField('posts', () => [Posts])
  async getPosts(@Parent() trip: Trips) {
    return await this.postsService.findsByTrip(trip.id);
  }

  @ResolveField('isHost', () => Boolean)
  @UseGuards(JwtAuthGuard)
  async targetHost(@Parent() trip: Trips, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return id === trip.hostId;
  }

  @ResolveField('targetJoined', () => Boolean)
  @UseGuards(JwtAuthGuard)
  async targetJoined(@Parent() trip: Trips, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return this.requestJoinTripService.isJoined(trip.id, id);
  }

  @ResolveField('joinedMember', () => [Accounts])
  async getJoinedMember(@Parent() trip: Trips) {
    const record = await this.tripsService.findsJoinedMember(trip.id);
    let verifys: any[] = [];
    if (record) {
      verifys = await Promise.all(
        record?.map(async (account: any) => {
          return await this.requestJoinTripService.finds(trip.id, account.id);
        }),
      );
    }
    const filter = verifys.filter((verify) => verify.verify);
    return await Promise.all(
      filter.map(async (item: any) => {
        return await this.accountsService.findById(item.memberId);
      }),
    );
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

  @Query(() => [Trips])
  async tripsOfHost(@Args('input') input: string) {
    return await this.tripsService.findsByHost(input);
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
