import { ObjectType, Field, ID } from '@nestjs/graphql';
import { EVote } from 'common/types/enums';
import Accounts from 'modules/accounts/entities/account.entity';
import Reviews from 'modules/reviews/entities/review.entity';
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'VoteReview', timestamps: false })
export default class VoteReview extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  accountId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  account: Accounts;

  @Field()
  @ForeignKey(() => Reviews)
  @Column
  reviewId: string;

  @Field(() => Reviews)
  @BelongsTo(() => Reviews)
  review: Reviews;

  @Field()
  @Column({
    type: DataType.ENUM(...Object.values(EVote)),
  })
  status: EVote;
}
