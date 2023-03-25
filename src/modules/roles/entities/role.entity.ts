import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import {
  Table,
  Column,
  PrimaryKey,
  DataType,
  AllowNull,
  Unique,
  Model,
  HasMany
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Roles', timestamps: false })
export default class Roles extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(20)
  })
  name: string;

  @Field(() => [Accounts])
  @HasMany(() => Accounts)
  accounts: Accounts[];
}
