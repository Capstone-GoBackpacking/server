import { ObjectType, Field, ID } from '@nestjs/graphql';
import LocationTag from 'modules/location-tag/entities/location-tag.entity';
import Tags from 'modules/tags/entities/tag.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  DataType,
  BelongsToMany
} from 'sequelize-typescript';
import { EStatus } from 'types/types';

@ObjectType()
@Table({ tableName: 'Locations', timestamps: false })
export default class Locations extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING(20)
  })
  name: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.TEXT
  })
  address: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT
  })
  description?: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(EStatus)),
    defaultValue: EStatus.enable
  })
  status: EStatus;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  lng: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING
  })
  lat: string;

  @Field(() => [Tags])
  @BelongsToMany(() => Tags, () => LocationTag)
  tags: Tags[];
}
