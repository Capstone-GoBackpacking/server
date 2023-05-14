import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import LocationTag from 'modules/location-tag/entities/location-tag.entity';
import Tags from 'modules/tags/entities/tag.entity';
import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AllowNull,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { EStatus } from 'common/types/enums';
import { HasManyAddAssociationsMixin } from 'sequelize';
import Trips from 'modules/trips/entities/trip.entity';
import Reviews from 'modules/reviews/entities/review.entity';
import LocationImages from 'modules/location-images/entities/location-image.entity';
import Accounts from 'modules/accounts/entities/account.entity';
import Favorites from 'modules/favorites/entities/favorite.entity';

@ObjectType()
@Table({ tableName: 'Locations', timestamps: false })
export default class Locations extends Model {
  @Field(() => ID)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING(20),
  })
  name: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.TEXT,
  })
  address: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  description?: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.ENUM(...Object.values(EStatus)),
    defaultValue: EStatus.enable,
  })
  status: EStatus;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  lng: string;

  @Field()
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  lat: string;

  @Field({ nullable: true })
  @AllowNull(true)
  @Column({
    type: DataType.TEXT,
  })
  thumbnail?: string;

  @Field(() => [Tags])
  @BelongsToMany(() => Tags, () => LocationTag)
  tags: Tags[];

  @Field(() => [Accounts])
  @BelongsToMany(() => Accounts, () => Favorites)
  favorites: Accounts[];

  @Field(() => [Trips])
  @HasMany(() => Trips)
  trips: Trips[];

  @Field(() => [Reviews])
  @HasMany(() => Reviews)
  reviews: Reviews[];

  @Field(() => [LocationImages])
  @HasMany(() => LocationImages)
  images: LocationImages[];

  @Field(() => Int)
  @Column({
    type: DataType.BIGINT.UNSIGNED,
    defaultValue: 0,
  })
  favoriteNumber: number;

  addTags: HasManyAddAssociationsMixin<Tags, string>;
}
