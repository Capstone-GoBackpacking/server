import { Test, TestingModule } from '@nestjs/testing';
import { TagTypeService } from './tag-type.service';

describe('TagTypeService', () => {
  let service: TagTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagTypeService],
    }).compile();

    service = module.get<TagTypeService>(TagTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
