import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Profiles from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectModel(Profiles)
    private readonly profileModel: typeof Profiles,
  ) {}

  async findByAccount(accountId: string): Promise<Profiles | null> {
    return await this.profileModel.findOne({
      where: {
        accountId,
      },
    });
  }

  async update(accountId: string, data: any) {
    await this.profileModel.update(
      {
        ...data,
      },
      {
        where: {
          accountId,
        },
      },
    );
    return 'Success';
  }

  async finds(): Promise<Profiles[]> {
    return await this.profileModel.findAll();
  }
}
