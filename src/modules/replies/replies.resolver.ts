import { Resolver, Query } from '@nestjs/graphql';
import { RepliesService } from './replies.service';
import Replies from './entities/reply.entity';

@Resolver(() => Replies)
export class RepliesResolver {
  constructor(private readonly repliesService: RepliesService) { }

  @Query(() => [Replies])
  async replies() {
    return await this.repliesService.finds()
  }
}
