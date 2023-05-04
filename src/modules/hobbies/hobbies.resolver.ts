import { Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { HobbiesService } from './hobbies.service';
import Hobbies from './entities/hobby.entity';
import Tags from 'modules/tags/entities/tag.entity';

@Resolver(() => Hobbies)
export class HobbiesResolver {
  constructor(private readonly hobbiesService: HobbiesService) {}

  @ResolveField('tags', () => [Tags])
  async getTags(@Parent() hobby: Hobbies) {
    return await this.hobbiesService.findTags(hobby.id);
  }

  @Query(() => [Hobbies])
  async hobbies() {
    return await this.hobbiesService.finds();
  }
}
