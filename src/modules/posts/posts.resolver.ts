import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import Posts from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { TripsService } from 'modules/trips/trips.service';
import { AccountsService } from 'modules/accounts/accounts.service';
import Trips from 'modules/trips/entities/trip.entity';
import Accounts from 'modules/accounts/entities/account.entity';

@Resolver(() => Posts)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly tripsService: TripsService,
    private readonly accountsService: AccountsService,
  ) {}

  @ResolveField('trip', () => Trips)
  async getTrip(@Parent() post: Posts) {
    return await this.tripsService.findById(post.tripId);
  }

  @ResolveField('author', () => Accounts)
  async getAuthor(@Parent() post: Posts) {
    return await this.accountsService.findById(post.authorId);
  }

  @Mutation(() => Posts)
  @UseGuards(JwtAuthGuard)
  async createPost(@Args('input') input: CreatePostInput, @Context() ctx: any) {
    const { id } = ctx.req.user;
    return await this.postsService.create({ ...input, authorId: id });
  }

  @Query(() => [Posts])
  async posts() {
    return await this.postsService.finds();
  }
}
