import { Query, Resolver } from '@nestjs/graphql';
import { TagTypeService } from './tag-type.service';
import TagType from './entities/tag-type.entity';

@Resolver(() => TagType)
export class TagTypeResolver {
  constructor(private readonly tagTypeService: TagTypeService) {}

  @Query(() => [TagType])
  async tagTypes() {
    return await this.tagTypeService.finds();
  }
}
