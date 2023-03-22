import {
  Query,
  Resolver
} from '@nestjs/graphql';
import { RolesService } from './roles.service';
import Roles from './entities/role.entity';

@Resolver(() => Roles)
export class RolesResolver {
  constructor(
    private readonly rolesService: RolesService
  ) { }

  @Query(() => [Roles])
  async roles(): Promise<Roles[]> {
    return await this.rolesService.finds()
  }
}
