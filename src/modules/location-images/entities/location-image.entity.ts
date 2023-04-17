import { ObjectType, Field, ID } from '@nestjs/graphql';
import Locations from 'modules/locations/entities/location.entity';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'LocationImages', timestamps: false })
export default class LocationImages extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @Column({
    type: DataType.TEXT,
  })
  url: string;

  @Field()
  @ForeignKey(() => Locations)
  @Column
  locationId: string;

  @Field(() => Locations)
  @BelongsTo(() => Locations)
  location: Locations;
}
