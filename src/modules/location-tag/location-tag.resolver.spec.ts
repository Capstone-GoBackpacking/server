import { Test, TestingModule } from '@nestjs/testing';
import { LocationTagResolver } from './location-tag.resolver';
import { LocationTagService } from './location-tag.service';

describe('LocationTagResolver', () => {
  let resolver: LocationTagResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationTagResolver, LocationTagService],
    }).compile();

    resolver = module.get<LocationTagResolver>(LocationTagResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
