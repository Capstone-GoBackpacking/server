import { Query, Resolver } from '@nestjs/graphql';
import { TagHobbyService } from './tag-hobby.service';
import TagHobby from './entities/tag-hobby.entity';

@Resolver(() => TagHobby)
export class TagHobbyResolver {
  constructor(private readonly tagHobbyService: TagHobbyService) {}

  @Query(() => [TagHobby])
  async tagHobbies() {
    return await this.tagHobbyService.finds();
  }
}
