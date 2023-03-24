import { Test, TestingModule } from '@nestjs/testing';
import { GendersResolver } from './genders.resolver';
import { GendersService } from './genders.service';

describe('GendersResolver', () => {
  let resolver: GendersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GendersResolver, GendersService],
    }).compile();

    resolver = module.get<GendersResolver>(GendersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
