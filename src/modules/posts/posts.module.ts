import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import Posts from './entities/post.entity';
import { TripsModule } from 'modules/trips/trips.module';
import { AccountsModule } from 'modules/accounts/accounts.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Posts]),
    forwardRef(() => TripsModule),
    forwardRef(() => AccountsModule),
  ],
  providers: [PostsResolver, PostsService],
  exports: [PostsService],
})
export class PostsModule {}
