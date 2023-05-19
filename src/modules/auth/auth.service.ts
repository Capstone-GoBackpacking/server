import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AccountsService } from 'modules/accounts/accounts.service';
import * as bcrypt from 'bcrypt';
import Accounts from 'modules/accounts/entities/account.entity';
import { JwtService } from '@nestjs/jwt';
import { RolesService } from 'modules/roles/roles.service';

interface ICreate {
  email: string;
  password: string;
  role?: string;
  firstName: string;
  lastName: string;
  gender: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {}

  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async validateAccount(email: string, password: string): Promise<any> {
    const account = await this.accountsService.findOneByEmail(email);
    if (account) {
      const isMatchPassword = await this.comparePassword(
        password,
        account.password,
      );
      if (isMatchPassword) {
        const result: Partial<typeof account> = account;
        delete result.password;
        return result;
      }
    }

    return null;
  }

  async login(account: Accounts) {
    return {
      access_token: this.jwtService.sign({
        email: account.email,
        sub: account.id,
      }),
      account: account.dataValues,
    };
  }

  async adminLogin(account: Accounts) {
    const role = await this.rolesService.findById(account.roleId);
    if (role?.name === 'admin') {
      return {
        access_token: this.jwtService.sign({
          email: account.email,
          sub: account.id,
        }),
        account: account.dataValues,
      };
    } else {
      throw new HttpException('Permission denied', HttpStatus.FORBIDDEN);
    }
  }

  async register(input: ICreate) {
    const account = await this.accountsService.findOneByEmail(input.email);

    if (account) {
      throw new HttpException('Account already exists', HttpStatus.FORBIDDEN);
    }

    const role = await this.rolesService.findOneByName(
      input.role || 'backpacker',
    );

    if (role) {
      const newAccount = await this.accountsService.createNew({
        email: input.email,
        password: input.password,
        roleId: role.id,
      });
      await newAccount.createProfile({
        firstName: input.firstName,
        lastName: input.lastName,
        genderId: input.gender,
      });
      return newAccount;
    }

    return null;
  }
}
