import { ObjectType, Field, ID } from '@nestjs/graphql';
import Posts from 'modules/posts/entities/post.entity';
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'PostImages', timestamps: false })
export default class PostImages extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  url: string;

  @Field()
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  time: string;

  @Field()
  @ForeignKey(() => Posts)
  @Column
  postId: string;
}
