import { Resolver, Query } from '@nestjs/graphql';
import { PostTagService } from './post-tag.service';
import PostTag from './entities/post-tag.entity';

@Resolver(() => PostTag)
export class PostTagResolver {
  constructor(private readonly postTagService: PostTagService) { }

  @Query(() => [PostTag])
  async postTags() {
    return await this.postTagService.finds()
  }
}
