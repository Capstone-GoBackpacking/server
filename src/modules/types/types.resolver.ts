import { Resolver, Query } from '@nestjs/graphql';
import { TypesService } from './types.service';
import Types from './entities/type.entity';

@Resolver(() => Types)
export class TypesResolver {
  constructor(private readonly typesService: TypesService) { }

  @Query(() => [Types])
  async types() {
    return await this.typesService.finds()
  }
}
