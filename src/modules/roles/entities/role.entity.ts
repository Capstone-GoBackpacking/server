import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Column,
  PrimaryKey,
  DataType,
  AllowNull,
  Unique,
  Model
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
}
