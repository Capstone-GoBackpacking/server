import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import Trips from 'modules/trips/entities/trip.entity';
import Accounts from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Accounts)
    private readonly accountModel: typeof Accounts,
  ) {}

  async deleteById(accountId: string) {
    await this.accountModel.destroy({
      where: {
        id: accountId,
      },
    });
  }

  async findsMyHobbies(accountId: string) {
    return await this.accountModel
      .findOne({
        where: {
          id: accountId,
        },
        include: {
          model: Hobbies,
          as: 'hobbies',
        },
      })
      .then((res) => res?.hobbies);
  }

  async findsJoinedTrip(accountId: string) {
    return await this.accountModel
      .findOne({
        where: {
          id: accountId,
        },
        include: { model: Trips, as: 'joinedTrips' },
      })
      .then((res) => res?.joinedTrips);
  }

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

  async update(accountId: string, data: any) {
    return await this.accountModel.update(
      {
        ...data,
      },
      {
        where: {
          id: accountId,
        },
      },
    );
  }

  async asignHobbies(id: string, hobbies: string[]) {
    const account = await this.accountModel.findByPk(id);
    await account?.addHobbies(hobbies);
    return account;
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
