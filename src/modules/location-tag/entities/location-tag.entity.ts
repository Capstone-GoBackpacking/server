import { ObjectType, Field, ID } from '@nestjs/graphql';
import Locations from 'modules/locations/entities/location.entity';
import Tags from 'modules/tags/entities/tag.entity';
import {
  Table,
  Model,
  ForeignKey,
  Column,
  PrimaryKey,
  DataType
} from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'LocationTag', timestamps: false })
export default class LocationTag extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @ForeignKey(() => Locations)
  @Column
  locationId: string;

  @Field()
  @ForeignKey(() => Tags)
  @Column
  tagId: string;
}
