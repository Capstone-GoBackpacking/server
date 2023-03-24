import { Test, TestingModule } from '@nestjs/testing';
import { AccountHobbyService } from './account-hobby.service';

describe('AccountHobbyService', () => {
  let service: AccountHobbyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountHobbyService],
    }).compile();

    service = module.get<AccountHobbyService>(AccountHobbyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
