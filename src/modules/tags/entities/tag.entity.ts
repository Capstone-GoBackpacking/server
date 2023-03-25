import { ObjectType, Field, ID } from '@nestjs/graphql';
import LocationTag from 'modules/location-tag/entities/location-tag.entity';
import Locations from 'modules/locations/entities/location.entity';
import {
  Table,
  Model,
  PrimaryKey,
  Column,
  Unique,
  DataType,
  BelongsToMany
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

  @Field(() => [Locations])
  @BelongsToMany(() => Locations, () => LocationTag)
  locations: Locations[];
}
