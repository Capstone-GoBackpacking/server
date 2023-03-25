import { Resolver, Query } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import Tags from './entities/tag.entity';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) { }

  @Query(() => [Tags])
  async tags() {
    return await this.tagsService.finds()
  }
}
