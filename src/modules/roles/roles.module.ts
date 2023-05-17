import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesController } from './roles.controller';
import Roles from './entities/role.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([Roles])
  ],
  providers: [RolesResolver, RolesService],
  exports: [RolesService],
  controllers: [RolesController]
})
export class RolesModule { }
