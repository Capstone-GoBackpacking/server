import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Accounts from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private readonly accountModel: typeof Accounts
  ) { }

  async finds() {
    return await this.accountModel.findAll()
  }
}
