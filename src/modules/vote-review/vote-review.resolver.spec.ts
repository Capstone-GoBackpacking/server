import { Test, TestingModule } from '@nestjs/testing';
import { VoteReviewResolver } from './vote-review.resolver';
import { VoteReviewService } from './vote-review.service';

describe('VoteReviewResolver', () => {
  let resolver: VoteReviewResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoteReviewResolver, VoteReviewService],
    }).compile();

    resolver = module.get<VoteReviewResolver>(VoteReviewResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
