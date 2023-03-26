import { Resolver, Query } from '@nestjs/graphql';
import { CommentsService } from './comments.service';
import Comments from './entities/comment.entity';

@Resolver(() => Comments)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) { }

  @Query(() => [Comments])
  async comments() {
    return await this.commentsService.finds()
  }
}
