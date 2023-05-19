import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AccountsService } from 'modules/accounts/accounts.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountsService: AccountsService,
  ) {}

  @Post()
  async create(@Body() body: any) {
    return await this.authService.register(body);
  }

  @Post('/login/admin')
  async adminLogin(@Body() body: { email: string; password: string }) {
    const account = await this.accountsService.findOneByEmail(body.email);
    if (account) {
      if (
        await this.authService.comparePassword(body.password, account.password)
      ) {
        return await this.authService.adminLogin(account);
      } else {
        throw new HttpException('Unauthorizaion', HttpStatus.FORBIDDEN);
      }
    } else {
      throw new HttpException('Unauthorizaion', HttpStatus.FORBIDDEN);
    }
  }
}
