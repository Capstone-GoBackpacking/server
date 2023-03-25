import { Resolver, Query } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import Profiles from './entities/profile.entity';

@Resolver(() => Profiles)
export class ProfilesResolver {
  constructor(private readonly profilesService: ProfilesService) { }

  @Query(() => [Profiles])
  async profiles() {
    return await this.profilesService.finds()
  }
}
