import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Locations from 'modules/locations/entities/location.entity';
import {
  Table,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  Column,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'favorites', timestamps: false })
export default class Favorites extends Model {
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

  @Field()
  @ForeignKey(() => Locations)
  @Column
  locationId: string;
}
