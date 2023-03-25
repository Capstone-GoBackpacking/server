import { Test, TestingModule } from '@nestjs/testing';
import { LocationTagService } from './location-tag.service';

describe('LocationTagService', () => {
  let service: LocationTagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationTagService],
    }).compile();

    service = module.get<LocationTagService>(LocationTagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
