import { Resolver, Query } from '@nestjs/graphql';
import { HobbiesService } from './hobbies.service';
import Hobbies from './entities/hobby.entity';

@Resolver(() => Hobbies)
export class HobbiesResolver {
  constructor(private readonly hobbiesService: HobbiesService) { }

  @Query(() => [Hobbies])
  async hobbies() {
    return await this.hobbiesService.finds()
  }
}
