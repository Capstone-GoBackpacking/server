import { ObjectType, Field, ID } from '@nestjs/graphql';
import Posts from 'modules/posts/entities/post.entity';
import Tags from 'modules/tags/entities/tag.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  ForeignKey,
  DataType
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'PostTag', timestamps: false })
export default class PostTag extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @ForeignKey(() => Tags)
  @Column
  tagId: string;

  @Field()
  @ForeignKey(() => Posts)
  @Column
  postId: string;
}
