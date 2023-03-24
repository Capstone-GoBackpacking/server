import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import Profiles from './entities/profile.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Profiles])],
  providers: [ProfilesResolver, ProfilesService],
  exports: [ProfilesService]
})
export class ProfilesModule { }
