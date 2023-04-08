import { forwardRef, Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import Profiles from './entities/profile.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AccountsModule } from 'modules/accounts/accounts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Profiles]),
    forwardRef(() => AccountsModule),
  ],
  providers: [ProfilesResolver, ProfilesService],
  exports: [ProfilesService],
})
export class ProfilesModule {}
