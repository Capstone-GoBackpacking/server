import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Trips from 'modules/trips/entities/trip.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  ForeignKey,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'RequestJoinTrip', timestamps: false })
export default class RequestJoinTrip extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @ForeignKey(() => Trips)
  @Column
  tripId: string;

  @Field(() => Trips)
  @BelongsTo(() => Trips)
  trip: Trips;

  @Field()
  @ForeignKey(() => Accounts)
  @Column
  memberId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  member: Accounts;

  @Field(() => Boolean)
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  verify: boolean;
}
