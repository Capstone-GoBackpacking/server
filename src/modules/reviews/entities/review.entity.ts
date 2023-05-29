import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Locations from 'modules/locations/entities/location.entity';
import VoteReview from 'modules/vote-review/entities/vote-review.entity';
import {
  Model,
  Table,
  Column,
  PrimaryKey,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Reviews', timestamps: false })
export default class Reviews extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @Column({
    type: DataType.STRING(500),
  })
  content: string;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  hostId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  host: Accounts;

  @Field()
  @ForeignKey(() => Locations)
  @Column
  locationId: string;

  @Field(() => Locations)
  @BelongsTo(() => Locations)
  location: Locations;

  @Field(() => [VoteReview])
  @HasMany(() => VoteReview)
  voteReviews: VoteReview[];

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  time: string;
}
