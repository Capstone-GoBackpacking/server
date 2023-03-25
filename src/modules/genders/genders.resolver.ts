import { Resolver, Query } from '@nestjs/graphql';
import { GendersService } from './genders.service';
import Genders from './entities/gender.entity';

@Resolver(() => Genders)
export class GendersResolver {
  constructor(private readonly gendersService: GendersService) { }

  @Query(() => [Genders])
  async genders() {
    return await this.gendersService.finds()
  }
}
