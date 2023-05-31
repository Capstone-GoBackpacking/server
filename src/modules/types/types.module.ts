import { Module, forwardRef } from '@nestjs/common';
import { TypesService } from './types.service';
import { TypesResolver } from './types.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Types from './entities/type.entity';
import { TripsModule } from 'modules/trips/trips.module';
import { TypesController } from './types.controller';

@Module({
  imports: [SequelizeModule.forFeature([Types]), forwardRef(() => TripsModule)],
  providers: [TypesResolver, TypesService],
  exports: [TypesService],
  controllers: [TypesController],
})
export class TypesModule {}
