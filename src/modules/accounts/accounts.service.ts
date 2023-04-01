import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Accounts from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private readonly accountModel: typeof Accounts,
  ) { }

  async finds() {
    return await this.accountModel.findAll();
  }

  async findOneByEmail(email: string) {
    return await this.accountModel.findOne({
      where: { email },
    });
  }

  async createNew(data: { email: string; password: string; roleId: string }) {
    let account = await this.findOneByEmail(data.email);
    if (account) {
      throw new HttpException(
        'The account already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    account = await this.accountModel.create({
      email: data.email,
      password: data.password,
      roleId: data.roleId,
    });

    return account;
  }
}
