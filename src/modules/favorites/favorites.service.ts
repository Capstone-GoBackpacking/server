import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Favorites from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorites)
    private readonly favoriteModel: typeof Favorites,
  ) {}

  async create(accountId: string, locationId: string) {
    return await this.favoriteModel.create({
      locationId,
      accountId,
    });
  }
}
