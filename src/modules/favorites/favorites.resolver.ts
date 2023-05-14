import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import Favorites from './entities/favorite.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { LocationsService } from 'modules/locations/locations.service';

@Resolver(() => Favorites)
export class FavoritesResolver {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly locationsService: LocationsService,
  ) {}

  @Mutation(() => Favorites)
  @UseGuards(JwtAuthGuard)
  async favoriting(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    const favo = await this.favoritesService.create(id, input);
    await this.locationsService.updateFavorite(input, 1);
    return favo;
  }

  @Mutation(() => String)
  @UseGuards(JwtAuthGuard)
  async unFavorite(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    const favo = await this.favoritesService.unFavorite(id, input);
    await this.locationsService.updateFavorite(input, -1);
    return favo;
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async isFavoriting(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return await this.favoritesService.isFavoriting(id, input);
  }
}
