import { ObjectType, Field, ID } from '@nestjs/graphql';
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  Unique,
  DataType
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Tags', timestamps: false })
export default class Tags extends Model {
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
    type: DataType.STRING(20)
  })
  name: string;
}
