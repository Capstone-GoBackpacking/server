import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Accounts from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private readonly accountModel: typeof Accounts,
  ) {}

  async findById(id: string): Promise<Accounts | null> {
    return await this.accountModel.findByPk(id);
  }

  async finds() {
    return await this.accountModel.findAll();
  }

  async findOneByEmail(email: string) {
    return await this.accountModel.findOne({
      where: { email },
    });
  }

  async createNew(data: {
    email: string;
    password: string;
    roleId: string;
  }): Promise<Accounts> {
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
