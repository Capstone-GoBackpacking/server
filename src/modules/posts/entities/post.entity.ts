import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
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
@Table({ tableName: 'Posts', timestamps: false })
export default class Posts extends Model {
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
    type: DataType.STRING(30)
  })
  title: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.STRING(500)
  })
  content?: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW
  })
  time: string;

  @Field()
  @AllowNull(false)
  @ForeignKey(() => Accounts)
  @Column
  authorId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  author: Accounts;
}
