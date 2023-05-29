import { Test, TestingModule } from '@nestjs/testing';
import { PostImagesResolver } from './post-images.resolver';
import { PostImagesService } from './post-images.service';

describe('PostImagesResolver', () => {
  let resolver: PostImagesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostImagesResolver, PostImagesService],
    }).compile();

    resolver = module.get<PostImagesResolver>(PostImagesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
