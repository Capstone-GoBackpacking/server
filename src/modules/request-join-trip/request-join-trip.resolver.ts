import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { RequestJoinTripService } from './request-join-trip.service';
import RequestJoinTrip from './entities/request-join-trip.entity';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import Trips from 'modules/trips/entities/trip.entity';
import { TripsService } from 'modules/trips/trips.service';
import { AccountsService } from 'modules/accounts/accounts.service';
import Accounts from 'modules/accounts/entities/account.entity';

@Resolver(() => RequestJoinTrip)
export class RequestJoinTripResolver {
  constructor(
    private readonly requestJoinTripService: RequestJoinTripService,
    private readonly tripsService: TripsService,
    private readonly accountsService: AccountsService,
  ) {}

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async isJoined(
    @Args('input') input: string,
    @Context() ctx: any,
  ): Promise<boolean> {
    const { id } = ctx.req.user;
    return await this.requestJoinTripService.isJoined(input, id);
  }

  @Query(() => [RequestJoinTrip])
  @UseGuards(JwtAuthGuard)
  async myRequest(@Context() ctx: any) {
    const { id } = ctx.req.user;
    return await this.requestJoinTripService.myRequest(id);
  }

  @Mutation(() => RequestJoinTrip)
  @UseGuards(JwtAuthGuard)
  async joinTrip(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    const request = await this.requestJoinTripService.finds(input, id);
    if (!request) {
      if (await this.requestJoinTripService.isJoined(input, id)) {
        throw new HttpException('You are joined', HttpStatus.FORBIDDEN);
      }
      return await this.requestJoinTripService.create(input, id);
    } else {
      throw new HttpException('You are sended request', HttpStatus.FORBIDDEN);
    }
  }

  @ResolveField('trip', () => Trips)
  async getTrip(@Parent() request: RequestJoinTrip) {
    return await this.tripsService.findById(request.tripId);
  }

  @ResolveField('member', () => Accounts)
  async getMember(@Parent() request: RequestJoinTrip) {
    return await this.accountsService.findById(request.memberId);
  }

  @Query(() => [RequestJoinTrip])
  async requestJoinTrips() {
    return await this.requestJoinTripService.finds();
  }

  @Mutation(() => String)
  async acceptJoin(@Args('input') input: string) {
    return await this.requestJoinTripService.accept(input);
  }

  @Mutation(() => String)
  async deniedJoin(@Args('input') input: string) {
    return await this.requestJoinTripService.denied(input);
  }
}
