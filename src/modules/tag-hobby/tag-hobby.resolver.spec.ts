import { Test, TestingModule } from '@nestjs/testing';
import { TagHobbyResolver } from './tag-hobby.resolver';
import { TagHobbyService } from './tag-hobby.service';

describe('TagHobbyResolver', () => {
  let resolver: TagHobbyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagHobbyResolver, TagHobbyService],
    }).compile();

    resolver = module.get<TagHobbyResolver>(TagHobbyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
