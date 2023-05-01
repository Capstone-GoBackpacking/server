import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Comments from 'modules/comments/entities/comment.entity';
import PostTag from 'modules/post-tag/entities/post-tag.entity';
import Tags from 'modules/tags/entities/tag.entity';
import Trips from 'modules/trips/entities/trip.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  ForeignKey,
  DataType,
  AllowNull,
  BelongsTo,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Posts', timestamps: false })
export default class Posts extends Model {
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
    type: DataType.STRING(30),
  })
  title: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.STRING(500),
  })
  content?: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
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

  @Field(() => [Tags])
  @BelongsToMany(() => Tags, () => PostTag)
  tags: Tags[];

  @Field(() => [Comments])
  @HasMany(() => Comments)
  comments: Comments[];

  @Field()
  @AllowNull(false)
  @ForeignKey(() => Trips)
  @Column
  tripId: string;

  @Field(() => Trips)
  @BelongsTo(() => Trips)
  trip: Trips;
}
