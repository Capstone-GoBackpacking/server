import { Module } from '@nestjs/common';
import { AccountHobbyService } from './account-hobby.service';
import { AccountHobbyResolver } from './account-hobby.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import AccountHobby from './entities/account-hobby.entity';

@Module({
  imports: [SequelizeModule.forFeature([AccountHobby])],
  providers: [AccountHobbyResolver, AccountHobbyService],
  exports: [AccountHobbyService]
})
export class AccountHobbyModule { }
