import { forwardRef, Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResolver } from './favorites.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Favorites from './entities/favorite.entity';
import { LocationsModule } from 'modules/locations/locations.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Favorites]),
    forwardRef(() => LocationsModule),
  ],
  providers: [FavoritesResolver, FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
