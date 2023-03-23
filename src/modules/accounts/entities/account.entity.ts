import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  Unique,
  AllowNull
} from 'sequelize-typescript';
import { EAccountStatus } from '../types';

@ObjectType()
@Table({ tableName: 'Accounts', timestamps: false })
export default class Accounts extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @Unique(true)
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
  email: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  password: string;

  @Field()
  @Column({
    type: DataType.ENUM(...Object.values(EAccountStatus)),
    defaultValue: EAccountStatus.enable
  })
  status: EAccountStatus
}
