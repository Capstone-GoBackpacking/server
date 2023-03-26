import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Comments from 'modules/comments/entities/comment.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  ForeignKey,
  DataType,
  AllowNull,
  BelongsTo
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Replies', timestamps: false })
export default class Replies extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING(500)
  })
  content: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  time: string;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  authorId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  author: Accounts;

  @Field()
  @ForeignKey(() => Comments)
  @Column
  commentId: string;

  @Field(() => Comments)
  @BelongsTo(() => Comments)
  comment: Comments;
}
