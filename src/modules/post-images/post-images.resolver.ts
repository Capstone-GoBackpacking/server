import { Resolver } from '@nestjs/graphql';
import PostImages from './entities/post-image.entity';

@Resolver(() => PostImages)
export class PostImagesResolver {}
