import { forwardRef, Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Comments from './entities/comment.entity';
import { AccountsModule } from 'modules/accounts/accounts.module';
import { PostsModule } from 'modules/posts/posts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Comments]),
    forwardRef(() => AccountsModule),
    forwardRef(() => PostsModule),
  ],
  providers: [CommentsResolver, CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
