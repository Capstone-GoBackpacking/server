import { ObjectType, Field, ID } from '@nestjs/graphql';
import Trips from 'modules/trips/entities/trip.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Unique,
  HasMany,
  DataType,
  AllowNull,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'Types', timestamps: false })
export default class Types extends Model {
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

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  icon?: string;

  @Field(() => [Trips])
  @HasMany(() => Trips)
  trips: Trips[];
}
