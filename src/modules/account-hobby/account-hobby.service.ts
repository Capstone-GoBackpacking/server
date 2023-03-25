import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import AccountHobby from './entities/account-hobby.entity';

@Injectable()
export class AccountHobbyService {
  constructor(
    @InjectModel(AccountHobby)
    private readonly accountHobbyModel: typeof AccountHobby
  ) { }

  async finds(): Promise<AccountHobby[]> {
    return await this.accountHobbyModel.findAll()
  }
}
