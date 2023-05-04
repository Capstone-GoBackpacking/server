import { ObjectType, Field, ID } from '@nestjs/graphql';
import AccountHobby from 'modules/account-hobby/entities/account-hobby.entity';
import Accounts from 'modules/accounts/entities/account.entity';
import TagHobby from 'modules/tag-hobby/entities/tag-hobby.entity';
import Tags from 'modules/tags/entities/tag.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  DataType,
  Unique,
  BelongsToMany,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Hobbies', timestamps: false })
export default class Hobbies extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @Unique(true)
  @Column({
    type: DataType.STRING(20),
  })
  name: string;

  @Field(() => [Accounts])
  @BelongsToMany(() => Accounts, () => AccountHobby)
  account: Accounts[];

  @Field(() => [Tags])
  @BelongsToMany(() => Tags, () => TagHobby)
  tags: Tags[];
}
