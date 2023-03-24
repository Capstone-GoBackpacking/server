import { Test, TestingModule } from '@nestjs/testing';
import { HobbiesResolver } from './hobbies.resolver';
import { HobbiesService } from './hobbies.service';

describe('HobbiesResolver', () => {
  let resolver: HobbiesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HobbiesResolver, HobbiesService],
    }).compile();

    resolver = module.get<HobbiesResolver>(HobbiesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
