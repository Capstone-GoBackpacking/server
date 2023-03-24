import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  Unique,
  AllowNull,
  BelongsTo,
  ForeignKey,
  BeforeCreate,
  HasOne
} from 'sequelize-typescript';
import { EAccountStatus } from '../types';
import Roles from 'modules/roles/entities/role.entity';
import * as bcrypt from 'bcrypt';
import Profiles from 'modules/profiles/entities/profile.entity';

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

  @Field()
  @ForeignKey(() => Roles)
  @AllowNull(false)
  @Column
  roleId: string;

  @Field(() => Roles)
  @BelongsTo(() => Roles)
  role: Roles;

  @Field(() => Profiles)
  @HasOne(() => Profiles)
  profile: Profiles;

  @BeforeCreate
  static async hashPassword(instance: Accounts) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(instance.password, salt)
    instance.password = hash
  }
}
