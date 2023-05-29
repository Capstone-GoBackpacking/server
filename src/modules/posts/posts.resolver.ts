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
import Comments from 'modules/comments/entities/comment.entity';
import { CommentsService } from 'modules/comments/comments.service';
import { PostImagesService } from 'modules/post-images/post-images.service';
import PostImages from 'modules/post-images/entities/post-image.entity';

@Resolver(() => Posts)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly tripsService: TripsService,
    private readonly accountsService: AccountsService,
    private readonly commentsService: CommentsService,
    private readonly postImagesService: PostImagesService,
  ) {}

  @ResolveField('comments', () => [Comments])
  async getComments(@Parent() post: Posts) {
    return await this.commentsService.findsByPost(post.id);
  }

  @ResolveField('images', () => [PostImages])
  async getImages(@Parent() post: Posts) {
    return await this.postImagesService.getByPost(post.id);
  }

  @Query(() => [Posts])
  async postsOfTrip(@Args('input') input: string) {
    return await this.postsService.findsByTrip(input);
  }

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
    const post = await this.postsService.create({ ...input, authorId: id });
    if (Array.isArray(input.images) && input.images.length > 0) {
      await Promise.all(
        input.images.map(async (image) => {
          await this.postImagesService.create({
            postId: post.id,
            url: image,
          });
        }),
      );
    }
    return post;
  }

  @Query(() => [Posts])
  async posts() {
    return await this.postsService.finds();
  }
}
