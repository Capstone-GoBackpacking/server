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

@Resolver(() => Trips)
export class TripsResolver {
  constructor(
    private readonly tripsService: TripsService,
    private readonly locationsService: LocationsService,
    private readonly typesService: TypesService,
    private readonly accountsService: AccountsService,
  ) {}

  @ResolveField('joinedMember', () => [Accounts])
  async getJoinedMember(@Parent() trip: Trips) {
    return await this.tripsService.findsJoinedMember(trip.id);
  }

  @Mutation(() => Trips)
  @UseGuards(JwtAuthGuard)
  async joinTrip(@Args('input') tripId: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return await this.tripsService.joinTrip(tripId, id);
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
    return await this.tripsService.create({
      ...input,
      hostId: id,
    });
  }

  @Query(() => [Trips])
  async trips() {
    return await this.tripsService.finds();
  }
}
