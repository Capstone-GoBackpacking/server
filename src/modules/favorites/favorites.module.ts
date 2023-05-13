import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Favorites from './entities/favorite.entity';

@Module({
  imports: [SequelizeModule.forFeature([Favorites])],
  providers: [FavoritesResolver, FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
