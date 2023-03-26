import { Test, TestingModule } from '@nestjs/testing';
import { RequestJoinTripResolver } from './request-join-trip.resolver';
import { RequestJoinTripService } from './request-join-trip.service';

describe('RequestJoinTripResolver', () => {
  let resolver: RequestJoinTripResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestJoinTripResolver, RequestJoinTripService],
    }).compile();

    resolver = module.get<RequestJoinTripResolver>(RequestJoinTripResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
