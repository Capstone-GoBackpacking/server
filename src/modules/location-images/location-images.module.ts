import { forwardRef, Module } from '@nestjs/common';
import { LocationImagesService } from './location-images.service';
import { LocationImagesResolver } from './location-images.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import LocationImages from './entities/location-image.entity';
import { LocationsModule } from 'modules/locations/locations.module';

@Module({
  imports: [
    SequelizeModule.forFeature([LocationImages]),
    forwardRef(() => LocationsModule),
  ],
  providers: [LocationImagesResolver, LocationImagesService],
  exports: [LocationImagesService],
})
export class LocationImagesModule {}
