import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { TagsService } from './tags.service';
import Tags from './entities/tag.entity';
import Hobbies from 'modules/hobbies/entities/hobby.entity';
import Types from 'modules/types/entities/type.entity';

@Resolver(() => Tags)
export class TagsResolver {
  constructor(private readonly tagsService: TagsService) {}

  @ResolveField('trips', () => [Types])
  async getTrips(@Parent() tag: Tags) {
    return await this.tagsService.findTypes(tag.id);
  }

  @ResolveField('hobbies', () => [Hobbies])
  async getHobbies(@Parent() tag: Tags) {
    return await this.tagsService.findHobbies(tag.id);
  }

  @Query(() => [Tags])
  async tags() {
    return await this.tagsService.finds();
  }
}
