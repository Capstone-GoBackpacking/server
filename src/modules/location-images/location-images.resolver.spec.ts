import { Test, TestingModule } from '@nestjs/testing';
import { LocationImagesResolver } from './location-images.resolver';
import { LocationImagesService } from './location-images.service';

describe('LocationImagesResolver', () => {
  let resolver: LocationImagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationImagesResolver, LocationImagesService],
    }).compile();

    resolver = module.get<LocationImagesResolver>(LocationImagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
