import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Profiles from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profiles)
    private readonly profileModel: typeof Profiles
  ) { }

  async finds(): Promise<Profiles[]> {
    return await this.profileModel.findAll()
  }
}
