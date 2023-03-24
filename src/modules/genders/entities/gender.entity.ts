import { ObjectType, Field, ID } from '@nestjs/graphql';
import Profiles from 'profiles/entities/profile.entity';
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Genders', timestamps: false })
export default class Genders extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @Unique(true)
  @Column({
    type: DataType.STRING(10),
  })
  name: string;

  @Field(() => [Profiles])
  @HasMany(() => Profiles)
  profiles: Profiles[];
}
