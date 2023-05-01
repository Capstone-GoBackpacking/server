import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Posts from 'modules/posts/entities/post.entity';
import Replies from 'modules/replies/entities/reply.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
  AllowNull,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Comments', timestamps: false })
export default class Comments extends Model {
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
    type: DataType.STRING(500),
  })
  content: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  time: string;

  @Field()
  @ForeignKey(() => Posts)
  @Column
  postId: string;

  @Field(() => Posts)
  @BelongsTo(() => Posts)
  post: Posts;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  authorId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  author: Accounts;

  @Field(() => [Replies])
  @HasMany(() => Replies)
  replies: Replies[];
}
