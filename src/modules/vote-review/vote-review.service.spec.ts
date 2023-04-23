import { Test, TestingModule } from '@nestjs/testing';
import { VoteReviewService } from './vote-review.service';

describe('VoteReviewService', () => {
  let service: VoteReviewService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteReviewService],
    }).compile();

    service = module.get<VoteReviewService>(VoteReviewService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
