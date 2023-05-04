import { Test, TestingModule } from '@nestjs/testing';
import { TagTypeResolver } from './tag-type.resolver';
import { TagTypeService } from './tag-type.service';

describe('TagTypeResolver', () => {
  let resolver: TagTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagTypeResolver, TagTypeService],
    }).compile();

    resolver = module.get<TagTypeResolver>(TagTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
