import { Module, forwardRef } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Locations from './entities/location.entity';
import { TripsModule } from 'modules/trips/trips.module';
import { ReviewsModule } from 'modules/reviews/reviews.module';
import { LocationImagesModule } from 'modules/location-images/location-images.module';
import { LocationsController } from './locations.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Locations]),
    forwardRef(() => TripsModule),
    forwardRef(() => ReviewsModule),
    forwardRef(() => LocationImagesModule),
  ],
  providers: [LocationsResolver, LocationsService],
  exports: [LocationsService],
  controllers: [LocationsController],
})
export class LocationsModule {}
