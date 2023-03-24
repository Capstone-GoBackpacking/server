import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Column,
  DataType,
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
}
