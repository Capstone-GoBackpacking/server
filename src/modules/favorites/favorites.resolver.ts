import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import Favorites from './entities/favorite.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';

@Resolver(() => Favorites)
export class FavoritesResolver {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Mutation(() => Favorites)
  @UseGuards(JwtAuthGuard)
  async favoriting(@Args('input') input: string, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return await this.favoritesService.create(id, input);
  }
}
