import { Module } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesResolver } from './types.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Types from './entities/type.entity';

@Module({
  imports: [SequelizeModule.forFeature([Types])],
  providers: [TypesResolver, TypesService],
  exports: [TypesService]
})
export class TypesModule { }
