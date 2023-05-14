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

  async unFavorite(accountId: string, locationId: string) {
    await this.favoriteModel.destroy({
      where: {
        locationId,
        accountId,
      },
    });
    return 'UnFavorite Success!';
  }

  async isFavoriting(accountId: string, locationId: string): Promise<boolean> {
    const favorite = await this.favoriteModel.findOne({
      where: {
        accountId,
        locationId,
      },
    });
    if (favorite) {
      return true;
    } else {
      return false;
    }
  }
}
