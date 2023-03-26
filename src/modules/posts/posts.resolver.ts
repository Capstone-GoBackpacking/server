import { Resolver, Query } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import Posts from './entities/post.entity';

@Resolver(() => Posts)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Query(() => [Posts])
  async posts() {
    return await this.postsService.finds()
  }
}
