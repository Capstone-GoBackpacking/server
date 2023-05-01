import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { JwtAuthGuard } from 'common/guards/jwt-auth.guard';
import { AccountsService } from 'modules/accounts/accounts.service';
import Accounts from 'modules/accounts/entities/account.entity';
import Posts from 'modules/posts/entities/post.entity';
import { PostsService } from 'modules/posts/posts.service';
import { CommentsService } from './comments.service';
import { CreateCommentInput } from './dto/create-comment.input';
import Comments from './entities/comment.entity';

@Resolver(() => Comments)
export class CommentsResolver {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly accountsService: AccountsService,
    private readonly postsService: PostsService,
  ) {}

  @ResolveField('author', () => Accounts)
  async getAuthor(@Parent() comment: Comments) {
    return await this.accountsService.findById(comment.authorId);
  }

  @ResolveField('post', () => Posts)
  async getPost(@Parent() comment: Comments) {
    return await this.postsService.findById(comment.postId);
  }

  @Mutation(() => Comments)
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Args('input') input: CreateCommentInput,
    @Context() ctx: any,
  ) {
    const { id } = ctx.req.user;
    return await this.commentsService.create({ ...input, authorId: id });
  }

  @Query(() => [Comments])
  async comments() {
    return await this.commentsService.finds();
  }
}
