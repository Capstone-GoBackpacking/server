import { Test, TestingModule } from '@nestjs/testing';
import { TagHobbyService } from './tag-hobby.service';

describe('TagHobbyService', () => {
  let service: TagHobbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TagHobbyService],
    }).compile();

    service = module.get<TagHobbyService>(TagHobbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
