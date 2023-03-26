import { Test, TestingModule } from '@nestjs/testing';
import { RequestJoinTripService } from './request-join-trip.service';

describe('RequestJoinTripService', () => {
  let service: RequestJoinTripService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RequestJoinTripService],
    }).compile();

    service = module.get<RequestJoinTripService>(RequestJoinTripService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
