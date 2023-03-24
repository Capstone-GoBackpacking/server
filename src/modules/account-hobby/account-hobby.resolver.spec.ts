import { Test, TestingModule } from '@nestjs/testing';
import { AccountHobbyResolver } from './account-hobby.resolver';
import { AccountHobbyService } from './account-hobby.service';

describe('AccountHobbyResolver', () => {
  let resolver: AccountHobbyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountHobbyResolver, AccountHobbyService],
    }).compile();

    resolver = module.get<AccountHobbyResolver>(AccountHobbyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
