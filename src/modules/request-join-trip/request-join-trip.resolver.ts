import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { RequestJoinTripService } from './request-join-trip.service';
import RequestJoinTrip from './entities/request-join-trip.entity';
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';

@Resolver(() => RequestJoinTrip)
export class RequestJoinTripResolver {
  constructor(
    private readonly requestJoinTripService: RequestJoinTripService,
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

  @Mutation(() => RequestJoinTrip)
  @UseGuards(JwtAuthGuard)
  async joinTrip(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    if (await this.requestJoinTripService.isJoined(input, id)) {
      throw new HttpException('You are joined', HttpStatus.FORBIDDEN);
    }
    return await this.requestJoinTripService.create(input, id);
  }

  @Query(() => [RequestJoinTrip])
  async requestJoinTrips() {
    return await this.requestJoinTripService.finds();
  }
}
