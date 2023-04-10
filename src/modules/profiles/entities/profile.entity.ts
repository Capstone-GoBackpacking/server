import { ObjectType, Field, ID } from '@nestjs/graphql';
import Accounts from 'modules/accounts/entities/account.entity';
import Genders from 'modules/genders/entities/gender.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  DataType,
  ForeignKey,
  BelongsTo,
  BeforeCreate,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Profiles', timestamps: false })
export default class Profiles extends Model {
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
    type: DataType.STRING(15),
  })
  firstName: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING(15),
  })
  lastName: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.STRING(30),
  })
  fullName?: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.DATEONLY,
  })
  birthday?: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.STRING(100),
  })
  address?: string;

  @Field()
  @ForeignKey(() => Accounts)
  @AllowNull(false)
  @Column
  accountId: string;

  @Field(() => Accounts)
  @BelongsTo(() => Accounts)
  account: Accounts;

  @Field()
  @ForeignKey(() => Genders)
  @AllowNull(false)
  @Column
  genderId: string;

  @Field(() => Genders)
  @BelongsTo(() => Genders)
  gender: Genders;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  avatar?: string;

  @BeforeCreate
  static async fullName(instance: Profiles) {
    instance.fullName = instance.firstName + ' ' + instance.lastName;
  }
}
