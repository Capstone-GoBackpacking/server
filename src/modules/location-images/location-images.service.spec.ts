import { Test, TestingModule } from '@nestjs/testing';
import { LocationImagesService } from './location-images.service';

describe('LocationImagesService', () => {
  let service: LocationImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationImagesService],
    }).compile();

    service = module.get<LocationImagesService>(LocationImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
