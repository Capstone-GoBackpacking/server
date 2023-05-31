import { ObjectType, Field, ID } from '@nestjs/graphql';
import TagType from 'modules/tag-type/entities/tag-type.entity';
import Tags from 'modules/tags/entities/tag.entity';
import Trips from 'modules/trips/entities/trip.entity';
import { HasManyAddAssociationsMixin } from 'sequelize';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  Unique,
  HasMany,
  DataType,
  AllowNull,
  BelongsToMany,
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

  @Field(() => [Tags])
  @BelongsToMany(() => Tags, () => TagType)
  tags: Tags[];

  addTags: HasManyAddAssociationsMixin<Tags, string>;
}
